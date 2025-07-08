import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class StatService {
  constructor() {
    this.stat_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/stats";
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

  createStat = asyncHandler(async ({ skill, level, value, userId }) => {
    const response = await fetch(`${this.stat_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill, level, value, userId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Stat creation failed");
  });

  getUserStats = asyncHandler(async (userId) => {
    const response = await fetch(`${this.stat_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user stats failed");
  });

  getStatById = asyncHandler(async (statId) => {
    const response = await fetch(`${this.stat_url}/${statId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching stat failed");
  });

  updateStat = asyncHandler(async (statId, { skill, level, value }) => {
    const response = await fetch(`${this.stat_url}/${statId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill, level, value }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating stat failed");
  });

  deleteStat = asyncHandler(async (statId) => {
    const response = await fetch(`${this.stat_url}/${statId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting stat failed");
  });

  incrementStat = asyncHandler(async (statId, amount = 1) => {
    const response = await fetch(`${this.stat_url}/${statId}/increment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
      credentials: "include",
    });
    return this.handleResponse(response, "Incrementing stat failed");
  });

  getUserStatBySkill = asyncHandler(async (userId, skill) => {
    const response = await fetch(`${this.stat_url}/user/${userId}/skill/${skill}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching stat by skill failed");
  });
}

const statService = new StatService();
export default statService;
