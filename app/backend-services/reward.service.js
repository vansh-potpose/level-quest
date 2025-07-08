import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class RewardService {
  constructor() {
    this.reward_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/rewards";
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

  createReward = asyncHandler(async ({ type, amount, skill, questId, subQuestId, itemId }) => {
    const response = await fetch(`${this.reward_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount, skill, questId, subQuestId, itemId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Reward creation failed");
  });

  getQuestRewards = asyncHandler(async (questId) => {
    const response = await fetch(`${this.reward_url}/quest/${questId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching quest rewards failed");
  });

  getSubQuestRewards = asyncHandler(async (subQuestId) => {
    const response = await fetch(`${this.reward_url}/subquest/${subQuestId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching subquest rewards failed");
  });

  getRewardById = asyncHandler(async (rewardId) => {
    const response = await fetch(`${this.reward_url}/${rewardId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching reward failed");
  });

  updateReward = asyncHandler(async (rewardId, { type, amount, skill, itemId }) => {
    const response = await fetch(`${this.reward_url}/${rewardId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount, skill, itemId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating reward failed");
  });

  deleteReward = asyncHandler(async (rewardId) => {
    const response = await fetch(`${this.reward_url}/${rewardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting reward failed");
  });
}

const rewardService = new RewardService();
export default rewardService;
