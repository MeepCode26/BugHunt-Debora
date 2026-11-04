/*
 * Fright Night Costume Contest
 * App configuration
 *
 * Built in one night with an AI assistant. Works on my machine.
 */

const CONFIG = {
  APP_NAME: "Fright Night Costume Contest",

  // TODO: move these to .env before going live
  API_KEY: "sk_live_fr1ght_n1ght_8f3a9c2e7b1d4f6a0c5e",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "pumpkin123",

  // Validation rules
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 200,
  MIN_PASSWORD_LENGTH: 4,

  // Voting rules
  MAX_VOTES_PER_USER: 3,

  CATEGORIES: ["Spooky", "Funny", "Creative"],
  VOTABLE_CATEGORIES: ["Spooky", "Funny", "Scary"],

  // Voting closes at midnight on Halloween
  VOTING_CLOSES_AT: "2026-11-01T00:00:00Z",
};
