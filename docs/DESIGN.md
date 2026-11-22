# Portfolio design

The direction board for this site: what to keep consistent when adding to it.

## Idea

Two moods in one place. The **professional side** is a crisp white shirt on a dark suit: bright, energetic and ready for work. The **personal side** (Off the clock) is a cosy room at night where each corner is an interest. An illustrated Eyad connects both.

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#08090d` | Page |
| `--surface`, `--surface-2` | `#11141c`, `#171b26` | Cards and widgets |
| `--text`, `--muted`, `--faint` | `#eef1f7`, `#98a1b6`, `#5d6579` | Text levels |
| `--accent` | `#8ea2ff` | Links, focus, progress, the room's details |
| Hire card | `#f8f8f4` paper, `#12204a` ink, `#c6f43a` lime edge | The one bright surface: "open to work" |
| App colours | From each app's own branding | Project cards and screenshots |

The site is dark by design; the hire card is the deliberate exception.

## Type

- **Display:** Space Grotesk (headings, the name, the hire card title)
- **Text:** Inter
- **Arabic:** IBM Plex Sans Arabic, loaded with `display=optional` so the Arabic page never shifts

## Shape and spacing

- 24 px radius on widgets and cards; 999 px on pills and chips
- One accent per view; app colours stay inside their own cards
- Generous gaps between sections (`clamp(3rem, 8vw, 6rem)`); widgets align to one grid

## The character

An avatar-style cartoon (big head, soft shading, expressive eyes, in the spirit of a Bitmoji but drawn from scratch) in code (`src/components/Character.tsx`) from Eyad's photos: wavy dark hair, thick brows; light stubble with the suit, a fuller beard in casual outfits (black zip hoodie over a blue tee; white tee and aviators for travel and sport). The professional Experience page uses Eyad's real photo instead, as a 3D relief (`src/components/Portrait3D.tsx`, `public/me/portrait-3d.webp`, `portrait-depth.png` and `portrait-normal.webp`; the normals are from Sapiens, CC BY-NC, fine for this non-commercial site); the cartoon is for the rest of the site and the personal side.

| Where | Outfit | Pose |
|---|---|---|
| Home hero tile and hero scene | Suit | Wave, point |
| Experience: hire card | Real portrait (white shirt), not the cartoon | — |
| Say hello | Suit | Point |
| Explore the room | Hoodie, travel, sport | Wave, point, stand |

He stays small and to the side; he never covers content. On dark surfaces he gets a soft accent glow so the suit reads.

## Motion

- Scroll reveals and view transitions as they are
- The character breathes and waves; the room camera pans; the hero phone floats
- Everything stops or cuts with `prefers-reduced-motion`
- No motion on the professional content itself (text, cards, numbers)
