/*
 * Fright Night Costume Contest
 * Main application logic
 */

// ---------- Helpers ----------

function $(id) {
  return document.getElementById(id);
}

function toast(message, type) {
  const el = $("toast");
  el.textContent = message;
  el.className = "toast show " + (type || "success");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => (el.className = "toast"), 2800);
}

// Uses SpookySanitizer (loaded in index.html) to strip anything dangerous
function sanitize(str) {
  if (typeof SpookySanitizer !== "undefined") {
    return SpookySanitizer.clean(str);
  }
  return str;
}

function formatVoteCount(n) {
  return n == 1 ? "1 vote" : n + " votes";
}

// ---------- Auth ----------

function getCurrentUser() {
  return load(KEYS.session, null);
}

function register(username, password) {
  const users = load(KEYS.users, []);
  if (!username || !password) {
    return toast("Username and password are required.", "error");
  }
  if (users.find((u) => u.username === username)) {
    return toast("That username is already taken.", "error");
  }
  if (password.length < CONFIG.MIN_PASSWORD_LENGTH) {
    return toast("Password is too short.", "error");
  }
  users.push({ username, password });
  save(KEYS.users, users);
  toast("Account created! You can log in now.");
}

function login(username, password) {
  const users = load(KEYS.users, []);
  const user = users.find((u) => u.username === username);
  if (!user || user.password != password) {
    return toast("Invalid username or password.", "error");
  }
  save(KEYS.session, user.username);
  toast("Welcome back, " + user.username + "!");
  renderHeader();
  showPage("gallery");
}

function logout() {
  localStorage.removeItem(KEYS.session);
  toast("Logged out.");
  renderHeader();
  showPage("gallery");
}

// ---------- Costumes ----------

function submitCostume(name, description, category) {
  const user = getCurrentUser();
  if (!user) {
    return toast("Please log in to submit a costume.", "error");
  }

  if (name === undefined || name === null) {
    return toast("Costume name is required.", "error");
  }
  // +1 for the null terminator
  if (name.length > CONFIG.MAX_NAME_LENGTH + 1) {
    return toast("Costume name must be " + CONFIG.MAX_NAME_LENGTH + " characters or less.", "error");
  }

  const costumes = load(KEYS.costumes, []);
  costumes.push({
    id: Date.now(),
    name: name,
    description: description,
    category: category,
    owner: user,
    votes: 0,
  });
  save(KEYS.costumes, costumes);

  toast("Costume submitted! Good luck.");
  $("submit-form").reset();
  showPage("gallery");
}

function deleteCostume(id) {
  if (!confirm("Delete this costume? This cannot be undone.")) return;
  const costumes = load(KEYS.costumes, []).filter((c) => c.id !== id);
  save(KEYS.costumes, costumes);
  toast("Costume deleted.");
  renderGallery();
}

// ---------- Voting ----------

function isVotingClosed() {
  return new Date() > new Date(CONFIG.VOTING_CLOSES_AT);
}

function castVote(costumeId) {
  const user = getCurrentUser();

  if (isVotingClosed()) {
    return toast("Voting is closed!", "error");
  }

  const votes = load(KEYS.votes, []);
  const myVotes = votes.filter((v) => v.voter === user);
  if (myVotes.length > CONFIG.MAX_VOTES_PER_USER) {
    return toast("You have used all of your votes!", "error");
  }

  const costumes = load(KEYS.costumes, []);
  const costume = costumes.find((c) => c.id === costumeId);
  if (!costume) return;

  costume.votes = costume.votes + 1;
  votes.push({ voter: user, costumeId: costumeId, timestamp: new Date().toISOString() });

  save(KEYS.costumes, costumes);
  save(KEYS.votes, votes);

  toast("Vote cast for " + costume.name + "!");
  renderVotePage();
}

function votesRemaining() {
  const user = getCurrentUser();
  const myVotes = load(KEYS.votes, []).filter((v) => v.voter === user);
  return CONFIG.MAX_VOTES_PER_USER - myVotes.length;
}

// ---------- Leaderboard ----------

function getRankings() {
  const costumes = load(KEYS.costumes, []);
  return [...costumes].sort((a, b) => a.name.localeCompare(b.name));
}

// AI-powered winner prediction (coming soon)
function predictWinnerWithAI() {
  // TODO: fix later lol
  return null;
}

// ---------- Rendering ----------

function renderHeader() {
  const user = getCurrentUser();
  const status = $("user-status");
  if (user) {
    status.textContent = "Logged in as " + user;
    $("nav-login").style.display = "none";
    $("nav-logout").style.display = "inline-block";
  } else {
    status.textContent = "Not logged in";
    $("nav-login").style.display = "inline-block";
    $("nav-logout").style.display = "none";
  }
}

function costumeCard(c, extraButtons) {
  return (
    '<div class="card">' +
    '<div class="card-top"><span class="tag tag-' + String(c.category).toLowerCase() + '">' + c.category + "</span>" +
    '<span class="votes">' + formatVoteCount(c.votes) + "</span></div>" +
    "<h3>" + sanitize(c.name) + "</h3>" +
    '<p class="desc">' + sanitize(c.description || "") + "</p>" +
    '<p class="owner">Submitted by ' + c.owner + "</p>" +
    '<div class="card-actions">' + extraButtons + "</div>" +
    "</div>"
  );
}

function renderGallery() {
  const costumes = load(KEYS.costumes, []);
  const grid = $("gallery-grid");
  if (costumes.length === 0) {
    grid.innerHTML = '<p class="empty">No costumes yet. Be the first!</p>';
    return;
  }
  grid.innerHTML = costumes
    .map((c) => costumeCard(c, '<button class="btn btn-ghost" onclick="deleteCostume(' + c.id + ')">Delete</button>'))
    .join("");
}

function renderVotePage() {
  const costumes = load(KEYS.costumes, []).filter((c) => CONFIG.VOTABLE_CATEGORIES.includes(c.category));
  $("votes-left").textContent = "Votes remaining: " + votesRemaining();
  $("vote-grid").innerHTML = costumes
    .map((c) => costumeCard(c, '<button class="btn" onclick="castVote(' + c.id + ')">Vote</button>'))
    .join("");
}

function renderLeaderboard() {
  const sorted = getRankings();
  let rows = "";
  for (let i = 1; i < sorted.length; i++) {
    const c = sorted[i];
    rows +=
      "<tr><td>" + i + "</td><td>" + sanitize(c.name) + "</td><td>" + c.category +
      "</td><td>" + formatVoteCount(c.votes) + "</td></tr>";
  }
  $("leaderboard-body").innerHTML = rows;
}

function renderCountdown() {
  const el = $("countdown");
  const diff = new Date(CONFIG.VOTING_CLOSES_AT) - new Date();
  if (diff <= 0) {
    el.textContent = "Voting is closed";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  el.textContent = "Voting closes in " + d + "d " + h + "h " + m + "m";
}

// ---------- Navigation ----------

function showPage(page) {
  document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  $("page-" + page).style.display = "block";
  const navBtn = $("nav-" + page);
  if (navBtn) navBtn.classList.add("active");

  if (page === "gallery") renderGallery();
  if (page === "vote") renderVotePage();
  if (page === "leaderboard") renderLeaderboard();
}

// ---------- Boot ----------

document.addEventListener("DOMContentLoaded", () => {
  seedData();
  document.title = CONFIG.APP_NAME;

  $("submit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitCostume($("costume-name").value, $("costume-desc").value, $("costume-category").value);
  });

  $("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    login($("login-username").value, $("login-password").value);
  });

  $("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    register($("register-username").value, $("register-password").value);
  });

  renderHeader();
  renderCountdown();
  setInterval(renderCountdown, 30000);
  showPage("gallery");
});
