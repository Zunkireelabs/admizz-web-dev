# Admizz Education — Design System

Extracted from the live WordPress site (Astra theme + Elementor page builder).

---

## Tech Stack (WordPress)
- **Theme:** Astra
- **Page Builder:** Elementor
- **Font Service:** Google Fonts
- **Analytics:** Google Tag Manager, Facebook Pixel, Google Site Kit

---

## Typography

**Font Family:** `"Montserrat", sans-serif`

**Weights loaded:** 300, 400, 500, 600, 700

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap
```

**Font Sizes:**
| Token | Size | Usage |
|-------|------|-------|
| xs | 12px | Input fields, small labels |
| sm | 13px | Small text, WordPress "small" preset |
| base | 15px | Body text, buttons |
| md | 18px | Subheadings, labels |
| lg | 20px | WordPress "medium" preset |
| xl | 28px | Section headings (h2/h3) |
| 2xl | 36px | WordPress "large" preset |
| 3xl | 42px | WordPress "x-large" preset, hero headings |

**Line Height:** 1.6 (general), block spacing 24px

---

## Color Palette

### Primary
| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#001353` | Primary text color, headings |
| Dark Blue | `#0D1282` | Buttons, links, CTAs |
| Royal Blue | `#31429C` | Gradient start |
| Oxford Blue | `#002147` | Heading titles |

### Accent (Yellow)
| Name | Hex | Usage |
|------|-----|-------|
| Yellow Primary | `#FDED22` | Primary accent, highlighted headings |
| Yellow Bright | `#FAE445` | Gradient end |
| Golden | `#FCB730` | Gradient start |
| Golden Hover | `#FFC229` | Border hover state |
| Golden Rating | `#FFC53F` | Star ratings |

### Neutrals
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Backgrounds, text on dark |
| Off White | `#F8F8F8` | Section backgrounds |
| Light Gray | `#F7F7F7` | Alt section backgrounds |
| Light Cyan | `#ECFEFF` | Special section backgrounds |
| Border Light | `#D7DAE8` | Light borders |
| Border | `#E8DFDF` | Standard borders |
| Border Input | `#eaecf1` | Input field borders |
| Gray Medium | `#949494` | Secondary borders, muted text |
| Gray | `#656565` | Hover text |
| Gray Dark | `#5C7189` | Secondary text |
| Slate | `#292E3E` | Body text alternative |
| Black | `#000000` | Text, button text on yellow |

### Semantic
| Name | Hex | Usage |
|------|-----|-------|
| Error | `#e04562` | Form error states |
| Error Alt | `#c41e3a` | Form error borders/text |
| Link Blue | `#007cba` | Active tab indicator |

---

## Spacing Scale (WordPress Presets)

| Token | Value |
|-------|-------|
| 20 | 0.44rem (7px) |
| 30 | 0.67rem (10.7px) |
| 40 | 1rem (16px) |
| 50 | 1.5rem (24px) |
| 60 | 2.25rem (36px) |
| 70 | 3.38rem (54px) |
| 80 | 5.06rem (81px) |

**Section padding:** ~50px horizontal padding on content sections

---

## Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Mobile | 767px | Mobile layout |
| Tablet | 921px | Astra theme breakpoint, hamburger menu |
| Desktop | 1024px | Full desktop layout |

---

## Buttons

### Primary Button (Yellow CTA)
```css
background: #FDED22;
color: #000000;
padding: 10px 16px;
border-radius: 10px;
border: none;
font-size: 15px;
font-family: Montserrat, sans-serif;
font-weight: 600;
cursor: pointer;
```

### Dark Button (Blue CTA)
```css
background: #0D1282;
color: #FFFFFF;
padding: 10px 16px;
border-radius: 10px;
font-size: 15px;
font-weight: 600;
```

### Default WP Button
```css
background: #32373c;
color: #FFFFFF;
padding: calc(0.667em + 2px) calc(1.333em + 2px);
```

---

## Form Elements

### Input Fields
```css
height: 40px;
padding-left: 10px;
background: #FFFFFF;
border: 1px solid #eaecf1;
border-radius: 10px;
font-size: 12px;
font-family: Montserrat, sans-serif;
color: #000000;
/* placeholder */
color: #888888;
```

### Textarea
```css
height: 80px;
/* same styles as input */
```

### Error State
```css
box-shadow: inset 2px 0 0 0 #e04562;
```

### Form Container (CTA sidebar on country pages)
```css
max-width: 480px;
background: #FFFFFF;
border: 1px solid #b5bbc294;
border-radius: 6px;
```

---

## Cards & Containers

```css
border-radius: 10px; /* standard */
```

### Shadows (WordPress presets)
| Name | Value |
|------|-------|
| Natural | `6px 6px 9px rgba(0, 0, 0, 0.2)` |
| Deep | `12px 12px 50px rgba(0, 0, 0, 0.4)` |
| Sharp | `6px 6px 0px rgba(0, 0, 0, 0.2)` |

---

## Gradients

| Name | Value |
|------|-------|
| Yellow | `#FCB730 → #FAE445` |
| Blue | `#31429C → #3D60ADA1` |

---

## Header

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Logo | Left-aligned, 179x58px |
| Logo (light bg) | `Admizz-Education-New-Logo-For-Light-Background.webp` |
| Logo (dark bg) | `Admizz-Education-New-Logo-For-Dark-Background-1.png-1.webp` |
| Nav items | Study Destinations (dropdown), Test Prep, About, Blogs |
| CTA | "Register" button (links to /register/) |
| Mobile breakpoint | 921px (hamburger menu) |

### Study Destinations Dropdown
- Study in the USA → `/study-in-the-usa/`
- Study in the UK → `/study-in-the-uk/`
- Study in Australia → `/study-in-australia/`
- Study in Canada → `/study-in-canada/`
- Study in New Zealand → `/study-in-newzealand/`
- Study in South Korea → `/study-in-south-korea/`
- Study in India → `/study-in-india/`
- Study in France → `/study-in-france/`
- Study in Denmark → `/study-in-denmark/`
- Study in Dubai → `/study-in-dubai/`

---

## Footer

| Property | Value |
|----------|-------|
| Background | Dark (navy/dark blue) |
| Text color | Light/white |
| Logo | Dark background variant |
| Layout | 4 columns |
| Copyright | "© 2026, All rights reserved. Admizz Education." |

### Column 1: Brand
- Logo (dark bg variant)
- Description text

### Column 2: Quick Links
- Test Preparation
- Students
- Recruitment Partners
- Colleges & Universities
- Blogs

### Column 3: Company
- About
- Careers
- Contact Us
- Privacy Policy

### Column 4: Social Media
- Facebook: `https://www.facebook.com/admizz`
- Twitter: `https://twitter.com/admizz_official`
- Instagram: `https://www.instagram.com/admizz_official/`
- YouTube: `https://youtube.com/c/Admizz_official`
- TikTok: `https://www.tiktok.com/@admizz_official`
- LinkedIn: `https://www.linkedin.com/company/admizzofficial/`

---

## Country Study Page Pattern

Shared layout across all 10 country pages:
- Hero banner with country heading (ALL CAPS)
- CTA form overlay/sidebar (sticky on desktop)
- Tab navigation for sections (active: `#007cba` border-bottom)
- Content sections: requirements, costs, universities, FAQ
- University logo grid
- Submit button: `background: #0D1282; color: #fff`

---

## Homepage Sections (10)

1. **Hero** — CTA text + image + registration form
2. **Trust Indicators** — 4 stat cards (1500+ students, 100+ institutions, 95% visa rate, $2M+ scholarships)
3. **Services** — 4 icon cards (Counseling, Scholarship, Visa, Post-Arrival)
4. **Three Pillars** — Students / Recruitment Partners / Colleges & Universities
5. **Study Destinations Grid** — 5 country cards with images
6. **Test Preparation** — Features + 6 test logos (IELTS, GRE, TOEFL, PTE, SAT, Duolingo)
7. **Testimonials** — Carousel with student quotes + star ratings
8. **FAQ** — Accordion with 10 questions
9. **Partner Universities** — Logo grid (UK section: 15 logos, USA section: 22 logos)
10. **Footer** — 4-column layout

---

## Downloaded Assets (76 files, 3.2MB)

```
public/images/
├── logos/          — 5 files (light bg, dark bg, square, USA variant)
├── icons/          — 7 files (service icons, test prep icons)
├── destinations/   — 5 files (usa1, uk1, aus1, canada1, india1)
├── hero/           — 2 files (main hero, study abroad section)
├── test-prep/      — 6 files (IELTS, GRE, TOEFL, PTE, SAT, Duolingo logos)
├── decorative/     — 2 files (counselling section side objects)
├── about/          — 12 files (main image, achievements, founder, mission/vision)
└── universities/
    ├── uk/         — 15 files (university logos)
    └── usa/        — 22 files (university logos)
```
