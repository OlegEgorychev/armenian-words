# Changelog

The app follows [Semantic Versioning](https://semver.org/). The current version is shown at the bottom of the home screen and is stored in `APP_VERSION` in `index.html`.

How versions move until 1.0.0 (see the roadmap in the README):

- every finished backlog task bumps **PATCH** (0.5.0 → 0.5.1 → 0.5.2 …);
- finishing the last task of a milestone bumps **MINOR** to that milestone (… → 0.6.0);
- bug fixes bump **PATCH**;
- **1.0.0** is released when the whole backlog is done.

## [0.5.1] — 2026-11-22

### Added
- **🎯 Daily lesson** — one button on the home screen that builds a 10–15 minute session for today: words due for review, the 3 letters that unlock the most words, and 3–5 new words through every exercise. The card shows what is inside and an estimated time, and turns grey with "Done today" once finished.
- Versioning: `APP_VERSION` in `index.html`, version label on the home screen, this changelog and a roadmap to 1.0.0 in the README.

## [0.5.0] — 2026-11-22

Baseline: everything built before versioning was introduced.

- Exercises: Brainstorm, Word → translation, Translation → word, Reading, Builder (tap or type, Armenian layout or by sound), Writing, Dictation, Handwriting, Letters, Review (1-3-7-14-30-60-120 days).
- Alphabet first: 39 letters sorted by frequency, print and handwritten modes; word exercises use only words made of learned letters.
- ~330 words in 15 topics with Russian and English translations, own words, transcription in Cyrillic or Latin.
- XP, daily goal, day streak, hotkeys, export / import of progress, RU / EN interface.
