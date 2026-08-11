# A Fórmula do Som — Design System

Car customization shop in Belo Horizonte, MG, Brazil — window tinting (película/PPF), automotive lighting (LED/neon), multimedia/infotainment installs, upholstery (revestimento), and detailing. In business since 1994, two locations (Glória, Buritis). Public presence is centered on Instagram: [@a_formuladosom](https://www.instagram.com/a_formuladosom) (525 posts, ~226k followers) plus a Linktree (linktr.ee/aformuladosom01).

**Sources provided:** a logo file (`uploads/logo-1785196243587.jpg`) and one screenshot of the Instagram profile (`uploads/screenshots-1785196247178.png`). No codebase, no Figma file, no font files, no marketing website were provided. Everything here — colors, imagery, UI kit — was built from those two files plus web search for basic business facts. **This is a thin source base; treat this as a v1 draft, not a locked brand system.**

## Index
- `styles.css`, `tokens/` — color, type, spacing, font-face tokens
- `guidelines/` — foundation specimen cards (colors, type, spacing, logo, imagery)
- `assets/` — logo (`logo-mark.jpg`, `logo-crop-circle.png`), cropped feed photography (`imagery/`)
- `components/core/` — **Button**, **CaptionTag**, **CategoryBadge**, **IconChip**, **PromoCard**
- `ui_kits/instagram/` — click-through recreation of the Instagram profile
- `SKILL.md` — Claude Code / Agent Skills–compatible entry point

## Components
- **Button** — flame-gradient CTA, `primary`/`secondary`/`ghost`, 3 sizes.
- **CaptionTag** — the black pill caption the brand stamps on feed photos ("Full PPF Gloss").
- **CategoryBadge** — pill for service categories (Iluminação, Película, Kit Neon RGB...).
- **IconChip** — story-highlight circle with flame-gradient ring + label.
- **PromoCard** — feed photo + caption-pill overlay, the brand's core marketing unit.

No component library source was available (no Figma, no code), so this is a from-scratch minimal set sized to what the brand's Instagram presence actually uses — not a full app component library. See "Intentional additions" below.

### Intentional additions
Every component above is an addition, since no source defined an inventory. Kept deliberately small: only what recreates the profile and its promo-photo style (button, two tag types, story icon, promo card) — not a generic Button/Input/Select/Dialog kit, since there's no evidence this brand runs a product UI beyond Instagram.

## Content fundamentals
- **Language:** Brazilian Portuguese, informal/colloquial ("Bora resolver!", "Quem disse que Corolla não?").
- **Voice:** playful, provocation-style hooks that needle a stereotype then flip it — e.g. "Cansado da BMW que tudo mundo tem?" — rhetorical-question captions that lead into a car reveal.
- **Casing:** sentence case; captions are short, punchy, one-liners, not paragraphs.
- **Emoji:** used sparingly, functionally — a single ⭐ next to "Desde 1994" in the bio; not decorative emoji clusters.
- **Structure:** bio uses bullet-style lines prefixed with "•" ("•Desde 1994 ⭐", "•Confira nossos contatos").
- **Vibe:** enthusiast/insider — car culture pride, "no common car" flex energy, aimed at car owners wanting their vehicle to stand out.

## Visual foundations
- **Color:** true black backgrounds throughout (Instagram-dark aesthetic carried into the brand itself). Signature asset is the **flame gradient** — bright orange fading into deep red — sampled directly from the logo mark (`#FF9D4D → #F2883D → #A31B0F → #7A150C`). This gradient is the brand's one strong visual signature; use it for rings, CTAs, and accents, not as a background wash.
- **Type:** no brand font files were supplied. Feed-photo captions use a bold, tight, geometric sans (see "Full PPF Gloss" caption style) — substituted here with **Poppins** (weights 400–800) as the nearest Google Fonts match for display/caption use, and **Inter** for body/UI text. **This is a substitution — flag to the user and ask for real font files if the shop has brand type.**
- **Imagery:** dark garage/showroom photography — moody, low-key lighting, often with LED strip or neon accent lighting visible in-frame (hexagonal LED panel ceiling, red/neon underglow). Cars are glossy, detailed, shot straight-on or 3/4 angle. No stock imagery — always real inventory/customer cars. No illustration, no icons drawn over photos beyond the caption pill.
- **Backgrounds:** solid black; no patterns, textures, or gradients as full backgrounds. Photography is always full-bleed within its frame (feed tile, story circle) — never inset in decorative frames.
- **Animation:** no evidence available (static screenshot only) — assume simple, no-bounce fades/opacity transitions consistent with Instagram's own UI; nothing brand-specific observed.
- **Hover/press states:** not observable from a static screenshot. Components here use a conservative default: slight brightness increase on hover, slight scale-down on press — typical, unobtrusive, not brand-confirmed.
- **Borders/shadows:** feed photos have no visible border or shadow in-app (Instagram's own chrome). For the UI kit's card component, a soft dark drop shadow (`--shadow-card`) was added for the pulled-out promo-card use case (not from a source, since the feed itself has no elevation).
- **Caption overlays:** the brand's one recurring graphic device — a solid black (not semi-transparent) rounded-rect pill, bold white type, stamped in the lower-left/left third of the photo. Sometimes stacked as a headline pill + smaller secondary pill beneath it ("Full PPF" / "Gloss").
- **Corner radii:** the caption pills use a modest rounded-rect (~8–10px equivalent at this scale). Story-highlight icons and the logo badge are full circles.
- **Transparency/blur:** none observed — no frosted-glass panels, no translucent overlays; the caption pill itself is solid black, not blurred/translucent.
- **Layout:** standard Instagram profile chrome (avatar left, stats/bio right, story-highlight row, 3-column grid) — the brand hasn't diverged from platform layout; its identity lives in the photography + gradient + caption-pill style, not in custom UI structure.

## Iconography
- No custom icon system, icon font, or SVG set observed — the brand uses Instagram's native UI icons only (grid/reels/tagged tabs, verified badge, chat bubble).
- The only recurring "icon" is the **logo mark itself**, reused as the avatar and as every story-highlight circle's base image.
- One emoji (⭐) is used functionally in the bio; no emoji used as icons elsewhere.
- No custom iconography assets exist to copy in beyond the logo. If the shop has a proper icon/pictogram set for service categories (lighting, tint, audio, etc.) that would be a strong addition — ask the user to share it if one exists.

## Caveats & what's missing
- **No codebase or Figma was attached.** Everything above is reverse-engineered from one profile screenshot + one logo file, per instructions — no UI was invented beyond recreating the visible Instagram profile.
- **Font files are a placeholder substitution** (Poppins/Inter) — the brand's actual caption typeface was not identified from a single low-res screenshot. Please share real font files if available.
- Only one logo lockup exists (the circular badge) — no wordmark/lettermark, no light-on-white version, no favicon/app-icon variants were supplied.
- No color values are confirmed brand tokens (e.g. from a brand guide) — they were pixel-sampled from the one logo JPEG, so treat exact hex values as approximate.
- Hover/press/animation behavior is entirely assumed (static source), not confirmed against a live product.

**Ask:** please share more material if you have it — additional post/story screenshots (for more imagery + copy examples), the shop's actual logo files (vector, light variants), any brand guide or font files, and let me know if there's a website beyond the Linktree. With that I can tighten the palette, replace the substituted font, and expand the UI kit past the profile view (e.g. a promo/landing page, or WhatsApp-catalog-style service menu).
