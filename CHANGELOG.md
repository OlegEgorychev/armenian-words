# Changelog

The app follows [Semantic Versioning](https://semver.org/). The current version is shown at the bottom of the home screen and is stored in `APP_VERSION` in `index.html`.

How versions move until 1.0.0 (see the roadmap in the README):

- every finished backlog task bumps **PATCH** (0.5.0 → 0.5.1 → 0.5.2 …);
- finishing the last task of a milestone bumps **MINOR** to that milestone (… → 0.6.0);
- bug fixes bump **PATCH**;
- **1.0.0** is released when the whole backlog is done.

## [0.5.3] — 2026-11-22

### Added
- **2000-word frequency dictionary.** Words now load from `words.json` (2000 most frequent words, ranked by the UD Armenian-ArmTDP corpus + OpenSubtitles). It is merged with the old built-in list: shared words take the translation and transcription from `words.json` and keep their topic; the 68 old-only words (lavash, khorovats, barev…) stay; the 1736 new words go to the new topic "Other words". 2068 words in total.
- **New words in frequency order** (the most common words first). Settings → "Order of new words": By frequency (default) / By topic.
- **Filters: level and part of speech** — on the home screen (they apply to all exercises) and in the dictionary. Level: Top 500 / 1000 / 1500 / 2000 / All. Part of speech: nouns, verbs, adjectives, adverbs, pronouns, function words.
- Dictionary: part of speech and rank on every word ("verb · #12"), sort by frequency / A–Z / topic, a "🔓 Available" filter (words made of learned letters), the list shows 100 words at a time with "Show more".
- Home screen: "Frequency dictionary" card with progress for Top 500 / 1000 / 1500 / 2000.

### Changed
- Wrong answer options now prefer the same part of speech (a verb gets verbs as distractors).
- The "Learn next" letters are counted within the current filters.
- Faster on phones: the lists of available words are computed once and reused.
- If `words.json` cannot be loaded (for example, `index.html` opened directly from disk), the app shows how to start a local server.

## [0.5.2] — 2026-11-22

### Added
- **Letters quiz setup screen.** The 🔤 Letters card on the home screen no longer starts the quiz right away: it first shows all 39 letters (by frequency, learned ones marked ✓) where you tap to add or remove letters, plus "+ next 5" and "Select none". The Start button shows how many letters are in the quiz.
- **"Learn next" letters are clickable.** On the home screen, tapping a suggested letter adds it to the quiz selection (tap again to remove); a "Train selected" button opens the setup screen.

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
