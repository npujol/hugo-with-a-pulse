# Spec Delta

## Purpose

Add paginated post listings across the site so users can browse chronologically through posts without loading an unbounded number of items on a single page.

## Requirements

### Requirement: Paginator Object

All list templates SHALL Hugo's `.Paginate` object instead of direct page collections.

#### Scenario: Home page paginates posts

- **WHEN** the home page renders
- **THEN** it uses `.Paginate .Site.RegularPages` limited to post/article types

#### Scenario: Section page paginates posts

- **WHEN** a section page renders
- **THEN** it paginates `.RegularPages` within that section

#### Scenario: Taxonomy page paginates posts

- **WHEN** a tag or author page renders
- **THEN** it paginates posts for that specific term

### Requirement: Pagination Navigation

A pagination nav SHALL prev/next links and page numbers.

#### Scenario: Prev/next links render

- **WHEN** there are multiple pages of results
- **THEN** prev and next links are rendered

#### Scenario: Page numbers render when needed

- **WHEN** there are more than 2 pages
- **THEN** page number links are rendered between prev/next

#### Scenario: Prev is hidden on first page

- **WHEN** the user is on page 1
- **THEN** no prev link is rendered

#### Scenario: Next is hidden on last page

- **WHEN** the user is on the last page
- **THEN** no next link is rendered

### Requirement: Post Card

Each paginated item SHALL rendered as a post card with metadata.

#### Scenario: Card shows title and link

- **WHEN** a post card is rendered
- **THEN** it displays the page title as a clickable link

#### Scenario: Card shows date

- **WHEN** a post card is rendered
- **THEN** it displays the publish date in human-readable format

#### Scenario: Card shows description or summary

- **WHEN** a post card is rendered
- **THEN** it displays `.Params.Description` or `.Summary` as a snippet

#### Scenario: Card shows reading time

- **WHEN** a post card is rendered
- **THEN** it displays the estimated reading time

### Requirement: Empty State

The theme SHALL, a friendly empty state is displayed.

#### Scenario: Empty state shows on empty section

- **WHEN** a section has no pages
- **THEN** an empty state message is displayed

#### Scenario: Empty state includes humorous message

- **WHEN** the empty state is rendered
- **THEN** it shows a humorous message about the author running out of coffee

## Tasks

- [x] Create `partials/my-hugo/pagination.html` wrapping the paginator nav
- [x] Post cards rendered inline in `partials/my-hugo/list.html`
- [x] Pagination nav links in `partials/my-hugo/pagination.html`
- [x] Update `layouts/_default/list.html` to use `.Paginate`
- [x] Update `home.html` to use `.Paginate` for recent posts
- [x] Post list and card styling already in `assets/css/theme.css`
- [x] Empty state rendered inline in `partials/my-hugo/list.html`
- [x] Update `theme.css` with pagination link styles
- [ ] Test pagination on home, sections, tags, and author pages
- [ ] Ensure pagination works with multilingual sites
