import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class ChallengeService {
  constructor() {
    this.challenge_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/challenges";
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

  createChallenge = asyncHandler(async ({ name, description, completed, skill, dailyId }) => {
    const response = await fetch(`${this.challenge_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, completed, skill, dailyId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Challenge creation failed");
  });

  getDailyChallenges = asyncHandler(async (dailyId) => {
    const response = await fetch(`${this.challenge_url}/daily/${dailyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching daily challenges failed");
  });

  getChallengeById = asyncHandler(async (challengeId) => {
    const response = await fetch(`${this.challenge_url}/${challengeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching challenge failed");
  });

  updateChallenge = asyncHandler(async (challengeId, { name, description, completed, skill }) => {
    const response = await fetch(`${this.challenge_url}/${challengeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, completed, skill }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating challenge failed");
  });

  deleteChallenge = asyncHandler(async (challengeId) => {
    const response = await fetch(`${this.challenge_url}/${challengeId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting challenge failed");
  });

  completeChallenge = asyncHandler(async (challengeId) => {
    const response = await fetch(`${this.challenge_url}/${challengeId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Completing challenge failed");
  });
}

const challengeService = new ChallengeService();
export default challengeService;
