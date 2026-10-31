# Spec Delta

## Purpose

Provide an inline client-side search experience that lets users find content across the blog by querying a JSON index rendered at build time.

## Requirements

### Requirement: JSON Search Index

The theme SHALL a JSON search index containing all non-draft pages with title, URL, plain text content, summary, date, section, and language.

#### Scenario: Index includes all non-draft pages

- **WHEN** Hugo builds the site
- **THEN** `index.json` contains an entry for every non-draft page

#### Scenario: Index excludes draft pages

- **WHEN** a page is marked as draft
- **THEN** it is excluded from `index.json`

#### Scenario: Index includes language code

- **WHEN** the site is multilingual
- **THEN** each entry in `index.json` includes a `lang` field

### Requirement: Search Form

The theme SHALL a search form in the header that users can type into.

#### Scenario: Search form is rendered in header

- **WHEN** `site.Params.search.enable` is true
- **THEN** a search form with input and submit button is rendered in the header

#### Scenario: Search form is hidden when search disabled

- **WHEN** `site.Params.search.enable` is false or unset
- **THEN** no search form is rendered

#### Scenario: Keyboard shortcut opens search

- **WHEN** the user presses Ctrl+K (or Cmd+K on macOS)
- **THEN** the search input receives focus

### Requirement: Client-Side Search Filtering

The theme SHALL the JSON index and filters results client-side as the user types.

#### Scenario: Results update as user types

- **WHEN** the user types into the search input
- **THEN** results are filtered by matching title or content and rendered below the input

#### Scenario: Results show title, excerpt, and link

- **WHEN** search results are rendered
- **THEN** each result shows the page title, a text excerpt with match highlighting, and a clickable link

#### Scenario: No results message

- **WHEN** no pages match the search query
- **THEN** a "no results" message is displayed

### Requirement: Search Accessibility

The search SHALL be fully accessible with ARIA roles and keyboard navigation.

#### Scenario: Search form has accessible label

- **WHEN** the search form is rendered
- **THEN** it has `role="search"` and an `aria-label="Search"`

#### Scenario: Results are keyboard navigable

- **WHEN** the user navigates with arrow keys after typing
- **THEN** results are highlighted and Enter opens the selected result

#### Scenario: Escape closes search

- **WHEN** the user presses Escape while search is open
- **THEN** the search input is cleared and results are hidden

## Tasks

- [x] Update `layouts/index.json` to include `lang` per page and flatten content
- [x] Create `layouts/partials/search.html` with search form markup
- [x] Create `assets/js/search.js` with index fetching, debounced filtering, and rendering
- [x] Create `assets/css/component/search.css` for search form and results styling
- [x] Update `baseof.html` to inject search JS/CSS when search is enabled
- [x] Integrate search input into header layout
- [x] Add `Ctrl+K` / `Cmd+K` keyboard shortcut handler
- [x] Add `site.Params.search.enable` config option
- [x] Add `site.Params.search.maxResults` config option
- [ ] Test search works with multilingual content
