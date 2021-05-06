import { config } from "https://deno.land/x/dotenv/mod.ts";

const { GITHUB_API_TOKEN } = config();
const GITHUB_BASE_URL = "https://api.github.com";
const MAX_USERS = 100;

/*
 * Parse following usernames
 */
function parseFollowingNames(users = []) {
  return users.map((user) => user.login);
}

/*
 * Fetch api
 */
async function api(url, method = "GET") {
  try {
    const response = await fetch(`${GITHUB_BASE_URL}/${url}`, {
      method,
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });
    const status = response.status;
    const data = status !== 204 ? await response.json() : {};

    return { data, status, error: null };
  } catch (error) {
    console.log("Error", error);

    return {
      data: null,
      status: null,
      error: error,
    };
  }
}

/*
 * Fetch followed users count
 */
async function fetchFollowingCount() {
  const { data, error } = await api("user");

  if (!error) {
    return data.following;
  }

  return 0;
}

/*
 * Fetch followed users
 */
async function fetchFollowedUsers() {
  const { data, error } = await api("user/following?per_page=100");

  if (!error) {
    return parseFollowingNames(data);
  }

  return [];
}

/*
 * Batch unfollow users
 */
async function batchUnfollowUsers(users = []) {
  for (let user of users) {
    console.log(`Unfollowing ${`/user/following/${user}`}`);

    await api(`user/following/${user}`, "DELETE");
  }
}

/*
 * Main
 */
async function main() {
  const followingCount = await fetchFollowingCount();

  for (let count = 0; count < Math.ceil(followingCount / MAX_USERS); count++) {
    const users = await fetchFollowedUsers();

    await batchUnfollowUsers(users);
  }
}

main();
