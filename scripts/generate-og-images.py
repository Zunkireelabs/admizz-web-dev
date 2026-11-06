#!/usr/bin/env python3
"""Generate one 1200x630 link-preview (Open Graph) image per country page.

Usage:   python3 scripts/generate-og-images.py        (needs Pillow: pip install pillow)
Output:  public/images/og/countries/<page-folder>.jpg  (commit the results)

Fonts in scripts/og-fonts are static copies of the site's Rubik / Montserrat (OFL),
so the images match the website. Colors per country mirror each page's `flagColors`.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONTS = ROOT / "scripts" / "og-fonts"
OUT_DIR = PUBLIC / "images" / "og" / "countries"
LOGO = PUBLIC / "images/logos/Admizz-Education-New-Logo-For-Dark-Background-1.png-1-1024x331.webp"

W, H = 1200, 630
LEFT = 72
MAX_TITLE_WIDTH = 640

NAVY = (0, 19, 83)
GOLD = (252, 183, 48)

# (page folder, name shown on the image, photo under public/, flag colors)
COUNTRIES = [
    ("study-in-the-uk", "THE UK", "images/hero/uk-hero.jpg", ["#012169", "#C8102E"]),
    ("study-in-the-usa", "THE USA", "images/hero/usa-hero.jpg", ["#0A3161", "#B31942"]),
    ("study-in-canada", "CANADA", "images/hero/canada-hero.jpg", ["#D52B1E", "#8C1B14"]),
    ("study-in-australia", "AUSTRALIA", "images/hero/australia-hero.jpg", ["#012169", "#E4002B"]),
    ("study-in-newzealand", "NEW ZEALAND", "images/hero/newzealand-hero.webp", ["#00247D", "#CC142B"]),
    ("study-in-france", "FRANCE", "images/hero/france-hero.jpg", ["#0055A4", "#EF4135"]),
    ("study-in-germany", "GERMANY", "images/hero/germany-hero.jpg", ["#2B2B2B", "#DD0000", "#E0A800"]),
    ("study-in-denmark", "DENMARK", "images/hero/denmark-hero.jpg", ["#C8102E", "#8E0B20"]),
    ("study-in-finland", "FINLAND", "images/destinations/finland1.jpg", ["#003580", "#1E5BB8"]),
    ("study-in-india", "INDIA", "images/hero/india-hero.jpg", ["#E8751A", "#138808"]),
    ("study-in-nepal", "NEPAL", "images/hero/nepal-hero.jpg", ["#DC143C", "#9E0F2A"]),
    ("study-in-south-korea", "SOUTH KOREA", "images/hero/south-korea-hero.jpg", ["#CD2E3A", "#0047A0"]),
    ("study-in-dubai", "UAE", "images/hero/dubai-hero.jpg", ["#00732F", "#C8102E"]),
]


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


def hex_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def cover(img: Image.Image, w: int, h: int) -> Image.Image:
    """Resize and centre-crop to fill w x h."""
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left, top = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((left, top, left + w, top + h))


# Pale photos need a stronger overlay on the right so they don't look washed out
RIGHT_ALPHA = {"study-in-australia": 0.62}


def side_gradient(right: float = 0.30) -> Image.Image:
    """Navy overlay, strong on the left (text side), light on the right (photo side)."""
    stops = [(0.0, 0.95), (0.5, 0.82 if right < 0.5 else 0.78), (1.0, right)]
    alphas = []
    for x in range(W):
        t = x / (W - 1)
        for (t0, a0), (t1, a1) in zip(stops, stops[1:]):
            if t0 <= t <= t1:
                a = a0 + (a1 - a0) * (t - t0) / (t1 - t0)
                break
        alphas.append(round(a * 255))
    mask = Image.new("L", (W, 1))
    mask.putdata(alphas)
    mask = mask.resize((W, H), Image.NEAREST)
    layer = Image.new("RGBA", (W, H), NAVY + (0,))
    layer.putalpha(mask)
    return layer


def flag_bar(colors: list[str], w: int = 180, h: int = 8) -> Image.Image:
    rgb = [hex_rgb(c) for c in colors]
    bar = Image.new("RGB", (w, h))
    px = bar.load()
    for x in range(w):
        t = x / (w - 1) * (len(rgb) - 1)
        i = min(int(t), len(rgb) - 2)
        f = t - i
        c = tuple(round(rgb[i][k] + (rgb[i + 1][k] - rgb[i][k]) * f) for k in range(3))
        for y in range(h):
            px[x, y] = c
    mask = Image.new("L", (w * 4, h * 4), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w * 4 - 1, h * 4 - 1), radius=h * 2, fill=255)
    out = bar.convert("RGBA")
    out.putalpha(mask.resize((w, h), Image.LANCZOS))
    return out


def build(folder: str, name: str, photo: str, colors: list[str]) -> None:
    img = cover(Image.open(PUBLIC / photo).convert("RGB"), W, H).convert("RGBA")
    img.alpha_composite(side_gradient(RIGHT_ALPHA.get(folder, 0.30)))

    logo = Image.open(LOGO).convert("RGBA")
    logo = logo.resize((250, round(logo.height * 250 / logo.width)), Image.LANCZOS)
    img.alpha_composite(logo, (LEFT, 52))

    draw = ImageDraw.Draw(img)

    # fit the country name to the text column
    size = 120
    while size > 56:
        title_font = font("OGRubik-Bold.ttf", size)
        if draw.textlength(name, font=title_font) <= MAX_TITLE_WIDTH:
            break
        size -= 4
    eyebrow_font = font("OGMontserrat-SemiBold.ttf", 36)
    tag_font = font("OGMontserrat-Medium.ttf", 28)
    domain_font = font("OGMontserrat-Medium.ttf", 24)

    cap = lambda f: -f.getbbox("H", anchor="ls")[1]  # cap height in px
    gap_eyebrow, gap_title, bar_h, gap_bar = 20, 28, 8, 34
    stack = cap(eyebrow_font) + gap_eyebrow + cap(title_font) + gap_title + bar_h + gap_bar + cap(tag_font)
    y = (H - stack) // 2 + 20

    # eyebrow with letter spacing
    x = LEFT
    y += cap(eyebrow_font)
    for ch in "STUDY IN":
        draw.text((x, y), ch, font=eyebrow_font, fill=GOLD + (255,), anchor="ls")
        x += draw.textlength(ch, font=eyebrow_font) + 3
    y += gap_eyebrow + cap(title_font)
    draw.text((LEFT, y), name, font=title_font, fill=(255, 255, 255, 255), anchor="ls")
    y += gap_title
    img.alpha_composite(flag_bar(colors), (LEFT, y))
    y += bar_h + gap_bar + cap(tag_font)
    draw.text((LEFT, y), "Universities · Scholarships · Visa guidance", font=tag_font, fill=(255, 255, 255, 224), anchor="ls")
    draw.text((LEFT, H - 44), "admizzeducation.com", font=domain_font, fill=(255, 255, 255, 179), anchor="ls")

    out = OUT_DIR / f"{folder}.jpg"
    img.convert("RGB").save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{folder}.jpg  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for args in COUNTRIES:
        build(*args)
