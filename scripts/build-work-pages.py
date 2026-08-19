#!/usr/bin/env python3
"""Generate static project pages in work/ from the optimized assets."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "work"

# Media paths are relative to the site root (resolved as ../ from work/).
PROJECTS = [
    {
        "slug": "el-pulpo-negro",
        "key": "pulpo",
        "tag": "Reel · 3D",
        "title": "El Pulpo Negro",
        "desc": "Reel y piezas sociales del personaje 3D.",
        "layout": "mixed",
        "media": [
            {"kind": "video", "src": "assets/work/el-pulpo-negro/elpulponegro-reel.mp4", "poster": "assets/work/el-pulpo-negro/socials/social-post-03.webp", "feature": True},
            {"kind": "image", "src": "assets/work/el-pulpo-negro/socials/social-post-03.webp", "alt": "El Pulpo Negro"},
            {"kind": "image", "src": "assets/work/el-pulpo-negro/socials/social-post-01.webp", "alt": "El Pulpo Negro — social 01"},
            {"kind": "image", "src": "assets/work/el-pulpo-negro/socials/social-post-02.webp", "alt": "El Pulpo Negro — social 02"},
        ],
    },
]

def main():
    print('restored minimal - REGENERATE FROM FULL LOCAL')

if __name__ == '__main__':
    main()
