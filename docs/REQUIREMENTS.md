# Requirements Document: Fright Night Costume Contest

**Version:** 1.0 (shipped)
**Status:** Approved by the original dev team, who are now unreachable

---

## 1. Purpose

The Fright Night Costume Contest is a web app for a Halloween party. Guests submit costumes, vote for their favorites, and the organizers announce a winner at the end of the night.

## 2. Stakeholders and Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G1 | Party organizers | Guests vote **during the party**, which runs from 7:00 PM to 11:30 PM Pacific on October 31. The winner is announced live at 11:45 PM. |
| G2 | Contest judges | Identify the leading costume **at a glance**, in under 5 seconds, by looking at the leaderboard. |
| G3 | Guests | The contest is fair. Every guest has an equal voice, and nobody can rig the results. |

## 3. Functional Requirements

### Accounts

| ID | Requirement |
|---|---|
| REQ-01 | A user can register with a unique username and a password of **at least 8 characters**. |
| REQ-02 | A user can log in with their username and password. **Only logged-in users can submit costumes or vote.** |

### Costumes

| ID | Requirement |
|---|---|
| REQ-03 | Each user may submit **at most one** costume. |
| REQ-04 | Costume names must be **between 1 and 50 characters** long. |
| REQ-05 | A costume description is **required** and must be **200 characters or less**. |
| REQ-06 | Each costume belongs to exactly one category: **Spooky, Funny, or Creative**. |
| REQ-07 | Every submitted costume appears in the Gallery and is **eligible for voting**. |
| REQ-08 | Only the owner of a costume can delete it. |

### Voting

| ID | Requirement |
|---|---|
| REQ-09 | Each user may cast **at most 3 votes** in total. |
| REQ-10 | A user **may not vote for their own costume**. |
| REQ-11 | A user **may not vote for the same costume more than once**. |
| REQ-12 | The Vote page shows how many votes the logged-in user has remaining. |
| REQ-13 | Voting closes at **midnight on October 31**. |

### Leaderboard

| ID | Requirement |
|---|---|
| REQ-14 | The leaderboard lists **all costumes in alphabetical order by name**, with each costume's vote count. |
| REQ-15 | Vote counts display as "1 vote" for exactly one vote and "N votes" for any other number. |

## 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Passwords are **never stored in plain text**. |
| NFR-02 | All user-entered text is displayed safely. Entering HTML or script in any field must **not** execute code. |
| NFR-03 | No secrets (API keys, admin passwords) appear in the source code. |
| NFR-04 | The system follows the architecture in [ARCHITECTURE.md](ARCHITECTURE.md). All guests share one database and see the same costumes and vote counts. |

## 5. Seeded Accounts (for testing)

| Username | Password |
|---|---|
| ghost_gary | boo12345 |
| hazel_hex | broomstick |
| zed_zombie | brains4ever |

You can also register your own accounts.
