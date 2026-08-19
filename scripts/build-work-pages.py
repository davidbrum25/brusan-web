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
    {
        "slug": "alfajor-argentino",
        "key": "alfajor",
        "tag": "CGI · Producto",
        "title": "Alfajor Argentino",
        "desc": "Visualización de producto y breakdown CGI.",
        "layout": "product",
        "media": [
            {"kind": "video", "src": "assets/work/product-showcase/alfajor-argentino/bdvd-dc-003.alfajor.mp4", "poster": "assets/work/product-showcase/alfajor-argentino/stills/006.webp", "feature": True, "portrait": True},
            {"kind": "video", "src": "assets/work/product-showcase/alfajor-argentino/bdvd-dc-003.alfajor.breakdown.mp4", "poster": "assets/work/product-showcase/alfajor-argentino/stills/001.webp", "portrait": True},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/006.webp", "alt": "Alfajor Argentino 06"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/001.webp", "alt": "Alfajor Argentino 01"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/002.webp", "alt": "Alfajor Argentino 02"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/003.webp", "alt": "Alfajor Argentino 03"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/004.webp", "alt": "Alfajor Argentino 04"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/005.webp", "alt": "Alfajor Argentino 05"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/007.webp", "alt": "Alfajor Argentino 07"},
            {"kind": "image", "src": "assets/work/product-showcase/alfajor-argentino/stills/008.webp", "alt": "Alfajor Argentino 08"},
        ],
    },
    {
        "slug": "radiocantilo",
        "key": "cantilo",
        "tag": "Archviz · Web",
        "title": "radiocantilo.com",
        "desc": "Archviz, identidad y reel de marca.",
        "layout": "mixed",
        "media": [
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-a45bc15d-56f9-46f0-8989-fb3ac1277297.webp", "alt": "radiocantilo.com — planta", "feature": True},
            {"kind": "video", "src": "assets/work/radiocantilo.com/social-reel-logo.mp4", "poster": "assets/work/radiocantilo.com/branding/radiocantilo-logo.webp"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-3c1314b1-617e-4c8a-8506-db68766c6fec.webp", "alt": "radiocantilo.com — archviz"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-3f807d9b-934a-4658-9855-f0ae255f2417.webp", "alt": "radiocantilo.com — archviz"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-464e6094-0b86-4390-94eb-89afa4419866.webp", "alt": "radiocantilo.com — archviz"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-54d1fae3-1e20-4297-a0a0-57a3da9929c2.webp", "alt": "radiocantilo.com — archviz"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/archviz/grok-b25a0836-20dd-4bf1-b385-920d1de76f4b.webp", "alt": "radiocantilo.com — archviz"},
            {"kind": "image", "src": "assets/work/radiocantilo.com/branding/radiocantilo-logo.webp", "alt": "radiocantilo.com — logo", "contain": True},
            {"kind": "file", "src": "assets/work/radiocantilo.com/branding/radiocantilo-branding.pdf", "label": "Manual de marca (PDF)"},
        ],
    },
    {
        "slug": "nonpalidece",
        "key": "nonpa",
        "tag": "Reels · Tour",
        "title": "Nonpalidece",
        "desc": "Reels y piezas para Soy Latino Tour.",
        "layout": "mixed",
        "media": [
            {"kind": "video", "src": "assets/work/nonpalidece/reels/social-reels-03.mp4", "poster": "assets/work/nonpalidece/stills-03.webp", "feature": True},
            {"kind": "video", "src": "assets/work/nonpalidece/reels/social-reels-01.mp4", "poster": "assets/work/nonpalidece/stills-01.webp"},
            {"kind": "video", "src": "assets/work/nonpalidece/reels/social-reels-02.mp4", "poster": "assets/work/nonpalidece/stills-02.webp", "portrait": True},
            {"kind": "image", "src": "assets/work/nonpalidece/stills-03.webp", "alt": "Nonpalidece — Soy Latino Tour"},
            {"kind": "image", "src": "assets/work/nonpalidece/stills-01.webp", "alt": "Nonpalidece — still 01"},
            {"kind": "image", "src": "assets/work/nonpalidece/stills-02.webp", "alt": "Nonpalidece — still 02"},
        ],
    },
    {
        "slug": "empanada-criolla",
        "key": "empanada",
        "tag": "CGI · Producto",
        "title": "Empanada Criolla",
        "desc": "Visualización de producto y breakdown CGI.",
        "layout": "product",
        "media": [
            {"kind": "video", "src": "assets/work/product-showcase/empanada-criolla/bdvd-dc-001.empanadas.mp4", "poster": "assets/work/product-showcase/empanada-criolla/stills/frame-7-a-finished-raw-202606061400.webp", "feature": True, "portrait": True},
            {"kind": "video", "src": "assets/work/product-showcase/empanada-criolla/bdvd-dc-001.empanadas.breakdown.mp4", "poster": "assets/work/product-showcase/empanada-criolla/stills/frame-1-extreme-close-up-of-202606061400.webp", "portrait": True},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-7-a-finished-raw-202606061400.webp", "alt": "Empanada criolla"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-1-extreme-close-up-of-202606061400.webp", "alt": "Empanada — detalle 1"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-2-a-smooth-elastic-202606061400.webp", "alt": "Empanada — detalle 2"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-3-a-thin-perfect-202606061400.webp", "alt": "Empanada — detalle 3"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-5-extreme-close-up-of-202606061400.webp", "alt": "Empanada — detalle 5"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-6-close-up-of-the-202606061400.webp", "alt": "Empanada — detalle 6"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/frame-8-extreme-close-up-of-202606061400.webp", "alt": "Empanada — detalle 8"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/top-down-overhead-view-of-the-202606061409.webp", "alt": "Empanada — zenital"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/remove-the-table-the-ground-202606061413.webp", "alt": "Empanada — still"},
            {"kind": "image", "src": "assets/work/product-showcase/empanada-criolla/stills/remove-the-table-the-ground-202606061415.webp", "alt": "Empanada — still"},
        ],
    },
    {
        "slug": "veganis",
        "key": "veganis",
        "tag": "CGI · Producto",
        "title": "Veganis",
        "desc": "Spot y stills de producto para Veganis.",
        "layout": "product",
        "media": [
            {"kind": "video", "src": "assets/work/product-showcase/veganis/veganis-169-rosa-short.mp4", "poster": "assets/work/product-showcase/veganis/stills/png-rosa.webp", "feature": True},
            {"kind": "image", "src": "assets/work/product-showcase/veganis/stills/png-rosa.webp", "alt": "Veganis rosa"},
            {"kind": "image", "src": "assets/work/product-showcase/veganis/stills/png-rosa-hojas.webp", "alt": "Veganis rosa hojas"},
            {"kind": "image", "src": "assets/work/product-showcase/veganis/stills/png-verde.webp", "alt": "Veganis verde"},
            {"kind": "image", "src": "assets/work/product-showcase/veganis/stills/png-verde-hojas.webp", "alt": "Veganis verde hojas"},
        ],
    },
    {
        "slug": "qjmotor",
        "key": "qjmotor",
        "tag": "CGI · Cartelería",
        "title": "QJ Motor",
        "desc": "Visualización de producto y vía pública para Fort 350.",
        "layout": "product",
        "media": [
            {"kind": "image", "src": "assets/work/qjmotor/product/studio-01.webp", "alt": "QJ Motor Fort 350 — estudio", "feature": True},
            {"kind": "image", "src": "assets/work/qjmotor/branding/qj-badge.webp", "alt": "QJ Motor — isotipo", "contain": True},
            {"kind": "image", "src": "assets/work/qjmotor/product/studio-02.webp", "alt": "QJ Motor Fort 350 — estudio 02"},
            {"kind": "image", "src": "assets/work/qjmotor/product/emblem.webp", "alt": "QJ Motor Fort 350 — emblema"},
            {"kind": "image", "src": "assets/work/qjmotor/product/headlight.webp", "alt": "QJ Motor Fort 350 — óptica"},
            {"kind": "image", "src": "assets/work/qjmotor/product/handlebars.webp", "alt": "QJ Motor Fort 350 — comandos"},
            {"kind": "image", "src": "assets/work/qjmotor/product/exhaust.webp", "alt": "QJ Motor Fort 350 — escape"},
            {"kind": "image", "src": "assets/work/qjmotor/product/rear-light.webp", "alt": "QJ Motor Fort 350 — faro trasero"},
            {"kind": "image", "src": "assets/work/qjmotor/product/brake-disc.webp", "alt": "QJ Motor Fort 350 — disco"},
            {"kind": "image", "src": "assets/work/qjmotor/product/suspension.webp", "alt": "QJ Motor Fort 350 — suspensión"},
            {"kind": "image", "src": "assets/work/qjmotor/product/seat.webp", "alt": "QJ Motor Fort 350 — asiento"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/riverside-screen.webp", "alt": "QJ Motor — pantalla costanera"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/billboard.webp", "alt": "QJ Motor — billboard"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/digital-poster.webp", "alt": "QJ Motor — poster digital"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/kiosk-rain.webp", "alt": "QJ Motor — kiosco"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/street-poster.webp", "alt": "QJ Motor — poster urbano"},
            {"kind": "image", "src": "assets/work/qjmotor/outdoor/sidewalk-board.webp", "alt": "QJ Motor — cartelería de vereda"},
        ],
    },
    {
        "slug": "box-bike",
        "key": "boxbike",
        "tag": "3D Model",
        "title": "Box Bike",
        "desc": "Modelado y showcase 3D.",
        "layout": "mixed",
        "media": [
            {"kind": "video", "src": "assets/work/model-showcase/3dmodel-box-bike/capture.mp4", "poster": "assets/work/model-showcase/3dmodel-box-bike/22-06-27-boxbike.webp", "feature": True},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/22-06-27-boxbike.webp", "alt": "Box Bike"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/2.b.webp", "alt": "Box Bike — vista"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/2.c.webp", "alt": "Box Bike — vista"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/2.d.webp", "alt": "Box Bike — vista"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/long.a.webp", "alt": "Box Bike — long"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/long.b.webp", "alt": "Box Bike — long"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/ins-a.webp", "alt": "Box Bike — detalle"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/ins-b.webp", "alt": "Box Bike — detalle"},
            {"kind": "image", "src": "assets/work/model-showcase/3dmodel-box-bike/ins-c.webp", "alt": "Box Bike — detalle"},
        ],
    },
    {
        "slug": "estelares",
        "key": "estelares",
        "tag": "Music clip",
        "title": "Estelares — Usted",
        "desc": "Stills del videoclip Usted.",
        "layout": "stills",
        "media": [
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-01.webp", "alt": "Estelares — Usted", "feature": True},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-02.webp", "alt": "Estelares still 02"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-03.webp", "alt": "Estelares still 03"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-04.webp", "alt": "Estelares still 04"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-05.webp", "alt": "Estelares still 05"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-06.webp", "alt": "Estelares still 06"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/stills-07.webp", "alt": "Estelares still 07"},
            {"kind": "image", "src": "assets/work/estelares/music-clip/storyboard.webp", "alt": "Estelares — storyboard"},
        ],
    },
    {
        "slug": "sybila",
        "key": "sybila",
        "tag": "Branding",
        "title": "sybi.la",
        "desc": "Identidad y exploración de marca.",
        "layout": "branding",
        "media": [
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/todas.webp", "alt": "sybi.la — exploración", "feature": True},
            {"kind": "image", "src": "assets/work/sybi.la/branding/sybila-logo.webp", "alt": "sybi.la logo", "contain": True},
            {"kind": "image", "src": "assets/work/sybi.la/branding/sybila-logo-alt.webp", "alt": "sybi.la logo alt", "contain": True},
            {"kind": "image", "src": "assets/work/sybi.la/branding/sybila-mm.webp", "alt": "sybi.la marca"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1284.webp", "alt": "sybi.la variante"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1298.webp", "alt": "sybi.la variante"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1312.webp", "alt": "sybi.la variante"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1328.webp", "alt": "sybi.la variante"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1341.webp", "alt": "sybi.la variante"},
            {"kind": "image", "src": "assets/work/sybi.la/branding/mockups-search/g1348.webp", "alt": "sybi.la variante"},
        ],
    },
    {
        "slug": "sybpro",
        "key": "sybpro",
        "tag": "Branding · Reel",
        "title": "sybpro.tv",
        "desc": "Identidad y reel de marca.",
        "layout": "branding",
        "media": [
            {"kind": "video", "src": "assets/work/sybpro.tv/reel/sybprotv-ad1.mp4", "poster": "assets/work/sybpro.tv/branding/1.webp", "feature": True},
            {"kind": "image", "src": "assets/work/sybpro.tv/branding/1.webp", "alt": "sybpro.tv 1"},
            {"kind": "image", "src": "assets/work/sybpro.tv/branding/2.webp", "alt": "sybpro.tv 2"},
            {"kind": "image", "src": "assets/work/sybpro.tv/branding/3.webp", "alt": "sybpro.tv 3"},
            {"kind": "image", "src": "assets/work/sybpro.tv/branding/4.webp", "alt": "sybpro.tv 4"},
            {"kind": "image", "src": "assets/work/sybpro.tv/branding/5.webp", "alt": "sybpro.tv 5"},
        ],
    },
    {
        "slug": "viaje-a-lo-inesperado",
        "key": "vai",
        "tag": "Reels",
        "title": "Viaje a lo Inesperado",
        "desc": "Clips y motion de marca.",
        "layout": "mixed",
        "media": [
            {"kind": "video", "src": "assets/work/viaje-a-lo-inesperado/reels/18-04-03-vai-clip-1.mp4", "poster": "assets/work/viaje-a-lo-inesperado/reels/vai-clip-1-poster.webp", "feature": True},
            {"kind": "video", "src": "assets/work/viaje-a-lo-inesperado/reels/18-04-03-vai-clip-2.mp4", "poster": "assets/work/viaje-a-lo-inesperado/reels/vai-clip-1-poster.webp"},
            {"kind": "video", "src": "assets/work/viaje-a-lo-inesperado/reels/18-04-19-vai-clip-4-sonido.mp4", "poster": "assets/work/viaje-a-lo-inesperado/reels/vai-clip-1-poster.webp"},
            {"kind": "video", "src": "assets/work/viaje-a-lo-inesperado/reels/vai-logo-animado-full-alpha.mp4", "poster": "assets/work/viaje-a-lo-inesperado/reels/vai-clip-1-poster.webp"},
            {"kind": "file", "src": "assets/work/viaje-a-lo-inesperado/branding-manual-de-marca.pdf", "label": "Manual de marca (PDF)"},
        ],
    },
    {
        "slug": "viajes-los-mellis",
        "key": "mellis",
        "tag": "Branding",
        "title": "Viajes los Mellis",
        "desc": "Identidad — Seguimos la música.",
        "layout": "branding",
        "media": [
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/1.webp", "alt": "Viajes los Mellis 1", "feature": True},
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/2.webp", "alt": "Viajes los Mellis 2"},
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/3.webp", "alt": "Viajes los Mellis 3"},
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/4.webp", "alt": "Viajes los Mellis 4"},
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/5.webp", "alt": "Viajes los Mellis 5"},
            {"kind": "image", "src": "assets/work/viajes-los-mellis/branding/6.webp", "alt": "Viajes los Mellis 6"},
        ],
    },
    {
        "slug": "la-plata",
        "key": "foto",
        "tag": "Fotografía",
        "title": "La Plata",
        "desc": "Serie fotográfica urbana.",
        "layout": "foto",
        "media": [
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/00-tapa.webp", "alt": "La Plata — tapa", "feature": True},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/4-5-estadio.webp", "alt": "La Plata — estadio"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/8-9-dardo-rocha.webp", "alt": "La Plata — Dardo Rocha"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/62-63-catedral-estadio.webp", "alt": "La Plata — catedral"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/teatro-argentino-la-plata-842.webp", "alt": "Teatro Argentino"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/5-y-48-la-plata-821.webp", "alt": "La Plata 5 y 48"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/fuente-no-se-que-la-plata-1055.webp", "alt": "La Plata — fuente"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/9-de-julio-edificio-tal-1067.webp", "alt": "9 de Julio"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/9-de-julio-capital-federal-1077.webp", "alt": "9 de Julio CABA"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/9-de-julio-capital-federal-1108.webp", "alt": "9 de Julio CABA"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/teatro-malba-capital-federal-1132.webp", "alt": "MALBA"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/parque-de-la-memoria-capital-federal-1175.webp", "alt": "Parque de la Memoria"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/costanera-parque-de-la-memoria-1198.webp", "alt": "Costanera"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/parque-de-la-memoria-1212.webp", "alt": "Parque de la Memoria"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/007.webp", "alt": "La Plata 007"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/624.webp", "alt": "La Plata 624"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/678.webp", "alt": "La Plata 678"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/714.webp", "alt": "La Plata 714"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/898.webp", "alt": "La Plata 898"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/950.webp", "alt": "La Plata 950"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2211-piria.webp", "alt": "Piriápolis"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2298-hipodromo.webp", "alt": "Hipódromo"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2325-biblioteca.webp", "alt": "Biblioteca"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2347-building.webp", "alt": "Edificio"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2369-villa-elisa.webp", "alt": "Villa Elisa"},
            {"kind": "image", "src": "assets/work/fotografia/la-plata-area/dav-2392-citybell.webp", "alt": "City Bell"},
        ],
    },
]


def asset(path: str) -> str:
    return "../" + path


def render_media(item: dict) -> str:
    kind = item["kind"]
    cls = ["work-media"]
    if item.get("feature"):
        cls.append("work-media--feature")
    if kind == "video":
        cls.append("work-media--video")
    if item.get("portrait"):
        cls.append("work-media--portrait")
    if item.get("contain"):
        cls.append("is-contain")
    class_attr = " ".join(cls)

    if kind == "video":
        poster = f' poster="{asset(item["poster"])}"' if item.get("poster") else ""
        return f'''      <figure class="{class_attr}">
        <video controls playsinline preload="metadata"{poster}>
          <source src="{asset(item["src"])}" type="video/mp4">
        </video>
      </figure>'''
    if kind == "file":
        return f'''      <a class="work-file glass-pill" href="{asset(item["src"])}" target="_blank" rel="noopener">
        <i data-lucide="file-text"></i>
        <span>{item["label"]}</span>
      </a>'''
    return f'''      <figure class="{class_attr}">
        <img src="{asset(item["src"])}" alt="{item.get("alt", "")}">
      </figure>'''


def page_html(project: dict, prev_p: dict, next_p: dict) -> str:
    key = project["key"]
    media_html = "\n".join(render_media(m) for m in project["media"])
    layout = project.get("layout", "mixed")
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{project["title"]} · BRUSAN</title>
  <meta name="description" content="{project["desc"]} — BRUSAN, desarrollo visual en Gualeguaychú.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://brusan.ar/work/{project["slug"]}.html">
  <link rel="icon" type="image/png" href="../assets/branding/brusan_Isotipo_blanco.png">
  <meta name="theme-color" content="#121110">
  <meta name="color-scheme" content="dark">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{project["title"]} · BRUSAN">
  <meta property="og:description" content="{project["desc"]}">
  <meta property="og:image" content="https://brusan.ar/assets/branding/brusan_Logotipo_blanco.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="../services.css">
</head>
<body class="work-page" data-work-key="{key}">
  <header class="site-nav">
    <div class="container site-nav-inner">
      <a class="site-nav-logo" href="../index.html" aria-label="BRUSAN inicio">
        <img src="../assets/brusan_logo_blanco.svg" alt="BRUSAN">
      </a>
      <nav class="site-nav-links" aria-label="Secciones">
        <a href="../index.html#nuestro-portfolio" data-i18n="footer.nav.portfolio">Portfolio</a>
        <a href="../index.html#que-hacemos" data-i18n="footer.nav.services">Qué hacemos</a>
        <a href="../index.html#quienes-somos" data-i18n="footer.nav.about">Quienes Somos</a>
        <a href="../index.html#contacto" data-i18n="footer.nav.contact">Contacto</a>
      </nav>
      <div class="nav-actions">
        <a class="nav-icon-btn" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram" data-magnetic data-magnetic-distance="70" data-magnetic-strength="0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <button class="lang-toggle-btn" id="lang-toggle-btn" data-magnetic data-magnetic-distance="80" data-magnetic-strength="0.5" aria-label="Cambiar idioma / Switch language">
          <i data-lucide="globe"></i>
          <span id="lang-label">EN</span>
        </button>
      </div>
    </div>
  </header>

  <main class="work-main">
    <div class="container">
      <a class="work-back" href="../index.html#nuestro-portfolio">
        <i data-lucide="arrow-left"></i>
        <span data-i18n="work.back">volver al portfolio</span>
      </a>
      <header class="work-hero">
        <span class="showcase-tag" data-i18n="work.{key}.tag">{project["tag"]}</span>
        <h1 class="work-title" data-i18n="work.{key}.title">{project["title"]}</h1>
        <p class="work-lead" data-i18n="work.{key}.desc">{project["desc"]}</p>
      </header>
      <div class="work-gallery work-gallery--{layout}">
{media_html}
      </div>
      <nav class="work-pager" aria-label="Proyectos">
        <a class="work-pager-link" href="{prev_p["slug"]}.html">
          <span data-i18n="work.prev">anterior</span>
          <strong data-i18n="work.{prev_p["key"]}.title">{prev_p["title"]}</strong>
        </a>
        <a class="work-pager-link work-pager-link--next" href="{next_p["slug"]}.html">
          <span data-i18n="work.next">siguiente</span>
          <strong data-i18n="work.{next_p["key"]}.title">{next_p["title"]}</strong>
        </a>
      </nav>
    </div>
  </main>

  <section class="contact-section">
    <div class="container">
      <div class="contact-box">
        <h2 class="contact-title">
          <span data-i18n="contact.title">hablemos de tu <strong>proyecto</strong></span>
          <i data-lucide="message-circle"></i>
        </h2>
        <p class="contact-lead" data-i18n="contact.lead">Contanos qué necesitás. Respondemos rápido y sin vueltas.</p>
        <div class="contact-actions">
          <a href="mailto:contacto@brusan.ar" class="glass-pill contact-pill" data-magnetic data-magnetic-distance="100" data-magnetic-strength="0.45">
            <i data-lucide="mail"></i>
            <span>contacto@brusan.ar</span>
          </a>
          <a href="https://wa.me/5493446367960" target="_blank" rel="noopener" class="glass-pill secondary contact-pill" data-magnetic data-magnetic-distance="100" data-magnetic-strength="0.45">
            <i data-lucide="message-circle"></i>
            <span data-i18n="contact.whatsapp">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer-section">
    <div class="container footer-bottom-bar">
      <div class="footer-brand">
        <img src="../assets/brusan_logo_blanco.svg" alt="BRUSAN">
        <span data-i18n="footer.slogan">- desarrollo visual</span>
      </div>
      <div class="footer-sitemap-pill">
        <a href="../index.html" data-i18n="footer.nav.home">Inicio</a>
        <a href="../index.html#nuestro-portfolio" data-i18n="footer.nav.portfolio">Portfolio</a>
        <a href="../index.html#contacto" data-i18n="footer.nav.contact">Contacto</a>
      </div>
      <div class="footer-copy">
        <span data-i18n="footer.location">Gualeguaychú</span>
        <span class="footer-copy-sep">·</span>
        <span>&copy; 2026</span>
      </div>
    </div>
  </footer>

  <div class="work-lightbox" hidden>
    <button class="work-lightbox-close" type="button" aria-label="Cerrar">&times;</button>
    <button class="work-lightbox-nav work-lightbox-prev" type="button" aria-label="Imagen anterior / Previous image">
      <i data-lucide="chevron-left"></i>
    </button>
    <button class="work-lightbox-nav work-lightbox-next" type="button" aria-label="Imagen siguiente / Next image">
      <i data-lucide="chevron-right"></i>
    </button>
    <img alt="">
    <p class="work-lightbox-count" aria-live="polite"></p>
  </div>

  <script src="../main.js"></script>
</body>
</html>
'''


def main() -> None:
    OUT.mkdir(exist_ok=True)
    n = len(PROJECTS)
    for i, project in enumerate(PROJECTS):
        prev_p = PROJECTS[(i - 1) % n]
        next_p = PROJECTS[(i + 1) % n]
        path = OUT / f"{project['slug']}.html"
        path.write_text(page_html(project, prev_p, next_p), encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)}")
    print(f"{n} project pages")


if __name__ == "__main__":
    main()
