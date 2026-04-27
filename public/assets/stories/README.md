# Featured Stories — /public/assets/stories/

Images for the landing page Featured Story Feed.
Drop images here, reference them in FEATURED_STORIES in app/page.tsx.

## Naming convention
{story-id}.jpg   e.g.  season-2026.jpg
                        nu-volleyball.jpg
                        ust-cheerdance.jpg
                        basketball-preview.jpg

## Recommended size
1200 × 600px  ·  JPEG quality 85%  ·  max 300KB

## How to add a new story
1. Drop image in this folder:  public/assets/stories/{slug}.jpg
2. Open app/page.tsx
3. Add an entry to the FEATURED_STORIES array:

  {
    id:          'my-story-slug',
    category:    'Basketball',          // shown as badge
    title:       'Story headline here',
    description: 'Two-sentence summary.',
    image:       '/assets/stories/my-story-slug.jpg',
    accentColor: '#f97316',             // hex color for glow + badge
    link:        null,                  // or 'https://...' for external link
  },

4. Save and redeploy — no other code changes needed.
