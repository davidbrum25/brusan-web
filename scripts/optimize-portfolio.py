#!/usr/bin/env python3
"""Convert portfolio/ masters into web-ready assets/work/ files.

Images → WebP (max 1920px, q82). Videos → H.264 + AAC, yuv420p, +faststart,
max 1920 on the long edge. Masters in portfolio/ are never overwritten.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "portfolio"
DST = ROOT / "assets" / "work"
PAGES_LIMIT = 25 * 1024 * 1024
REPORT = DST / "_optimize-report.json"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXT = {".mp4", ".mov", ".mkv", ".webm"}
COPY_EXT = {".pdf"}
SKIP_EXT = {".txt"}

LONG_VIDEO_SECONDS = 60


def slug(name: str) -> str:
    name = unicodedata.normalize("NFKD", name)
    name = "".join(c for c in name if not unicodedata.combining(c))
    name = name.lower().replace("&", " and ")
    name = re.sub(r"[\s_]+", "-", name)
    name = re.sub(r"[^a-z0-9.-]+", "-", name)
    name = re.sub(r"-{2,}", "-", name).strip("-.")
    return name or "file"


def dest_for(src: Path, new_suffix: str | None = None) -> Path:
    rel = src.relative_to(SRC)
    parts = [slug(p) for p in rel.parts[:-1]]
    stem = slug(rel.stem)
    suffix = new_suffix if new_suffix is not None else rel.suffix.lower()
    return DST.joinpath(*parts, stem + suffix)


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nk=1:nw=1",
            str(path),
        ],
        text=True,
    ).strip()
    try:
        return float(out)
    except ValueError:
        return 0.0


def optimize_image(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "magick",
            str(src),
            "-auto-orient",
            "-resize",
            "1920x1920>",
            "-strip",
            "-quality",
            "82",
            "-define",
            "webp:method=6",
            str(dst),
        ]
    )


def optimize_video(src: Path, dst: Path, duration: float) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    preset = "faster" if duration > LONG_VIDEO_SECONDS else "medium"
    crf = "24" if duration > LONG_VIDEO_SECONDS else "23"
    vf = (
        "scale='if(gte(iw,ih),min(1920\\,iw),-2)':"
        "'if(gt(ih,iw),min(1920\\,ih),-2)',"
        "scale=trunc(iw/2)*2:trunc(ih/2)*2,"
        "format=yuv420p"
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(src),
            "-map",
            "0:v:0",
            "-map",
            "0:a:0?",
            "-c:v",
            "libx264",
            "-preset",
            preset,
            "-crf",
            crf,
            "-profile:v",
            "high",
            "-level",
            "4.1",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            vf,
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-ac",
            "2",
            "-movflags",
            "+faststart",
            str(dst),
        ]
    )


def main() -> int:
    if not SRC.is_dir():
        print(f"missing {SRC}", file=sys.stderr)
        return 1

    rows: list[dict] = []
    files = sorted(p for p in SRC.rglob("*") if p.is_file())
    print(f"source files: {len(files)}")

    for src in files:
        ext = src.suffix.lower()
        if ext in SKIP_EXT:
            continue
        try:
            if ext in IMAGE_EXT:
                dst = dest_for(src, ".webp")
                if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
                    optimize_image(src, dst)
                    print(f"img  {src.relative_to(SRC)} → {dst.relative_to(ROOT)}")
                kind = "image"
            elif ext in VIDEO_EXT:
                dst = dest_for(src, ".mp4")
                duration = probe_duration(src)
                if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
                    print(f"vid  {src.relative_to(SRC)} ({duration:.0f}s) …")
                    optimize_video(src, dst, duration)
                    print(f"     → {dst.relative_to(ROOT)} {dst.stat().st_size / 1048576:.1f}MB")
                kind = "video"
            elif ext in COPY_EXT:
                dst = dest_for(src)
                dst.parent.mkdir(parents=True, exist_ok=True)
                if not dst.exists():
                    dst.write_bytes(src.read_bytes())
                    print(f"copy {src.relative_to(SRC)}")
                kind = "pdf"
            else:
                print(f"skip {src.relative_to(SRC)}")
                continue
        except subprocess.CalledProcessError as exc:
            err = exc.stderr.decode("utf-8", "replace")[-400:] if exc.stderr else str(exc)
            print(f"FAIL {src}: {err}", file=sys.stderr)
            rows.append({"src": str(src.relative_to(SRC)), "ok": False, "error": err})
            continue

        src_size = src.stat().st_size
        dst_size = dst.stat().st_size
        rows.append(
            {
                "src": str(src.relative_to(SRC)),
                "dst": str(dst.relative_to(ROOT)),
                "kind": kind,
                "src_bytes": src_size,
                "dst_bytes": dst_size,
                "pages_ok": dst_size <= PAGES_LIMIT,
                "ok": True,
            }
        )

    DST.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(rows, indent=2), encoding="utf-8")

    ok = [r for r in rows if r.get("ok")]
    over = [r for r in ok if not r["pages_ok"]]
    src_total = sum(r["src_bytes"] for r in ok)
    dst_total = sum(r["dst_bytes"] for r in ok)
    print("\n=== SUMMARY ===")
    print(f"converted {len(ok)}  failed {len(rows) - len(ok)}")
    print(f"size {src_total / 1e6:.0f}MB → {dst_total / 1e6:.0f}MB")
    print(f"over Pages 25 MiB: {len(over)}")
    for r in over:
        print(f"  {r['dst_bytes'] / 1048576:.1f}MB  {r['dst']}")
    return 0 if all(r.get("ok") for r in rows) else 2


if __name__ == "__main__":
    raise SystemExit(main())
