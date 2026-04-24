# UAAP Universe — Asset Directory

## Folder Structure

```
/public/assets/
  /logos/          → University logos (e.g., up-logo.png, ateneo-logo.png)
  /universities/   → Campus/hero images (e.g., up-campus.jpg, dlsu-hero.jpg)
  /backgrounds/    → Background images
  /audio/
    /chants/       → University chant audio (e.g., ateneo-chant.mp3)
    /ui/           → UI sounds
    /ambient/      → Ambient crowd sounds
```

## Naming Conventions

All files: **lowercase, hyphen-separated**, no spaces or special characters.

| Type | Format | Example |
|------|--------|---------|
| Logo | `{university}-logo.{ext}` | `dlsu-logo.png` |
| Campus image | `{university}-campus.jpg` | `up-campus.jpg` |
| Hero image | `{university}-hero.jpg` | `ateneo-hero.jpg` |
| Chant audio | `{university}-chant.mp3` | `nu-chant.mp3` |

## University Slugs

| University | Slug |
|-----------|------|
| University of the Philippines | `up` |
| Ateneo de Manila | `ateneo` |
| De La Salle University | `dlsu` |
| University of Santo Tomas | `ust` |
| National University | `nu` |
| Far Eastern University | `feu` |
| Adamson University | `adamson` |
| University of the East | `ue` |

## Adding a New Asset

1. Place the file in the correct subfolder
2. Follow the naming convention above
3. Update `lib/universities.ts` to reference the new file path
4. No code changes needed — assets are loaded dynamically
