/*
 * Data access layer
 * Handles persistence for users, costumes, votes, and sessions.
 */

const KEYS = {
  users: "fn_users",
  costumes: "fn_costumes",
  votes: "fn_votes",
  session: "fn_session",
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Starter data so the contest doesn't look empty on launch night
function seedData() {
  if (load(KEYS.users, null)) return;

  save(KEYS.users, [
    { username: CONFIG.ADMIN_USERNAME, password: CONFIG.ADMIN_PASSWORD },
    { username: "ghost_gary", password: "boo12345" },
    { username: "hazel_hex", password: "broomstick" },
    { username: "zed_zombie", password: "brains4ever" },
  ]);

  save(KEYS.costumes, [
    {
      id: 1,
      name: "A Very Polite Ghost",
      description: "Says sorry every time it haunts you.",
      category: "Funny",
      owner: "hazel_hex",
      votes: 5,
    },
    {
      id: 2,
      name: "Vampire Accountant",
      description: "Counts everything. Especially your blood type.",
      category: "Spooky",
      owner: "ghost_gary",
      votes: "2",
    },
    {
      id: 3,
      name: "Haunted Vacuum Robot",
      description: "Cleans your floor at 3 AM. You did not turn it on.",
      category: "Creative",
      owner: "zed_zombie",
      votes: 9,
    },
    {
      id: 4,
      name: "Zombie Barista",
      description: "Your latte, now with extra brains.",
      category: "Funny",
      owner: "hazel_hex",
      votes: 3,
    },
  ]);

  save(KEYS.votes, []);
}

function resetDemoData() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  seedData();
  location.reload();
}
