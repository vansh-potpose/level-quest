import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class DailyChallengeService {
  constructor() {
    this.daily_challenge_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/daily-challenges";
  }

  handleResponse = async (response, defaultErrorMsg = "Request failed") => {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new ApiError(response.status || 500, `${defaultErrorMsg}: Invalid JSON response`);
    }
    if (!response.ok) {
      const errorMsg = data?.message || data?.error || defaultErrorMsg;
      throw new ApiError(response.status, errorMsg);
    }
    if (!('data' in data)) {
      throw new ApiError(response.status || 500, `${defaultErrorMsg}: Data not found`);
    }
    return data.data;
  };

  createDailyChallenge = asyncHandler(async ({ date, userId, challenges, rewards }) => {
    const response = await fetch(`${this.daily_challenge_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, userId, challenges, rewards }),
      credentials: "include",
    });
    return this.handleResponse(response, "Daily challenge creation failed");
  });

  getUserDailyChallenges = asyncHandler(async (userId) => {
    const response = await fetch(`${this.daily_challenge_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user daily challenges failed");
  });

  getTodayChallenge = asyncHandler(async (userId) => {
    const response = await fetch(`${this.daily_challenge_url}/today/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching today's challenge failed");
  });

  getDailyChallengeById = asyncHandler(async (dailyChallengeId) => {
    const response = await fetch(`${this.daily_challenge_url}/${dailyChallengeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching daily challenge failed");
  });

  updateDailyChallenge = asyncHandler(async (dailyChallengeId, { date, claimedDate }) => {
    const response = await fetch(`${this.daily_challenge_url}/${dailyChallengeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, claimedDate }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating daily challenge failed");
  });

  deleteDailyChallenge = asyncHandler(async (dailyChallengeId) => {
    const response = await fetch(`${this.daily_challenge_url}/${dailyChallengeId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting daily challenge failed");
  });

  claimDailyRewards = asyncHandler(async (dailyChallengeId) => {
    const response = await fetch(`${this.daily_challenge_url}/${dailyChallengeId}/claim`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Claiming daily rewards failed");
  });
}

const dailyChallengeService = new DailyChallengeService();
export default dailyChallengeService;
