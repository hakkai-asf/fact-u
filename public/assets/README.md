# FACT-U Asset Directory — Complete Guide

## Quick Overview
All assets live in `/public/assets/`. Drop files in the correct folder, follow naming conventions, and the app picks them up automatically — no code changes needed.

---

## Full Folder Structure

```
/public/assets/
│
├── fact-u-logo.png              ← App logo (used in Navbar)
│
├── logos/                       ← University logos
│   ├── up-logo.png
│   ├── ateneo-logo.png
│   ├── dlsu-logo.png
│   ├── ust-logo.png
│   ├── nu-logo.png
│   ├── feu-logo.png
│   ├── adamson-logo.png
│   └── ue-logo.png
│
├── universities/                ← Campus photos (main card image)
│   ├── up-campus.jpg
│   ├── ateneo-campus.jpg
│   ├── dlsu-campus.jpg
│   ├── ust-campus.jpg
│   ├── nu-campus.jpg
│   ├── feu-campus.jpg
│   ├── adamson-campus.jpg
│   └── ue-campus.jpg
│
├── campus/
│   ├── hero/                    ← Full-width hero banner per university
│   │   └── {slug}-hero.jpg      e.g. up-hero.jpg (wide 1920×600 recommended)
│   └── gallery/                 ← Additional campus photos
│       └── {slug}-gallery-{n}.jpg   e.g. ateneo-gallery-1.jpg, ateneo-gallery-2.jpg
│
├── mascots/                     ← University mascot images
│   └── {slug}-mascot.png        e.g. ust-mascot.png (tiger), admu-mascot.png (eagle)
│
├── players/                     ← Player/athlete photos
│   └── {lastname}-{slug}-{sport}.jpg
│       e.g. kouame-ateneo-basketball.jpg
│           valdez-nu-volleyball.jpg
│
├── icons/
│   ├── ui/                      ← Interface icons (SVG preferred)
│   │   ├── compare-icon.svg
│   │   ├── search-icon.svg
│   │   ├── menu-icon.svg
│   │   └── arrow-icon.svg
│   │
│   ├── sports/                  ← Sport-specific icons
│   │   ├── basketball-icon.svg
│   │   ├── volleyball-icon.svg
│   │   ├── football-icon.svg
│   │   └── cheerdance-icon.svg
│   │
│   ├── academic/                ← Academic category icons
│   │   ├── engineering-icon.svg
│   │   ├── medicine-icon.svg
│   │   ├── business-icon.svg
│   │   ├── law-icon.svg
│   │   └── arts-icon.svg
│   │
│   └── nav/                     ← Navigation icons
│       ├── home-icon.svg
│       ├── university-icon.svg
│       ├── trophy-icon.svg
│       └── chart-icon.svg
│
├── audio/
│   └── chants/                  ← University chant/cheer audio
│       ├── up-chant.mp3
│       ├── ateneo-chant.mp3
│       ├── dlsu-chant.mp3
│       ├── ust-chant.mp3
│       ├── nu-chant.mp3
│       ├── feu-chant.mp3
│       ├── adamson-chant.mp3
│       └── ue-chant.mp3
│
└── backgrounds/                 ← Optional overlay textures
    └── noise-texture.png
```

---

## Naming Conventions (STRICT)

| Rule | Correct | Wrong |
|------|---------|-------|
| Lowercase only | `up-logo.png` | `UP-Logo.png` |
| Hyphens, no spaces | `ateneo-campus.jpg` | `ateneo campus.jpg` |
| No special characters | `dlsu-hero.jpg` | `dlsu_hero!.jpg` |
| Format: `{slug}-{type}.{ext}` | `nu-mascot.png` | `nu_bulldog_mascot.PNG` |

### University Slugs (use exactly these)
| University | Slug |
|---|---|
| University of the Philippines | `up` |
| Ateneo de Manila University | `ateneo` |
| De La Salle University | `dlsu` |
| University of Santo Tomas | `ust` |
| National University | `nu` |
| Far Eastern University | `feu` |
| Adamson University | `adamson` |
| University of the East | `ue` |

---

## Supported File Formats
| Type | Preferred | Also accepted |
|------|-----------|---------------|
| Logos | `.png` (transparent bg) | `.svg`, `.webp` |
| Campus images | `.jpg` | `.webp`, `.png` |
| Icons | `.svg` | `.png` |
| Audio | `.mp3` | `.ogg`, `.wav` |
| Player photos | `.jpg` | `.webp`, `.png` |

---

## How to Add a New Asset

### Add/Replace a University Logo
1. Prepare image with transparent background (PNG recommended)
2. Name it: `{slug}-logo.png` (e.g., `up-logo.png`)
3. Place in: `/public/assets/logos/`
4. Done — carousel, grid, and profile pages will use it automatically

### Add a Campus Image
1. Crop to approximately 4:3 ratio (e.g., 800×600)
2. Name it: `{slug}-campus.jpg`
3. Place in: `/public/assets/universities/`
4. Done — shows in carousel cards and university profiles

### Add a Hero Banner
1. Wide image recommended: 1920×500px or similar
2. Name it: `{slug}-hero.jpg`
3. Place in: `/public/assets/campus/hero/`
4. Reference in `lib/universities.ts` under `heroImage`

### Add a Mascot Image
1. PNG with transparent background
2. Name it: `{slug}-mascot.png`
3. Place in: `/public/assets/mascots/`

### Add/Replace a Chant Audio
1. Trim to 6–15 seconds for best UX
2. Name it: `{slug}-chant.mp3`
3. Place in: `/public/assets/audio/chants/`
4. Done — plays automatically when that school is selected in the carousel

### Replace the App Logo
1. Prepare square image (e.g., 512×512)
2. Name it: `fact-u-logo.png`
3. Place in: `/public/assets/`
4. Navbar picks it up automatically

### Add SVG Icons
1. Name with purpose: `{purpose}-icon.svg`
2. Place in `/public/assets/icons/{category}/`
3. Reference in components via `<img src="/assets/icons/sports/basketball-icon.svg" />`

---

## Adding a New University (Full Steps)
1. Place logo in `/public/assets/logos/{slug}-logo.png`
2. Place campus image in `/public/assets/universities/{slug}-campus.jpg`
3. Place chant in `/public/assets/audio/chants/{slug}-chant.mp3`
4. Open `lib/universities.ts`
5. Add a new entry following the existing University object structure
6. Set `slug`, `logo`, `campusImage`, `chantUrl`, `colors`, and all other fields
7. That's it — the university appears everywhere automatically

---

## Recommended Image Sizes
| Asset | Recommended Size | Max File Size |
|-------|-----------------|---------------|
| Logo | 400×400px | 200KB |
| Campus card | 800×600px | 300KB |
| Hero banner | 1920×500px | 600KB |
| Mascot | 600×600px | 250KB |
| Player photo | 400×500px | 200KB |
| App logo | 512×512px | 150KB |

---

## Notes
- If an asset is missing, the app shows a **gradient fallback** — no broken images
- Audio chants play when a user selects a school in the carousel (user must interact first due to browser autoplay policy)
- All paths are relative to `/public/` — reference them as `/assets/...` in code
- This app was developed by **Harry Lagto**
