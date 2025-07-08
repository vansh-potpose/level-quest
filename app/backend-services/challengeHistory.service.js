import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class ChallengeHistoryService {
  constructor() {
    this.challenge_history_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/challenge-history";
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

  createChallengeHistory = asyncHandler(async ({ date, rewardsClaimed, dailyId }) => {
    const response = await fetch(`${this.challenge_history_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, rewardsClaimed, dailyId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Challenge history creation failed");
  });

  getDailyChallengeHistory = asyncHandler(async (dailyId) => {
    const response = await fetch(`${this.challenge_history_url}/daily/${dailyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching daily challenge history failed");
  });

  getChallengeHistoryById = asyncHandler(async (historyId) => {
    const response = await fetch(`${this.challenge_history_url}/${historyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching challenge history failed");
  });

  updateChallengeHistory = asyncHandler(async (historyId, { date, rewardsClaimed }) => {
    const response = await fetch(`${this.challenge_history_url}/${historyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, rewardsClaimed }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating challenge history failed");
  });

  deleteChallengeHistory = asyncHandler(async (historyId) => {
    const response = await fetch(`${this.challenge_history_url}/${historyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting challenge history failed");
  });

  getUserChallengeHistory = asyncHandler(async (userId) => {
    const response = await fetch(`${this.challenge_history_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user challenge history failed");
  });
}

const challengeHistoryService = new ChallengeHistoryService();
export default challengeHistoryService;
