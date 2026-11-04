Test Cases: Debora Velazquez

Test ID: DV01  
Title: Leaderboard displays every costume, including the first alphabetical entry  
Traces to: REQ-14  
Test type: System  
Preconditions: The live app is open, demo data has been reset, and the seeded costumes are present.  
Test data: Seeded costume names: A Very Polite Ghost, Haunted Vacuum Robot, Vampire Accountant, and Zombie Barista.

Steps:

1. Open the Fright Night app.  
2. Click Leaderboard.  
3. Compare the displayed rows with the four seeded costumes in the Gallery.

Expected result: The leaderboard displays all four costumes in alphabetical order. The first row is A Very Polite Ghost, ranked \#1.  
Actual result: The first alphabetical costume, A Very Polite Ghost, is missing. The leaderboard starts with Haunted Vacuum Robot, but its displayed rank is \#1.  
Status: Fail  
Severity: Major  
V or V: Verification

Test ID: DV06  
Title: Costume names longer than 50 characters are rejected  
Traces to: REQ-04  
Test type: Boundary Value  
Preconditions: A test user is logged in and is on the Submit Costume page.  
Test data: Three costume names: one with 49 characters, one with 50 characters, and one with 51 characters. Description: Boundary test costume. Category: Creative.

Steps:

1. Submit the 49 character costume name with the test description and category.  
2. Repeat using the 50 character costume name.  
3. Repeat using the 51 character costume name.  
4. Open the Gallery and check which costumes were saved.

Expected result: The 49 character and 50 character names are accepted. The 51character name is rejected with a validation message and does not appear in the Gallery.  
Actual result: The 51 character name is accepted and saved. The implementation checks for a length greater than 51 instead of rejecting names longer than the required maximum of 50 characters.  
Status: Fail  
Severity: Major  
V or V: Verification

Test ID: DV02  
Title: Judges can identify the leading costume at a glance in under five seconds  
Traces to: G2 and REQ-14  
Test type: Acceptance  
Preconditions: The leaderboard contains several costumes with different vote counts, and the judge has not been shown the results beforehand.  
Test data: A leaderboard containing at least four costumes, including a clear highest vote costume whose name is not necessarily first alphabetically.

Steps:

1. Open the Leaderboard page.  
2. Start a timer when the page becomes visible.  
3. Identify the costume with the highest vote count without scanning the full list.  
4. Stop the timer when the leading costume is identified.

Expected result: The design makes the leading costume immediately clear, and a judge can identify it in under five seconds.  
Actual result: The leaderboard is organized alphabetically rather than by vote count and provides no separate winner summary. A judge must scan the vote-count column to identify the leader. The written requirement REQ-14 is followed, but the feature does not adequately support stakeholder goal G2.  
Status: Fail  
Severity: Major  
V or V: Validation

Test ID: DV03  
Title: Guests see one shared contest state across browsers  
Traces to: NFR-04 and ARCHITECTURE.md (shared PostgreSQL database and Contest API Server)  
Test type: System  
Preconditions: Two separate browser profiles or devices are available, both with the app open and demo data reset.  
Test data: Browser A submits a costume named Moonlit Mummy; Browser B opens the Gallery and Leaderboard.

Steps:

1. In Browser A, register or log in as a test user.  
2. Submit Moonlit Mummy with description A mummy costume for testing shared state. and category Spooky.  
3. In Browser B, refresh the Gallery page.  
4. In Browser B, open the Leaderboard page.

Expected result: The costume submitted in Browser A appears in Browser B's Gallery and Leaderboard because all guests use one shared database and see the same contest state.  
Actual result: The costume is stored in Browser A's localStorage and does not appear in Browser B. The delivered app has no API server or shared database; each browser has its own isolated contest data.  
Status: Fail  
Severity: Critical  
V or V: Verification

Test ID: DV04  
Title: Secrets and passwords are not exposed in client-side storage or source code  
Traces to: NFR-01, NFR-03, and ARCHITECTURE.md (bcrypt and environment variables)  
Test type: Security  
Preconditions: The repository source and the app's browser developer tools are available.  
Test data: Seeded account ghost\_gary with password boo12345; source file app/config.js.

Steps:

1. Open app/config.js in the repository.  
2. Inspect the values assigned to API\_KEY and ADMIN\_PASSWORD.  
3. Log in with ghost\_gary and boo12345.  
4. Open browser Developer Tools and inspect localStorage under the application storage tab.  
5. Inspect the stored user records.

Expected result: No API key or admin password appears in the committed client side source. User passwords are hashed and are never stored in plain text in localStorage.  
Actual result: app/config.js contains a live looking API key and the admin password pumpkin123. User records in localStorage contain passwords directly, such as boo12345. Secrets are in client side source and passwords are stored in plain text.  
Status: Fail  
Severity: Critical  
V or V: Verification

Test ID: DV05  
Title: User entered HTML and script text is displayed safely  
Traces to: NFR-02 and app/index.html / app/app.js sanitizer implementation  
Test type: Security  
Preconditions: The app is open, the external sanitizer dependency is unavailable or blocked, and a test user is logged in.  
Test data: Costume name: \<img src=x onerror=alert('XSS')\>; description: \<script\>alert('XSS')\</script\>; category: Spooky.

Steps:

1. Open the Submit Costume page.  
2. Enter the test data into the Costume name and Description fields.  
3. Submit the costume.  
4. Open the Gallery and inspect the rendered costume card.  
5. Check the browser console for errors from the sanitizer script.

Expected result: The HTML and script characters are rendered as harmless text or safely removed. No alert executes, no HTML element is created from the input, and no unsafe text is inserted into the page.  
Actual result: The external spooky-sanitizer-pro script does not load, so SpookySanitizer is undefined. The fallback returns the original input, which is later assigned to innerHTML; the supplied HTML/script payload can therefore execute or create markup.  
Status: Fail  
Severity: Critical  
V or V: Verification

