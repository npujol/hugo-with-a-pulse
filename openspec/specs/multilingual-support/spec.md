# Spec Delta

## Purpose

Enable full multilingual support for the tema Hugo theme so the author can publish content in Spanish, English, and German with an in-theme language switcher.

## Requirements

### Requirement: i18n Translation Files

The theme SHALL ship with `i18n/en.toml` as the base translation file containing all string keys used across templates. Spanish (`i18n/es.toml`) and German (`i18n/de.toml`) translations must also be provided.

#### Scenario: Template uses i18n key

- **WHEN** a template calls `i18n "posts"`
- **THEN** the rendered output is the translated string for the current language

#### Scenario: Missing translation falls back to English

- **WHEN** a key exists in `i18n/en.toml` but not in `i18n/es.toml`
- **THEN** the English value is rendered as a fallback

### Requirement: Language Detection

The theme MUST Hugo language configuration to set the HTML lang attribute and text direction.

#### Scenario: HTML lang is set correctly

- **WHEN** the page is rendered in Spanish
- **THEN** `<html lang="es">` is set in the document

#### Scenario: RTL direction is supported

- **WHEN** a language has `LanguageDirection: rtl` configured
- **THEN** `<html dir="rtl">` is set in the document

### Requirement: Language Switcher

The theme SHALL a language switcher in the header when multilingual mode is active.

#### Scenario: Switcher is visible with multiple languages

- **WHEN** `hugo.IsMultilingual` is true
- **THEN** a language switcher dropdown is rendered in the header

#### Scenario: Switcher is hidden for single language

- **WHEN** only one language is configured
- **THEN** no language switcher is rendered

#### Scenario: Switcher lists all available translations

- **WHEN** the page has two or more translations
- **THEN** each translation is listed with its flag emoji, language code, and language name

### Requirement: Translation Links on Pages

Each page SHALL links to its translations in the footer or sidebar.

#### Scenario: Translation links appear on translated pages

- **WHEN** a page has `.Translations` available
- **THEN** each translation is linked with its title and language

#### Scenario: Section shows combined content when no translation

- **WHEN** a section has no translation for the current language
- **THEN** the default language version of the section is shown

## Tasks

- [x] Create `i18n/en.toml` with all i18n keys used by the theme
- [x] Create `i18n/es.toml` with Spanish translations
- [x] Create `i18n/de.toml` with German translations
- [x] Update `layouts/_default/baseof.html` to use `site.Language.Locale` and `site.Language.Direction (renamed API in recent Hugo)`
- [x] Create `partials/i18n.html` with language switcher for header
- [x] Create `partials/l10n.html` for in-page translation links
- [x] Create `partials/i18n/flag.html` for flag emoji generation
- [x] Update all template strings to use `i18n` function
- [x] Update `home.html` to show language-specific recent posts
- [x] Update `list.html` to filter by language
- [x] Update `index.json` to include `lang` per page
