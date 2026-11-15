# RailRush Design System

15 Nov 2026 · @Yashika Agrawal

RailRush looks like a night-service timetable: deep navy ground, one cyan signal colour, tabular numerals, and a route-line network drifting behind the content. The recommended background is a canvas route network that reacts to the cursor and pauses when it should.

## Identity and creative direction

RailRush is a night-service timetable come alive. The reference is the printed departure board and the route map in a carriage, not a control room: calm navy ground, a single cyan "signal" colour for anything that moves or can be acted on, and a warm clay "lantern" colour used sparingly for departures and highlights. Numbers (times, platforms, coaches, seats) are the main characters, so they get their own typography.

**Personality words:** precise, in motion, quietly confident, connected.

**Signature motifs** (use these and nothing else as decoration):

* **The route line**: a 1.5px line with round station nodes. It becomes the timeline, the map path, the loading indicator and the background network.
* **The tick scale**: small evenly spaced ticks, like a sleeper pattern or a ruler, used as dividers and progress marks.
* **The signal dot**: a cyan dot with a slow pulse that means "live" anywhere in the product.
* **Ticket ivory**: one paper-coloured surface (#F1E7CF) reserved for ticket and boarding-pass objects, so a ticket is recognisable on any page.

**What to avoid:** gradient hero blobs, glassmorphism on everything, glowing neon grids, rounded-everything cards, and any control-room chrome such as dense gauges or dark panels with green text.

## Three background concepts

The recommendation is Concept A, "Route Network": 2D canvas, global, with the other two used selectively. A prototype of it is published alongside this doc.

**A. Route Network.** Thin route lines connect about 14 to 22 station nodes laid out like a rail map, with straight runs and 45-degree bends. Tiny light "trains" travel the lines with short fading trails. The cursor acts as a lens: nodes within about 160px brighten and nearby lines gain a little opacity, and a faint ripple travels along lines from the node nearest the cursor. A slow drift moves the whole network; scroll shifts it at about 8% of scroll speed. Built with a single 2D `<canvas>`.

**B. Topographic Landscape.** Contour lines, as on a survey map, slowly morph behind the page, and a single route line crosses them. Contours shift gently with scroll and the cursor bends the nearest few. Built with SVG for a static version, or a WebGL shader (Three.js is more than needed; a raw fragment shader is enough) for the animated one.

**C. Horizon Rails.** Perspective rails converge to a vanishing point with sleepers rushing toward the viewer and a faint sky gradient that follows time of day. Scroll controls speed and the cursor shifts the vanishing point. Built with React Three Fiber, or CSS 3D transforms for a cheaper static version.


|                     | A. Route Network                                         | B. Topographic                       | C. Horizon Rails                            |
| ------------------- | -------------------------------------------------------- | ------------------------------------ | ------------------------------------------- |
| Technology          | Canvas 2D                                                | SVG static, WebGL shader animated    | React Three Fiber or CSS 3D                 |
| Cost on a laptop    | Low: about 2 to 4% CPU, one draw loop                    | Medium for shader, near zero for SVG | High: GPU plus about 150KB+ of library      |
| Mobile              | Fewer nodes (about 9), no cursor lens, pauses off-screen | Static SVG only                      | Static gradient image only                  |
| Scope               | Global ambient layer, dimmed under dense content         | Auth, empty states, route maps       | Landing and journey-start moments only      |
| Risk to readability | Low, lines stay under 12% opacity near content           | Low                                  | High: constant motion in the centre of view |

**Why A.** It is the only concept that is about the product itself: stations, connections and moving trains are what RailRush sells. It is also the cheapest to run, it degrades to a static drawing without losing meaning, and its elements (nodes, lines, trains) are the same ones the route timeline and map components use. B is a good secondary texture for sign-in and empty screens. C is striking but works against "never distract from booking", so keep it to a single landing moment if at all.

## Colour

Dark ("Night Service") is the default because the background layer reads best on it. Light ("Day Service") is a full equal, not an inversion. Every text pairing below was measured with the WCAG formula; the ratios are against the page base unless noted.


| Role             | Dark    | Light   | Reasoning and contrast                                                                  |
| ---------------- | ------- | ------- | --------------------------------------------------------------------------------------- |
| Base             | #0A111F | #F2F5F8 | Navy with a blue bias, cool paper in light; no pure black or white as ground            |
| Raised           | #0F1829 | #F8FAFC | Sticky bars, sidebars                                                                   |
| Surface 1        | #131E33 | #FFFFFF | Cards, inputs                                                                           |
| Surface 2        | #19273F | #E8EDF3 | Hover, selected rows, popovers                                                          |
| Surface 3        | #20314E | #DDE4ED | Pressed, chips                                                                          |
| Text primary     | #EAF0F8 | #0F1626 | 16.5:1 dark, 16.5:1 light                                                               |
| Text secondary   | #AAB7CD | #44516A | 9.3:1 dark, 7.3:1 light                                                                 |
| Text tertiary    | #7F8FAB | #566379 | 5.8:1 dark, 5.6:1 light (4.6:1 on Surface 2 in dark)                                    |
| Text disabled    | #55647F | #98A1B0 | Exempt from contrast; always paired with a disabled cursor and no hover                 |
| Border subtle    | #2B3C5C | #D3DAE4 | Decorative dividers only                                                                |
| Border strong    | #5B6F96 | #7D8AA1 | Input and control edges; 3.3:1 on Surface 1 in dark, 3.5:1 in light                     |
| Primary (Signal) | #2DB9CE | #0B7285 | Actions, links, live state; 8.0:1 dark, 5.1:1 light. Hover: #52CADB dark, #095C6B light |
| On primary       | #04202A | #FFFFFF | 7.2:1 on dark cyan, 5.6:1 on light teal                                                 |
| Accent (Lantern) | #E08A63 | #A94A24 | Departures, highlights, one per view; 7.2:1 dark, 5.2:1 light                           |
| Ticket ivory     | #F1E7CF | #F1E7CF | Ticket objects only, ink #1B1A17 on it is 14.2:1                                        |
| Secondary (Sage) | #8FBF9F | #3F7A5A | Calm accents such as completed route segments (9.1:1 dark)                              |
| Success          | #3DD68C | #0F7A56 | 10.1:1 dark, 4.9:1 light                                                                |
| Warning          | #F5B03A | #855400 | 10.0:1 dark, 5.9:1 light                                                                |
| Error            | #F2605C | #C42B2B | 5.9:1 dark, 5.2:1 light                                                                 |
| Info             | #5AA9F5 | #1B64C2 | 7.6:1 dark, 5.3:1 light                                                                 |

Rules: one primary and at most one accent colour per view. Semantic colours always travel with an icon and a label, never colour alone. Background-layer colours are the primary cyan and Sage at 6 to 14% opacity, so they never compete with text.

## Typography

Three faces, each with one job, all free on Google Fonts.

* **Barlow Semi Condensed** (500, 600, 700) for headings and station names. Barlow was drawn from highway and rail signage, so it carries the right heritage while staying compact enough for long place names such as "Chhatrapati Shivaji Maharaj Terminus".
* **Inter** (400, 500, 600) for body text and UI labels. Neutral, very legible at 14px.
* **IBM Plex Mono** (400, 500, 600) for every piece of operational data: times, train numbers, PNR, coach and seat codes, platform numbers, fares. Always with `font-variant-numeric: tabular-nums slashed-zero` so columns align and 0 is not mistaken for O.

Fallbacks: `'Barlow Semi Condensed', 'Arial Narrow', system-ui, sans-serif`; `Inter, system-ui, sans-serif`; `'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace`.


| Token   | Size / line height            | Weight | Face      | Use                                        |
| ------- | ----------------------------- | ------ | --------- | ------------------------------------------ |
| display | 56 / 60px (40 / 44 on mobile) | 700    | Barlow SC | Rare hero statements                       |
| h1      | 40 / 46px (32 / 38 on mobile) | 700    | Barlow SC | Page titles                                |
| h2      | 30 / 36px (24 / 30)           | 600    | Barlow SC | Section titles                             |
| h3      | 22 / 28px                     | 600    | Barlow SC | Card titles, station names                 |
| body-lg | 18 / 28px                     | 400    | Inter     | Lead paragraphs                            |
| body    | 16 / 24px                     | 400    | Inter     | Default text; 14 / 22px in dense tables    |
| label   | 13 / 18px, +0.04em, uppercase | 600    | Inter     | Field labels, eyebrows                     |
| caption | 12 / 16px                     | 400    | Inter     | Helper text, never below 12px              |
| time-xl | 36 / 40px                     | 500    | Plex Mono | Departure and arrival times on key moments |
| time    | 20 / 24px                     | 500    | Plex Mono | Times in lists and timelines               |
| data    | 14 / 20px                     | 400    | Plex Mono | PNR, train number, seat, fare              |

Timetable conventions: 24-hour times as 06:45; a +1 marker in small caps next to a next-day arrival; durations as 11h 25m with the units in the secondary text colour and the numbers in primary; train identifiers as 12951 · Rajdhani Express with the number in mono and the name in Inter. Keep running text to about 65 characters per line.

## Layout, spacing and surfaces


| Token group        | Values                                                                             | Notes                                                                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing (4px base) | 0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128                                        | Named space-0 to space-11; component padding uses 8 to 24, section gaps 48 to 96                                                                                  |
| Grid               | 4 columns under 640px, 8 from 640px, 12 from 1024px; 16px gutter, 24px from 1024px | CSS grid, not a framework grid                                                                                                                                    |
| Content width      | 1200px max for pages, 720px for reading text, 1440px for map and seat-map views    | Side padding 16px mobile, 24px tablet, 32px desktop                                                                                                               |
| Radius             | 2, 6, 10, 16, full                                                                 | 2 for tags and ticks, 6 for inputs and buttons, 10 for cards and dialogs, 16 for sheets, full for pills and signal dots. Ticket objects use 10 with notched edges |
| Breakpoints        | 480, 640, 768, 1024, 1280, 1536px                                                  | Design mobile first; layouts change at 640 and 1024                                                                                                               |

**Shadows.** In dark, depth comes from surface lightness plus a 1px inner top highlight (rgba(255,255,255,0.04)), not from drop shadows. Shadows are used only to lift floating layers: `shadow-float` is 0 12px 32px rgba(2,6,16,0.45) in dark and 0 10px 28px rgba(15,22,38,0.14) in light. Popovers and dialogs use it, cards do not.

**Surface treatments.** Three only: *solid* (default, opaque surface colours), *frosted* (Raised colour at 80% opacity with 12px backdrop blur, for the sticky navigation and popovers only, with a solid fallback), and *ticket* (ivory with notched edges and a perforation line).

## Component styling principles

These describe look and behaviour, not page layout.


| Component        | Look                                                                                                                                                                                                                                                            | Behaviour                                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | 40px tall (36 compact, 48 large), 6px radius, Inter 600 14px. Primary is solid Signal with On-primary text; secondary is Surface 2 with a strong border; ghost has no fill. Lantern is reserved for one confirm-style action per view                           | Hover brightens fill one step in 120ms; press moves down 1px; focus shows a 2px Signal ring with 2px offset; loading swaps the label for a three-dot route loader without changing width |
| Card             | Surface 1, 1px subtle border, 10px radius, 16 to 24px padding, no shadow                                                                                                                                                                                        | Interactive cards lift to Surface 2 and the border becomes Signal at 40% on hover; keyboard focus uses the ring                                                                          |
| Input            | 44px tall, Surface 1, 1px strong border, 6px radius, label above in label style, helper text below                                                                                                                                                              | Focus replaces the border with 2px Signal; error uses Error colour border plus an icon and a message; times and codes use Plex Mono                                                      |
| Navigation       | Frosted Raised bar, 56px tall, text links in secondary colour, active link in primary with a 2px Signal underline drawn as a route segment                                                                                                                      | Underline slides between links in 200ms; on mobile becomes a bottom bar of four to five items with labels                                                                                |
| Dropdown         | Surface 2 panel, 10px radius, shadow-float, 36px rows                                                                                                                                                                                                           | Opens in 140ms with a 4px rise and fade; arrow keys move, type-ahead works; station search highlights the matched letters in Signal                                                      |
| Dialog           | Surface 1, 16px radius on mobile sheets and 10px on desktop, scrim is Base at 70%                                                                                                                                                                               | Scale from 0.98 and fade in 200ms; focus is trapped and returns to the trigger; Escape closes                                                                                            |
| Status indicator | Pill with a 6px dot, an icon and a word: On time, Delayed 12m, Cancelled, Boarding. Colours from the semantic set at 14% fill with full-strength text                                                                                                           | Live status shows the pulsing signal dot; a change to Delayed flashes the pill once and does not repeat                                                                                  |
| Route timeline   | Vertical 1.5px line, 12px hollow station nodes, filled for passed, a larger Signal node for the current stop; times in Plex Mono on the left, station names in Barlow on the right; halts under 5 minutes are small ticks                                       | The line fills downward with the train's progress; the next station node pulses once on arrival                                                                                          |
| Map              | Muted basemap in Surface 1 and Surface 2 tones, routes drawn as 2px Signal lines, stations as white-ringed dots, the live train as a Lantern dot with a 12px halo                                                                                               | Pan and zoom are inertial; the train moves by interpolation between updates, never by jumps; labels thin out by zoom level                                                               |
| Seat map         | Seats are 32px rounded squares (40px on touch) in a coach outline. Available: Surface 2 with strong border. Selected: solid Signal. Taken: striped Surface 3 with no border. Berth type is shown by shape and a letter (LB, MB, UB, SL, SU), never colour alone | Hover shows the seat code and fare in a tooltip; selection animates a 120ms scale to 1.06 and back; focus order follows coach reading order                                              |
| Notification     | Toast: Surface 2, 10px radius, left icon in the semantic colour, bottom-centre on mobile and top-right on desktop                                                                                                                                               | Enters with a 160ms slide and fade; auto-dismisses after 5s (8s for errors) and pauses on hover and focus; announced through`role=status`(errors`role=alert`)                            |

## Motion

Principle: things move the way a train does, with a smooth start, steady travel and a controlled stop. Motion confirms a state change or shows a live process. It never loops for decoration inside the content area.


| Token            | Value                           | Use                                                               |
| ---------------- | ------------------------------- | ----------------------------------------------------------------- |
| duration-instant | 80ms                            | Press feedback                                                    |
| duration-fast    | 140ms                           | Hover, focus, dropdowns                                           |
| duration-base    | 220ms                           | Cards, dialogs, toasts                                            |
| duration-slow    | 400ms                           | Page and panel transitions                                        |
| duration-route   | 900 to 1400ms                   | Route line draw-in, timeline fill                                 |
| ease-depart      | cubic-bezier(0.2, 0, 0, 1)      | Default for elements entering or moving: quick start, long settle |
| ease-arrive      | cubic-bezier(0.3, 0, 0.8, 0.15) | Elements leaving                                                  |
| ease-glide       | cubic-bezier(0.4, 0, 0.2, 1)    | Colour and opacity changes                                        |

* **Hover:** colour and surface changes only, plus a 1px lift on interactive cards. No scaling above 1.02.
* **Page transitions:** the outgoing page fades out in 140ms and the incoming page rises 8px while fading in over 220ms. Shared elements such as a selected train card to its detail header can morph with the View Transitions API, with a plain fade as the fallback. The background layer never restarts between pages.
* **Scroll:** only the background parallax (8% rate) and a one-time reveal of below-the-fold sections (12px rise and fade, played once, content readable without it). No scroll-jacking, no pinned animation sections.
* **Background behaviour:** about 30fps drawing, paused when the tab is hidden, when the canvas is off-screen, or when the device is on battery saver; trains pause while a dialog is open; opacity drops to 60% behind dense tables and seat maps.
* **Loading:** under 300ms show nothing; up to 2s a three-node route loader (nodes light in sequence); beyond that skeleton surfaces in Surface 2 with a slow sheen. Never a full-screen spinner.
* **Micro-interactions:** seat select pop, a tick drawing itself on a confirmed booking (400ms), the signal dot's pulse (2.4s, only on live items), and a number ticker for fares that changes digits in place without layout shift.
* **Reduced motion:** with `prefers-reduced-motion: reduce`, the background renders one static frame with no trains and no cursor response, durations collapse to 0 to 80ms fades, reveals show immediately, the signal dot stops pulsing, and parallax is off. A visible in-app toggle ("Calm mode") offers the same setting, and it also turns on automatically when the device reports low power or save-data.

## Design tokens

Two layers. **Primitive** tokens hold raw values. **Semantic** tokens say what a value is for (`--color-action`) and are the only ones components use. Themes swap the semantic layer, so a component never knows which theme it is in.

```css
:root {
  /* colour, semantic (light values; dark values are redefined under
     prefers-color-scheme and [data-theme=dark]) */
  --color-bg: #F2F5F8;  --color-raised: #F8FAFC;
  --color-surface-1: #FFFFFF;  --color-surface-2: #E8EDF3;  --color-surface-3: #DDE4ED;
  --color-text: #0F1626;  --color-text-2: #44516A;  --color-text-3: #566379;
  --color-border: #D3DAE4;  --color-border-strong: #7D8AA1;
  --color-action: #0B7285;  --color-action-hover: #095C6B;  --color-on-action: #FFFFFF;
  --color-accent: #A94A24;  --color-ticket: #F1E7CF;  --color-ticket-ink: #1B1A17;
  --color-success: #0F7A56;  --color-warning: #855400;
  --color-error: #C42B2B;  --color-info: #1B64C2;
  --color-focus: #0B7285;

  /* typography */
  --font-display: 'Barlow Semi Condensed', 'Arial Narrow', system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-data: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
  --text-xs: .75rem;  --text-sm: .875rem;  --text-base: 1rem;  --text-lg: 1.125rem;
  --text-xl: 1.375rem;  --text-2xl: 1.875rem;  --text-3xl: 2.5rem;  --text-4xl: 3.5rem;

  /* spacing, radius, shadow */
  --space-1: .25rem;  --space-2: .5rem;  --space-3: .75rem;  --space-4: 1rem;
  --space-6: 1.5rem;  --space-8: 2rem;  --space-12: 3rem;  --space-16: 4rem;  --space-24: 6rem;
  --radius-xs: 2px;  --radius-sm: 6px;  --radius-md: 10px;  --radius-lg: 16px;  --radius-full: 999px;
  --shadow-float: 0 10px 28px rgba(15,22,38,.14);

  /* motion */
  --dur-instant: 80ms;  --dur-fast: 140ms;  --dur-base: 220ms;  --dur-slow: 400ms;  --dur-route: 1100ms;
  --ease-depart: cubic-bezier(.2,0,0,1);
  --ease-arrive: cubic-bezier(.3,0,.8,.15);
  --ease-glide: cubic-bezier(.4,0,.2,1);

  /* z-index layers */
  --z-background: -1;  --z-base: 0;  --z-sticky: 20;  --z-dropdown: 40;
  --z-overlay: 60;  --z-dialog: 70;  --z-toast: 80;  --z-tooltip: 90;

  /* background treatment */
  --bg-line: rgba(11,114,133,.14);       /* route lines */
  --bg-node: rgba(11,114,133,.30);       /* stations */
  --bg-train: rgba(169,74,36,.55);       /* moving trains */
  --bg-opacity-default: 1;
  --bg-opacity-dense: .6;                /* behind tables and seat maps */
  --bg-parallax: .08;
  --bg-fps: 30;
}
```

In dark, the background tokens become `--bg-line: rgba(45,185,206,.12)`, `--bg-node: rgba(82,202,219,.35)` and `--bg-train: rgba(241,231,207,.8)`.

**Tailwind.** Map the semantic variables rather than the raw hex values, so themes work without `dark:` prefixes on every class:

```ts
// tailwind.config.ts (excerpt)
colors: {
  bg: 'var(--color-bg)',
  surface: { 1: 'var(--color-surface-1)', 2: 'var(--color-surface-2)', 3: 'var(--color-surface-3)' },
  text: { DEFAULT: 'var(--color-text)', 2: 'var(--color-text-2)', 3: 'var(--color-text-3)' },
  action: { DEFAULT: 'var(--color-action)', hover: 'var(--color-action-hover)' },
  accent: 'var(--color-accent)',
},
fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)', data: 'var(--font-data)' },
borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)' },
transitionTimingFunction: { depart: 'var(--ease-depart)', arrive: 'var(--ease-arrive)' },
```

**Organisation in React and TypeScript.**

```
src/design/
  tokens/
    primitives.css     raw palette and scales
    theme-light.css    semantic tokens, light
    theme-dark.css     semantic tokens, dark
    motion.css         durations, easings, reduced-motion overrides
  tokens.ts            typed names: export const color = { action: 'var(--color-action)' } as const
  motion.ts            duration and easing constants for Motion / JS animation
  theme/ThemeProvider.tsx   sets data-theme, exposes calm mode, persists the choice
  background/
    RouteNetwork.tsx   the canvas layer, mounted once in the app shell
    useBackgroundMode.ts   reads reduced-motion, save-data, visibility, route density
  components/ui/       Button, Card, Input, StatusPill, RouteTimeline ... (use semantic tokens only)
```

Rules: components never contain literal colours or durations; a new value is added as a token first; mount the background once in the app shell so it survives route changes; use CSS for transitions and the Motion library only for orchestrated sequences, which keeps the bundle small.

## Responsive and accessibility

**Responsive**

* Mobile first. Base styles are written for 360px; layouts change at 640 and 1024px.
* Touch targets are at least 44px, 48px for seat-map seats and primary booking actions.
* Timetable rows collapse to a two-line layout under 640px: times and duration on the first line, station names on the second. Wide data tables scroll horizontally in their own container with a sticky first column.
* Background on mobile: about 9 nodes, no cursor lens, a gentle tilt-free drift, 30fps cap, device pixel ratio capped at 1.5, and no animation when the page is not visible.
* Respect safe-area insets on bars and sheets; use `100dvh` rather than `100vh`.

**Accessibility**

* Body text meets 4.5:1 and large text and control borders 3:1 in both themes (values in the colour table were measured).
* Every interactive element has a visible 2px focus ring; the ring colour meets 3:1 against its background in both themes.
* Status, seat state and delay never rely on colour alone; each has an icon or text.
* The background canvas is `aria-hidden`, has `pointer-events: none`, and never receives focus.
* Live train updates use polite live regions, throttled to one announcement per 30 seconds per train.
* The seat map is a grid of buttons with labels such as "Coach B2, seat 34, lower berth, available, 1,240 rupees", operable by arrow keys.
* Support browser zoom to 200% and text resizing without loss of function; use rem for type and spacing.
