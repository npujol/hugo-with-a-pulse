# Spec Delta

## Purpose

Add a cover-image-driven carousel to the home page that showcases featured posts and sections with visual appeal, letting users jump into highlighted content.

## Requirements

### Requirement: Slide Content

Slides SHALL be rendered from pages of type `slide` or sections with a cover image.

#### Scenario: Slide type pages render as carousel items

- **WHEN** a page has `type: slide` in its frontmatter
- **THEN** it is collected and rendered as a carousel slide

#### Scenario: Section slides render from section pages

- **WHEN** a section page has a cover image
- **THEN** it is collected and rendered as a carousel slide

#### Scenario: Slide requires a cover image

- **WHEN** a slide has no cover image
- **THEN** it is excluded from the carousel

### Requirement: Carousel Markup

The theme SHALL a horizontal scroll container with CSS scroll-snap.

#### Scenario: Carousel container uses scroll-snap

- **WHEN** the carousel is rendered
- **THEN** the container has `scroll-snap-type: x mandatory`

#### Scenario: Each slide snaps into view

- **WHEN** the user scrolls horizontally
- **THEN** each slide snaps to the start of the viewport

#### Scenario: Slide shows cover image

- **WHEN** a slide is rendered
- **THEN** it displays the cover image with lazy loading

#### Scenario: Slide shows title and description

- **WHEN** a slide is rendered
- **THEN** it displays the page title and description overlaid on or beside the image

### Requirement: Carousel Navigation

Navigation SHALL jumping to specific slides.

#### Scenario: Navigation dots are rendered

- **WHEN** the carousel has more than one slide
- **THEN** navigation dots are rendered at the bottom-right of the carousel

#### Scenario: Clicking a dot scrolls to the slide

- **WHEN** the user clicks a navigation dot
- **THEN** the carousel scrolls to the corresponding slide

#### Scenario: Active slide dot is highlighted

- **WHEN** a slide is in view
- **THEN** its corresponding navigation dot is visually highlighted

### Requirement: Carousel Configuration

The carousel SHALL be toggleable and configurable via site params.

#### Scenario: Carousel can be disabled

- **WHEN** `site.Params.home.disableSlide` is true
- **THEN** no carousel is rendered on the home page

#### Scenario: Featured listing can override taxonomy

- **WHEN** `site.Params.home.featuredListing` is set
- **THEN** only the specified taxonomies are shown in the featured listing below the carousel

### Requirement: Accessibility

The carousel SHALL accessible via keyboard and screen readers.

#### Scenario: Carousel has accessible role

- **WHEN** the carousel is rendered
- **THEN** the container has `role="region"` and `aria-label="Featured content"`

#### Scenario: Navigation dots are keyboard accessible

- **WHEN** the user tabs through the carousel
- **THEN** navigation dots receive focus and can be activated with Enter/Space

#### Scenario: Prefers-reduced-motion is respected

- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** carousel animations are disabled and slides are shown vertically

## Tasks

- [x] Create `partials/carousel.html` for carousel markup
- [x] Create `assets/css/component/carousel.css` with scroll-snap carousel styles
- [x] Create `assets/js/carousel.js` for nav clicks, active slide tracking, and keyboard navigation
- [x] Update `home.html` to render carousel when slides exist
- [x] Add `site.Params.home.disableSlide` config option
- [x] Add `site.Params.home.featuredListing` config option
- [x] Create `archetypes/slide.md` for slide content type
- [ ] Test carousel with cover images and dark/light variants
- [ ] Test carousel accessibility with keyboard and screen readers
- [ ] Test responsive behavior on mobile and tablet
