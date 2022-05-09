# How to use the uibuilder uib-brand.css style sheet

!> This version is non-normative. The live documentation for the sheet will end up in the node-red tech docs. This version is not complete.

## How it works

It uses CSS custom variables combined with HSL (Hue, Saturation, and Luminance) calculations.

## Light and dark themes

The sheet supports both light and dark themes.

The dark theme inverts some colours but may also decrease the intensity of some colours since the assumption is that dark mode is often used in a darkened environment.

The dark settings alter the saturation and lightness of most of the colours so that they are inverted, and still always of reasonable contrast.

### How to switch

There are several ways of switching between light and dark modes.

* Browser preference setting
  
  If you set a preference for light/dark in your browser, the stylesheet will recognise this and switch automatically.

* Manually set

  You can set a class attribute on the `<html>` tag: `<html lang="en" class="light">`.

  The class can be `light`, `dark` or `auto`. Auto is the same as not having a class.

  This will override the browser preference.

* Dynamic switch

  This is a variation on the manual set. You can easily and dynamically switch the class based on user input.
  See the example below.

## Base variables

* `--brand-hue` - This is the base colour

  All of the shades for the theme are based off this colour.

* `--accent-offset` - Two accent colours are automatically generated.

  By default, this is set to 30°. That results in accent colours 150° (180-30) and 210° (180+30) which is known as "Split Complementry" in colour theory.

  Set it to 60° to have the accent colours set to 240° (180+60) and 120° (180-60) "Triadic".

  Set to 150° to have the accent colours set to 340° (180+150) and 30° (180-150) "Complementary".

## Main variables

These are all `hsl()` entries that can be used directly wherever a colour is required. 
e.g. `color: var(--text1);`

* `--brand` - The primary colour, most other hue's are based off this

* `--text1`, `--text2`, `--text3`, `--text4` - The main text variations.

* `--surface1`, `--surface2`, `--surface3`, `--surface4` - The main background variations.

* `--complementary`, `--complementary-fg`, `--complementary-bg` - Complementary (inverted) colour to the brand hue (180° from it on the colour wheel).

* `--primary`, `--primary-fg`, `--primary-bg` - Primary accent colour. 
  
  The main colour is the same as the `-bg` colour, the `-fg` is the inverse (+180°) so that you can ensure that using the accent as a background, you can have a foreground/text colour that is always visible.

  Calculated as `--brand` +180 **+**`--accent-offset`.

* `--secondary`, `--secondary-fg`, `--secondary-bg` - The secondary accent colour

  The main colour is the same as the `-bg` colour, the `-fg` is the inverse (+180°) so that you can ensure that using the accent as a background, you can have a foreground/text colour that is always visible.

  Calculated as `--brand` +180 **-**`--accent-offset`.

* `--info`, `--success`, `warning`, `--failure` - Key highlight colours.

  These are the only colours that are not inverted for dark mode. Instead, their saturation is slightly reduced so that they are not uncomfortable when used in a darkened room.

  Note that `--error` is a synonym of `--failure` for convenience.

  In order, the default hue's are: 203 (blue), 120 (green), 40 (amber), 2 (red).

## Shadows

Two shadow definitions are provided. Note that the defining variables are raw shadow specifications and not a complete simple `hsl` definitions. Both are derived from the brand hue to maintain consistency.

Shadows for dark modes are notoriously difficult to work out and you may choose to slightly lighten the background colour in dark mode to enhance the shadow effect.

* `--shadow1`

  Has a large halo (around 100px), mainly below.


* `--shadow2`

  Has a small halo (around 10px), slightly to the below-right.