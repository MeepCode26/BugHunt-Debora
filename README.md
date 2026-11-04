# Fright Night Costume Contest: The Bug Hunt

**CS250: Introduction to Software Systems | Halloween Edition**

---

## The Story

A team built this app in a single night using an AI assistant. They vibe coded the whole thing, wrote the docs, shipped it, and then vanished.

The contest goes live on Halloween. Guests will submit costumes, vote, and crown a winner.

**You are the QA team.** Your job is to find out what is broken before the guests do.

---

## Your Mission in One Sentence

Write test cases that expose bugs by comparing what the app **does** against what the requirements and diagrams say it **should** do.

**Do not fix anything.** Testers find and document. Developers fix.

---

## Timeline (60 minutes)

| Time | What happens |
|---|---|
| 0:00 to 0:07 | Briefing. Get the repo, open the app, skim the Field Guide. |
| 0:07 to 0:32 | **The Hunt.** Write test cases. Fill in your Bingo card. |
| 0:32 | **Pencils down.** Commit everything. |
| 0:32 to 0:47 | Selected teams present their scariest bug (90 seconds each). |
| 0:47 to 1:00 | Debrief and winner announcement. |

---

## Minimum Requirements (to get credit)

Your **team** must have:

- [ ] At least **6 unique failing test cases** (6 different bugs)
- [ ] At least **4 different test types** used
- [ ] At least **1 Validation** bug
- [ ] At least **1** test case that **traces to a diagram** (architecture, class, or sequence)
- [ ] A completed `submission/BINGO.md`

**Every individual** must have:

- [ ] Their own test case file with **at least 1 failing test case** that they wrote
- [ ] Every field filled in, following the sample in the Field Guide

The minimum gets you credit. The **points** win the competition. There are a lot more than 6 bugs in here.

---

## Step-by-Step Instructions

Follow these in order. Do not skip ahead.

### Step 1: Get the repo (team captain, 2 minutes)

1. On this repo's GitHub page, click the green **Use this template** button, then **Create a new repository**.
2. Name it `bughunt-team-XX`, where XX is your project group number (example: `bughunt-team-07`).
3. Go to **Settings > Collaborators** and add your teammates.
4. Teammates: accept the invite from your email or GitHub notifications.

### Step 2: Open the app (everyone, 1 minute)

Pick **one**:

- **Option A:** Open the link your instructor posts on Canvas or Discord.
- **Option B:** Click **Code > Download ZIP**, unzip it, open the `app` folder, and double-click `index.html`.

There is **nothing to install**. It runs in your browser.

Log in with a seeded account (listed in `docs/REQUIREMENTS.md`) or register your own.

If you break the app badly, click **Reset demo data** at the bottom of the page.

### Step 3: Read the docs (everyone, 3 minutes)

Open these in order:

1. `docs/TESTING_FIELD_GUIDE.md` (how to write a test case, plus a fully written sample)
2. `docs/REQUIREMENTS.md` (what the app should do)
3. `docs/ARCHITECTURE.md`, `docs/UML_CLASS.md`, and `docs/UML_SEQUENCE.md` (how the app should be built)

The diagrams render automatically on GitHub.

### Step 4: Hunt (everyone, 25 minutes)

**Recommended strategy:**

1. **First 10 minutes: black-box testing.** Use only the app and the docs. Do not open the code. Click everything. Try weird inputs.
2. **Next 15 minutes: white-box testing.** Now open the code in the `app/` folder. Compare it line by line to the requirements and diagrams.

**Split up.** Do not have four people testing the same feature. Suggested split:

| Person | Focus |
|---|---|
| 1 | Accounts and login (REQ-01, REQ-02, NFR-01) |
| 2 | Submitting and deleting costumes (REQ-03 to REQ-08) |
| 3 | Voting (REQ-09 to REQ-13) |
| 4 | Leaderboard, diagrams, and security (REQ-14, REQ-15, NFR-02 to NFR-04) |

### Step 5: Write your test cases (everyone)

1. Open `submission/test-cases/TEMPLATE.md`.
2. Make a **copy** named with your first name and last initial, like `submission/test-cases/maria-g.md`.
3. Write your test cases in **your own file**. Never edit a teammate's file.
4. Commit to **your own branch**, named with your first name (example: `maria`). In the GitHub web editor, choose **Create a new branch for this commit** the first time you commit.

Because everyone works in their own file on their own branch, nobody gets merge conflicts.

**Tip:** press the `.` key on your repo's GitHub page to open a full code editor in your browser.

### Step 6: Fill in the Bingo card (team captain)

Fill in `submission/BINGO.md` on the captain's branch. Teammates call out their Test IDs. Pick your **scariest bug** for the presentation.

### Step 7: Submit on Canvas (everyone, before you leave)

Each student submits **the GitHub link to their own test case file** on Canvas. The captain also submits the link to `BINGO.md`.

---

## Scoring

| Item | Points |
|---|---|
| Each unique failing test case | 1 |
| Each test type used (7 possible) | +2 |
| Each Validation bug | +3 |
| Each full Bingo row, column, or diagonal | +3 |
| Full Bingo card (blackout) | +5 |

Duplicate bugs only count once. The instructor has the final say.

---

## Rules

1. **Do not fix the bugs.** Find them and document them.
2. **No AI assistants during the hunt.** The point is to train your own eyes. You can use AI afterward to check your understanding.
3. **Do not look at other teams' repos.**
4. **Every test case needs every field.** A test case without an expected result is a wish, not a test.

---

## Repo Map

```
fright-night-bug-hunt/
|-- README.md                      <- you are here
|-- app/                           <- the buggy app
|   |-- index.html                 <- open this in your browser
|   |-- config.js
|   |-- store.js
|   |-- app.js
|   |-- styles.css
|-- docs/
|   |-- TESTING_FIELD_GUIDE.md     <- read first: types, anatomy, sample test case
|   |-- REQUIREMENTS.md            <- what the app should do
|   |-- ARCHITECTURE.md            <- architecture diagram
|   |-- UML_CLASS.md               <- class diagram
|   |-- UML_SEQUENCE.md            <- sequence diagram for voting
|-- submission/
    |-- BINGO.md                   <- team captain fills this in
    |-- test-cases/
        |-- TEMPLATE.md            <- copy this to yourname.md
```

---

## AI Disclosure

This app was intentionally vibe coded with Claude (Anthropic) to contain bugs. The documentation and handouts were drafted with Claude and reviewed and revised by the instructor. That is the same disclosure standard this course asks of you.
