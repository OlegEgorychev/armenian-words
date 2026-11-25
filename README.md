# Բառեր — Armenian words trainer

A small web app for learning Armenian vocabulary, inspired by LinguaLeo and Duolingo. It is one `index.html` file plus the dictionary `words.json`, with no build step and no dependencies, and it works in any browser on phone or desktop. It can be installed on the home screen and works offline.

**Open the app:** https://olegegorychev.github.io/armenian-words/

The interface is available in **English and Russian**. Use the RU / EN button in the top-right corner to switch.

## Exercises

| Exercise | What it trains |
|---|---|
| 🎯 Daily lesson | one tap for today: due reviews + the 3 letters that unlock the most words + 3–5 new words (≈10–15 min) |
| ⚡ Brainstorm | 5 new words go through every stage in a row: intro → word-translation → translation-word → reading → builder → writing |
| 🇦🇲 Word → translation | reading and understanding |
| 🔎 Translation → word | recognising the spelling among similar words |
| 👁 Reading | picking the right transcription (pure letter reading) |
| 🧩 Builder | assembling the word letter by letter (the first wrong letter is forgiven, the second one fails the attempt); tap tiles or type — Armenian layout, or by sound in Latin/Cyrillic (`t` → տ/թ; the matching tile is picked) |
| ✍️ Writing | typing the word on an Armenian keyboard from its translation |
| 🎧 Dictation | typing the word from its transcription (spelling) |
| 🖊️ Handwriting | draw letters with finger or mouse on a lined pad: trace the model first, then write from memory and compare with the model (self-graded). Print or handwritten script |
| Աա Letters | first pick the letters (tap to add / remove, “+ next 5”), then: alphabet trainer in the style of [chev.me/armenian](https://chev.me/armenian/): letter → pick its transliteration out of 5, 15 questions |
| 🔁 Review | spaced repetition of learned words: 1-3-7-14-30-60-120 days |
| 💪 Tricky words | only the words marked *Struggling*: up to 10, two different exercises each |

A word counts as **learned** once it is answered correctly on the first try in all five core exercises. After that it moves into spaced-repetition review.

## Word statuses and the mistake limit

Every word has a status, shown as a coloured badge in the dictionary (with a status filter) and on the session summary:

| Status (EN / RU) | When |
|---|---|
| New / Новое | never shown |
| Learning / Учу | shown, not all five exercises passed yet |
| **Struggling / Не выучено** | set aside by the mistake limit (see below) |
| Due / Пора повторить | learned and its review date has come |
| Learned / Выучено | learned, review date not yet |
| Mastered / Закреплено | review level 5+ (interval 30 days or more) |

**Mistake limit in a session.** A word can no longer drag a session on forever:

- a missed task comes back **3 tasks later**, not right away (so it tests memory, not the answer you just saw);
- **2 mistakes on the same task** → that task is removed;
- **3 mistakes on one word** in a session → all its remaining tasks are removed and the word becomes *Struggling* ("Let's set this word aside for now"). If it was the word's last task, it is set aside too;
- exercises the word already passed are kept: next time it continues from where it stopped;
- a word that fails in Review goes back to review level 1 and is due tomorrow;
- a correct answer on a retry gives half XP (rounded down);
- the progress bar shrinks when tasks are removed.

**How Struggling words come back:** up to 2 of them join each Brainstorm / daily lesson, they make up at most 30% of a single-exercise training, and the 💪 *Tricky words* training (also the "Struggling: N → Practice" line on the home screen) practises only them. **Two mistake-free sessions in a row** (or passing all five exercises) clear the status. The summary screen lists the words set aside; tap one to look at it calmly, without a test.

All balance numbers (`MISS_PER_TASK`, `MISS_PER_WORD`, `RETRY_GAP`, `BUILD_SLIPS`, `HARD_EXIT`, `HARD_IN_NEW`, `HARD_SHARE`, `HARD_MAX`, `retryXP`) are in one block at the top of the script in `index.html`. New fields per word (`seen`, `hard`, `hardAt`, `okSes`) are added on first use, so old progress and old exports keep working. Letter exercises are not affected.

## Alphabet first: words only from learned letters

The Alphabet tab works like [chev.me/armenian](https://chev.me/armenian/) by Oleg Kalachev:

- 39 letter cards sorted **by frequency** (ա ն ր ո ե ի մ ու կ տ…) or alphabetically, with upper/lower case toggles
- tap letters to select them, then **Train selected**. If you select fewer than 15 letters, the quiz cycles through them (up to 3 rounds)
- every letter has a unique transliteration (`'` marks aspirated sounds: թ t', ց ts', չ ch', փ p', ք k'; ռ is rr)
- a letter becomes **learned** after 3 correct answers in a row, or you can mark the letters you already know with “✓ I know selected”

**Print / Handwritten.** The Alphabet tab has two modes. *Handwritten* shows the school cursive forms (the way Armenian is written by hand), with its own quiz and its own progress. Both modes have a **✍️ Handwriting** button that opens the drawing exercise for the selected letters (or the next 5 unlearned ones).

With **“Only words made of learned letters”** turned on (default), every word exercise except Review uses only words whose letters are all learned. The home screen shows which letters to learn next to unlock the most words, and the dictionary shows 🔒 with the missing letters.

## Dictionary: 2000 most frequent words

- **2068 words** with Russian and English translations: the 2000 most frequent words of Eastern Armenian (`words.json`) plus 68 everyday words from the original list (greetings, food, animals: բարև, լավաշ, խորոված…)
- every word has a **frequency rank** (1 = most frequent), a **part of speech** and a **level**: Top 500 / 1000 / 1500 / 2000
- **new words come in frequency order** — the most useful words first. In Settings you can switch to "By topic"
- **filters**: level and part of speech (nouns, verbs, adjectives, adverbs, pronouns, function words). On the home screen they apply to all exercises; the dictionary has its own filters and sorting (by frequency, A–Z, by topic). They combine with "Only words made of learned letters"
- the home screen shows progress per level: "Top 500: 37 / 500 learned"
- 15 topics from the original list are kept (basics, common words, family, food, home, city, nature, animals, body, numbers, colours & qualities, time, verbs, study & work, misc); new words are in the topic "Other words"
- words appear early: with the 8 most frequent letters learned (ա ն ր ո ե ի մ ու) about 28 words are available, with 10 letters about 90, with 15 letters about 390, with 20 letters about 720

**Where the frequency comes from.** Rank = 0.5 × lemma frequency in the [UD Armenian-ArmTDP](https://universaldependencies.org/treebanks/hy_armtdp/) corpus + 0.5 × frequency in OpenSubtitles ([hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords)), both per million words, followed by manual cleanup (proper nouns, junk). The corpus is mostly news and literature, so the list includes some bookish words. Transcription is letter-by-letter.

## Features

- Transcription in Latin (English mode) or Cyrillic (Russian mode)
- Add your own words (topic “My words”); their transcription is generated automatically
- XP, daily goal and day streak 🔥
- On-screen Armenian keyboard with sound hints; a physical Armenian keyboard layout also works
- Hotkeys: `1–5` pick an option · `Enter` continue / check · `Enter` with no answer = “I don't know” (also `Shift+Enter`) · `Tab` show transcription (translation in Dictation) · `→` next letter hint · `Backspace` delete
- Audio playback if the system has an Armenian voice (many devices don't; the button is hidden then)
- Export / import progress as JSON (progress is stored in the browser's localStorage)
- **Install and offline (PWA):** on a phone, open the app and choose “Add to Home Screen” (Safari: Share → Add to Home Screen; Chrome: ⋮ → Install app). After the first visit it works without internet

## Adding words

Add an entry to the `words` array in `words.json`:

```json
{ "id": "ծիծաղ", "hy": "ծիծաղ", "ru": "смех", "en": "laughter", "pos": "noun",
  "translit": { "ru": "цицагх", "en": "tsitsagh" }, "rank": 2001, "posRank": 911, "level": 4 }
```

- `id` must be the Armenian word itself (progress is saved under it), all lowercase
- `pos`: `noun, verb, adj, adv, pron, num, adp, conj, part, intj`
- `rank`: overall frequency rank; `posRank`: rank within the part of speech; `level`: 1 = ranks 1–500, 2 = 501–1000, 3 = 1001–1500, 4 = 1501–2000
- Cyrillic transcription conventions: `h` = հ, `х` = խ, `гх` = ղ, `ы` = ը
- Hand-picked words that are not in the frequency list get `"extra": true` and no `rank` / `posRank` / `level` (the "Top N" filter skips them)

A word that should have a topic can also go into the `RAW` constant in `index.html` (`armenian | russian | english | russian transcription` under a `# Topic | Topic` line). If the same word is in both, the translation comes from `words.json` and the topic from `RAW`. After changing files, bump `APP_VERSION` in `index.html` so installed apps refresh their offline copy.

## Running locally

The app loads `words.json` with `fetch()`, which browsers block for files opened straight from disk (`file://`). Start a small local server in the project folder and open http://localhost:8000:

```
python3 -m http.server
```

## Cloud sync

Signing in is optional. Press 👤 at the top → "Sign in with Google", and progress is kept in Firebase (Firestore document `users/{uid}`) and merged across devices: every change carries a timestamp and the newer one wins, piece by piece. Access rules live in [`firestore.rules`](firestore.rules) and are pasted into Firebase console → Firestore → Rules. The Firebase config in `index.html` is public by design; the rules and the authorized domain (`olegegorychev.github.io`) are what protect the data.

## Version and roadmap

Current version: **0.5.9** — see [CHANGELOG.md](CHANGELOG.md). Every finished backlog task bumps PATCH, finishing a milestone bumps MINOR, and **1.0.0** ships when the whole backlog is done.

| Version | Milestone | Tasks |
|---|---|---|
| 0.5.0 | Baseline | everything built before versioning |
| **0.6.0** | Every day | ✅ Daily lesson · ✅ dictionary moved to `words.json` (2000 words) · ✅ Enter without an answer = "I don't know" · ✅ PWA (install + offline) · emoji for words |
| **0.7.0** | Memory and sound | smart spaced repetition (FSRS/SM-2) · recorded mp3 audio · listening exercise · stats · ✅ word statuses and "hard words" |
| **0.8.0** | Everywhere | ✅ cloud sync (Google sign-in) · reminders (push) · own words: edit + RU/EN · CSV/Anki import · topics for life in Yerevan |
| **0.9.0** | Living language | phrases and short sentences · "Expressions" exercise · grammar mini-lessons · reading real signs |
| **1.0.0** | Release | AI conversation practice · citizenship exam track · Android app in Google Play · promotion in Armenian communities |

## Credits

- Alphabet trainer idea: [chev.me/armenian](https://chev.me/armenian/) by Oleg Kalachev
- Handwriting font **Arti** by Khajag Apelian for the Hamazkayin Armenian Educational and Cultural Association (2016), free for personal and commercial use, embedded in `index.html` with author credit
