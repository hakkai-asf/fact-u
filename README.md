# 🏆 UAAP Universe

**The ultimate UAAP university discovery platform** — explore, compare, and discover all 8 UAAP member universities in a stunning, interactive web app.

---

## ✨ Features

- 🎠 **Interactive University Carousel** — Smooth infinite scroll with glassmorphism cards
- 🏫 **Detailed University Profiles** — Academics, sports, student life, and admissions
- ⚖️ **Side-by-Side Comparison Tool** — Compare any two schools with animated bar charts
- 🏀 **Sports Hub** — Full championship history across basketball, volleyball, cheerdance & football
- 📚 **Academics Center** — QS Rankings, tuition comparison, top programs
- 🎓 **Enrollment Flow** — Direct links to official university admissions portals
- 🌙 **Glassmorphism UI** — Animated gradient backgrounds, dark theme throughout
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm or yarn

### Installation

```bash
# 1. Clone or unzip the project
cd uaap-universe

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel

# Option 2: GitHub + Vercel Dashboard
# Push to GitHub → Connect repo on vercel.com → Deploy
```

---

## 📁 Project Structure

```
uaap-universe/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Navbar, fonts)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles + CSS variables
│   ├── not-found.tsx             # 404 page
│   ├── universities/
│   │   ├── page.tsx              # University grid/list
│   │   └── [slug]/
│   │       ├── page.tsx          # Dynamic university page
│   │       └── UniversityClient.tsx  # Tabbed university profile UI
│   ├── compare/
│   │   └── page.tsx              # Comparison tool
│   ├── sports/
│   │   └── page.tsx              # Sports hub
│   └── academics/
│       └── page.tsx              # Academics & rankings
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Navbar.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── GlassCard.tsx
│   │   ├── ScoreBar.tsx
│   │   └── SectionHeader.tsx
│   └── sections/                 # Page sections
│       ├── HeroSection.tsx
│       ├── UniversityCarousel.tsx
│       └── SportsSection.tsx
│
├── lib/
│   └── universities.ts           # ⭐ ALL university data lives here
│
├── public/
│   └── assets/
│       ├── logos/                # University logos
│       ├── universities/         # Campus images
│       ├── backgrounds/          # Background textures
│       └── audio/                # Chants + UI sounds
│
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🖼️ Asset Replacement Guide

All assets are config-driven. **You never need to touch component code to update images.**

### Replacing a University Logo

1. Create or download the logo (PNG or SVG recommended)
2. Name it: `{slug}-logo.png` (e.g., `dlsu-logo.png`)
3. Place it in: `public/assets/logos/`
4. Done! The app loads it automatically via `lib/universities.ts`

### Naming Conventions

| Asset Type | Format | Example |
|------------|--------|---------|
| Logo | `{slug}-logo.png` | `ateneo-logo.png` |
| Campus image | `{slug}-campus.jpg` | `up-campus.jpg` |
| Hero image | `{slug}-hero.jpg` | `ust-hero.jpg` |
| Chant audio | `{slug}-chant.mp3` | `nu-chant.mp3` |

**Rules:** lowercase only · hyphens instead of spaces · no special characters

### Supported Formats
- Images: `.png`, `.jpg`, `.webp`, `.svg`
- Audio: `.mp3`, `.ogg`, `.wav`

---

## ➕ Adding a New University

1. **Add the logo** to `public/assets/logos/`
2. **Open `lib/universities.ts`**
3. **Add a new entry** to the `universities` array following the existing schema:

```typescript
{
  slug: 'new-school',           // URL-safe identifier
  name: 'New School Name',
  shortName: 'NSN',
  tagline: 'Your tagline here',
  colors: {
    primary: '#HEX',
    secondary: '#HEX',
    accent: '#HEX',
  },
  logo: '/assets/logos/new-school-logo.png',
  // ... fill in all other fields
}
```

4. That's it — the school will automatically appear in the carousel, grid, comparison tool, and all pages.

---

## 🎨 Customization

### Changing Colors / Themes

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --glass: rgba(255,255,255,0.06);       /* Glass card fill */
  --glass-border: rgba(255,255,255,0.12); /* Glass card border */
  --bg-dark: #060a12;                     /* Main background */
  --text-primary: #f0f4ff;               /* Main text color */
}
```

### Adjusting Animations

- **Transition speed:** Search for `transition-all duration-400` and change `400` to any ms value
- **Carousel speed:** In `UniversityCarousel.tsx`, change the `4000` interval value
- **Background intensity:** Pass a different `intensity` prop to `<AnimatedBackground />`

### Disabling Animations (Accessibility)

Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔗 University Data Source

All data is stored in **`lib/universities.ts`** — one file, all universities.

To update any info (programs, tuition, sports history, etc.):
1. Open `lib/universities.ts`
2. Find the university by `slug`
3. Edit the fields you want
4. Save — changes appear immediately on next build/reload

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | Framework (App Router) |
| React 18 | UI |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animation system |
| Lucide React | Icon library |
| Vercel | Deployment platform |

---

## 🌐 Deploying to Vercel

### Via Vercel Dashboard (Recommended)

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Keep all default settings (Vercel auto-detects Next.js)
5. Click **Deploy**

### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # for preview
vercel --prod # for production
```

### Environment Variables

No environment variables required for the base app.

---

## 📝 License

MIT — free to use, modify, and deploy.

---

*Built with ❤️ for UAAP fans and future university students across the Philippines.*
