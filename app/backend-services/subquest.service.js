import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class SubQuestService {
  constructor() {
    this.subquest_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/subquests";
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

  createSubQuest = asyncHandler(async ({ name, completed, claim, questId, rewards }) => {
    const response = await fetch(`${this.subquest_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed, claim, questId, rewards }),
      credentials: "include",
    });
    return this.handleResponse(response, "SubQuest creation failed");
  });

  getQuestSubQuests = asyncHandler(async (questId) => {
    const response = await fetch(`${this.subquest_url}/quest/${questId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching subquests for quest failed");
  });

  getSubQuestById = asyncHandler(async (subQuestId) => {
    const response = await fetch(`${this.subquest_url}/${subQuestId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching subquest failed");
  });

  updateSubQuest = asyncHandler(async (subQuestId, { name, completed, claim }) => {
    const response = await fetch(`${this.subquest_url}/${subQuestId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed, claim }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating subquest failed");
  });

  deleteSubQuest = asyncHandler(async (subQuestId) => {
    const response = await fetch(`${this.subquest_url}/${subQuestId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting subquest failed");
  });

  completeSubQuest = asyncHandler(async (subQuestId) => {
    const response = await fetch(`${this.subquest_url}/${subQuestId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Completing subquest failed");
  });

  claimSubQuestRewards = asyncHandler(async (subQuestId) => {
    const response = await fetch(`${this.subquest_url}/${subQuestId}/claim`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Claiming subquest rewards failed");
  });
}

const subQuestService = new SubQuestService();
export default subQuestService;
