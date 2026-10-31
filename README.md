# hugo-with-a-pulse

A personal Hugo theme with a dark look, a lively cursor, and a sense of humor.

Escéptica, skeptical, skeptisch o Skeksis ¿?

## Installation

```bash
hugo new site my-site
cd my-site
git submodule add https://github.com/npujol/hugo-with-a-pulse themes/hugo-with-a-pulse
```

In `hugo.toml`:

```toml
theme = "hugo-with-a-pulse"
```

> Requires Hugo ≥ 0.156 (recent APIs like `site.Language.Direction` and `hugo.Sites`).

## Demo

The `exampleSite/` directory is built and deployed to GitHub Pages on every push
to `main` — see `.github/workflows/gh-pages.yml`. A working config for every
feature below lives in `exampleSite/hugo.toml`.

## Configuration

### Basic

```toml
[params]
author = "Your Name"        # shown on the home portrait block
role = "Software engineer · Somewhere"  # subtitle under your name
portrait = "/medias/me.jpg" # portrait image
copyright = "© Your Name"
```

Menus:

```toml
[[menus.main]]
name = "Home"
pageRef = "/"
weight = 10
```

### Search

Client-side search over a build-time JSON index. Requires the JSON output on
the home page:

```toml
[outputs]
home = ["HTML", "JSON"]

[params.search]
enable = true
maxResults = 8
```

- Inline form in the header, results filter as you type with highlighted
  excerpts
- `Ctrl+K` / `Cmd+K` focuses the input; arrow keys navigate, Enter opens,
  Escape clears

### Pagination

Post listings (home and sections) are paginated with a prev/next and
page-number nav. Control page size with:

```toml
[pagination]
pagerSize = 10
```

### Multilingual

The theme ships English, Spanish, and German translations and is RTL-ready.
Enable per Hugo's multilingual setup:

```toml
[languages.en]
locale = "en-US"
label = "English"
weight = 1

[languages.es]
locale = "es-ES"
label = "Español"
weight = 2
```

With more than one language you get a header language switcher (flags, codes,
names) and in-page translation links on translated pages. All strings are
i18n keys — add more languages by dropping a `i18n/<lang>.toml` file.

### Carousel

Slides are pages of `type: slide` with a `cover` image (sections with a cover
also work). Create one with the archetype:

```bash
hugo new --kind slide content/slide/my-trip.md
```

Front matter:

```markdown
---
title: "My trip"
type: slide
cover: "/medias/trip.jpg"
description: "Where I went and what I saw."
---
```

Options:

```toml
[params.home]
disableSlide = true                 # remove the carousel entirely
featuredListing = ["tags", "travel"] # taxonomy/section links under the carousel
```

The carousel uses CSS scroll-snap with keyboard-accessible navigation dots and
respects `prefers-reduced-motion` (slides stack vertically, no animation).

## License

MIT — see [LICENSE](LICENSE).
