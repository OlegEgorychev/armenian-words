# Բառեր — Armenian words trainer

A small web app for learning Armenian vocabulary, inspired by LinguaLeo and Duolingo. It is a single `index.html` file with no build step and no dependencies, and it works in any browser on phone or desktop.

**Open the app:** https://olegegorychev.github.io/armenian-words/

The interface is available in **English and Russian**. Use the RU / EN button in the top-right corner to switch.

## Exercises

| Exercise | What it trains |
|---|---|
| ⚡ Brainstorm | 5 new words go through every stage in a row: intro → word-translation → translation-word → reading → builder → writing |
| 🇦🇲 Word → translation | reading and understanding |
| 🔎 Translation → word | recognising the spelling among similar words |
| 👁 Reading | picking the right transcription (pure letter reading) |
| 🧩 Builder | assembling the word letter by letter (up to 3 mistakes) |
| ✍️ Writing | typing the word on an Armenian keyboard from its translation |
| 🎧 Dictation | typing the word from its transcription (spelling) |
| Աա Letters | alphabet trainer in the style of [chev.me/armenian](https://chev.me/armenian/): letter → pick its transliteration out of 5, 15 questions |
| 🔁 Review | spaced repetition of learned words: 1-3-7-14-30-60-120 days |

A word counts as **learned** once it is answered correctly on the first try in all five core exercises. After that it moves into spaced-repetition review.

## Alphabet first: words only from learned letters

The Alphabet tab works like [chev.me/armenian](https://chev.me/armenian/) by Oleg Kalachev:

- 39 letter cards sorted **by frequency** (ա ն ր ո ե ի մ ու կ տ…) or alphabetically, with upper/lower case toggles
- tap letters to select them, then **Train selected**. If you select fewer than 15 letters, the quiz cycles through them (up to 3 rounds)
- every letter has a unique transliteration (`'` marks aspirated sounds: թ t', ց ts', չ ch', փ p', ք k'; ռ is rr)
- a letter becomes **learned** after 3 correct answers in a row, or you can mark the letters you already know with “✓ I know selected”

With **“Only words made of learned letters”** turned on (default), every word exercise except Review uses only words whose letters are all learned. The home screen shows which letters to learn next to unlock the most words, and the dictionary shows 🔒 with the missing letters.

## Features

- ~150 words in 12 topics (basics, family, food, home, city, nature, animals, body, numbers, colours, time, verbs), with Russian and English translations
- Transcription in Latin (English mode) or Cyrillic (Russian mode)
- Add your own words (topic “My words”); their transcription is generated automatically
- XP, daily goal and day streak 🔥
- On-screen Armenian keyboard with sound hints; a physical Armenian keyboard layout also works
- Hotkeys: `1–5` to pick an option, `Enter` to continue / check
- Audio playback if the system has an Armenian voice (many devices don't; the button is hidden then)
- Export / import progress as JSON (progress is stored in the browser's localStorage)

## Adding words to the built-in dictionary

In `index.html`, find the `RAW` constant and add a line under the right topic:

```
armenian | russian | english | russian transcription
```

The Latin transcription is generated from the Cyrillic one. Cyrillic conventions: `h` = հ, `х` = խ, `гх` = ղ, `ы` = ը.
