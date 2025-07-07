import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class DailyRewardService {
  constructor() {
    this.daily_reward_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/daily-rewards";
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

  createDailyReward = asyncHandler(async ({ type, amount, dailyId }) => {
    const response = await fetch(`${this.daily_reward_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount, dailyId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Daily reward creation failed");
  });

  getDailyChallengeRewards = asyncHandler(async (dailyId) => {
    const response = await fetch(`${this.daily_reward_url}/daily/${dailyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching daily challenge rewards failed");
  });

  getDailyRewardById = asyncHandler(async (rewardId) => {
    const response = await fetch(`${this.daily_reward_url}/${rewardId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching daily reward failed");
  });

  updateDailyReward = asyncHandler(async (rewardId, { type, amount }) => {
    const response = await fetch(`${this.daily_reward_url}/${rewardId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating daily reward failed");
  });

  deleteDailyReward = asyncHandler(async (rewardId) => {
    const response = await fetch(`${this.daily_reward_url}/${rewardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting daily reward failed");
  });
}

const dailyRewardService = new DailyRewardService();
export default dailyRewardService;
