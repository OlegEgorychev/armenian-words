# Changelog

The app follows [Semantic Versioning](https://semver.org/). The current version is shown at the bottom of the home screen and is stored in `APP_VERSION` in `index.html`.

How versions move until 1.0.0 (see the roadmap in the README):

- every finished backlog task bumps **PATCH** (0.5.0 → 0.5.1 → 0.5.2 …);
- finishing the last task of a milestone bumps **MINOR** to that milestone (… → 0.6.0);
- bug fixes bump **PATCH**;
- **1.0.0** is released when the whole backlog is done.

## [0.5.7] — 2026-11-22

### Fixed
- **Learned letters now sync.** They used to travel as one list, so when both devices already had progress from before sync, one device's list could win and the letters learned on the other did not show up. Now every learned letter (printed and handwritten) is synced on its own, like words: letters learned on different devices are combined, and a letter you un-learn is removed everywhere.

## [0.5.6] — 2026-11-22

### Added
- **Cloud sync with Google sign-in** (a 0.8.0 roadmap task, done early). New "👤 Account & sync" section (the 👤 button at the top opens it): sign in with Google and the same progress is on your phone, computer and any browser. Signing in is optional — without it everything works as before, offline, in localStorage.
- Profile: Google photo, name and email, sync status ("Synced · 15:32", "Offline — will sync later"), "Sync now" and "Sign out". Signing out keeps the progress on the device.
- Progress is stored in Firebase (project `barev-c3b95`, free Spark plan) as one Firestore document `users/{uid}`. Access rules are in `firestore.rules`: each user can read and write only their own document.
- **Safe merging.** Every change is stamped with its time (per word, per letter, per day of XP, per own word, per setting). When two devices meet, the newer change wins piece by piece, XP of the same day takes the larger number, and deletions (reset word, reset all, delete own word) spread too. So practising offline on two devices loses nothing.
- Changes are sent a few seconds after the last answer, when you leave the app, and when the internet comes back; changes from other devices are fetched when you open or return to the app. Nothing is swapped in the middle of a lesson.
- The Firebase code is downloaded only after you have signed in once, so the app stays light for everyone else.

## [0.5.5] — 2026-11-22

### Added
- **PWA: install and offline.** `manifest.json` (name, icons 192/512, `display: standalone`, theme colour) and `service-worker.js`. Open the app once, and after that it works without internet; on a phone it can be added to the home screen as an app.
- The service worker downloads files from the network first (so you always get the newest version and words.json) and uses the saved copy when offline. The cache name includes the app version, so every new `APP_VERSION` refreshes the cache and removes the old one.
- App icons and a favicon.

## [0.5.4] — 2026-11-22

### Added
- **Enter with no answer = "I don't know"** in every word exercise and in the Letters quiz: the correct answer is shown, it counts as a mistake, and the word comes back later in the session. `Shift+Enter` still works everywhere. In Writing and Dictation, Enter still checks the answer when something is typed.
- An "I don't know" button under the choice exercises and the Builder (handy on a phone, where there is no Enter key).

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
