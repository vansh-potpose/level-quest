import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class QuestService {
  constructor() {
    this.quest_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/quests";
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

  createQuest = asyncHandler(async ({ image, name, endDate, description, priority, userId, rewards, subQuests }) => {
    const response = await fetch(`${this.quest_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, name, endDate, description, priority, userId, rewards, subQuests }),
      credentials: "include",
    });
    return this.handleResponse(response, "Quest creation failed");
  });

  getUserQuests = asyncHandler(async (userId) => {
    const response = await fetch(`${this.quest_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user quests failed");
  });

  getQuestById = asyncHandler(async (questId) => {
    const response = await fetch(`${this.quest_url}/${questId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching quest failed");
  });

  updateQuest = asyncHandler(async (questId, { image, name, endDate, description, priority, isCompleted }) => {
    const response = await fetch(`${this.quest_url}/${questId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, name, endDate, description, priority, isCompleted }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating quest failed");
  });

  deleteQuest = asyncHandler(async (questId) => {
    const response = await fetch(`${this.quest_url}/${questId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting quest failed");
  });

  completeQuest = asyncHandler(async (questId) => {
    const response = await fetch(`${this.quest_url}/${questId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Completing quest failed");
  });
}

const questService = new QuestService();
export default questService;
