# Character plan

An illustrated character of Eyad that gives the portfolio personality. It appears mostly in the personal and hobbies part and only occasionally in the professional parts.

## Where it appears

| Area | How much | What |
| --- | --- | --- |
| Hero / intro | 1 scene | Character waves or points at the name, fading in on load |
| Off the clock (hobbies) | Most | One scene per hobby with light motion: running, jumping, playing, reading. This is where it feels most fun. |
| Freelance work | Light, static | One home-desk scene: laptop, plant, coffee, the character at the desk |
| Professional work | Light, static | One "remote job" scene: character in a shirt on a video call, team on screen |
| Contact / footer | 1 small pose | Character pointing at the contact buttons or waving goodbye |

The professional sections stay clean: one or two still images, no motion.

## Look

- One consistent style, flat or soft 3D with rounded shapes, using the portfolio's palette
- Made from Eyad's real photo so it looks like him (glasses, hair, beard as they are)
- Outfits: a casual hoodie for hobbies and home, a shirt for professional work
- Transparent backgrounds (PNG/WebP) or vector (SVG/Lottie), so scenes sit on the site's own colours in light and dark mode

## Motion (hobbies and hero only)

- Fade and slide in as a section scrolls into view (existing scroll reveals)
- Short loops: running, jumping, pointing, waving. Lottie or sprite sheets, each under ~150 KB
- Respect "reduce motion": show still poses instead
- No motion in the professional sections

## How to make the character

1. **Source photo:** Eyad provides one or two clear front-facing photos (this needs his input).
2. **Generate the base character** from the photo with an image tool (for example ChatGPT image generation, Midjourney with a character reference, or Leonardo). Lock one "character sheet": front, side, a few expressions.
3. **Generate each scene** with the same character reference so he looks identical: desk, remote job, each hobby, waving, pointing.
4. **Animate** the hobby and hero poses: either a short loop of frames per pose turned into a sprite or WebP animation, or LottieFiles / Rive for vector motion.
5. **Optimise:** WebP or AVIF stills under 120 KB, lazy-loaded below the fold.

## Build steps in the portfolio

1. `Character` component: picks a pose, handles fade-in, lazy loading and reduced motion
2. Hero: the waving character next to the intro
3. Off the clock: a scene per hobby card with its loop
4. Freelance and professional headers: one still scene each
5. Footer: the pointing pose by the contact links
6. Check performance (Lighthouse), light and dark mode, and mobile layout

## Needs from Eyad before starting

- One or two photos to base the character on
- Whether to use a paid image tool, or accept a free-tool result
- The hobbies to illustrate (the current Off the clock list is the starting point)
