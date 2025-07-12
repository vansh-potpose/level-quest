import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";
import axios from "axios";

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
    const res = await axios.post(
      `${this.stat_url}/create`,
      { skill, level, value, userId },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  getUserStats = asyncHandler(async (userId) => {
    const res = await axios.get(`${this.stat_url}/user/${userId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  getStatById = asyncHandler(async (statId) => {
    const res = await axios.get(`${this.stat_url}/${statId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  updateStat = asyncHandler(async (statId, { skill, level, value }) => {
    const res = await axios.put(
      `${this.stat_url}/${statId}`,
      { skill, level, value },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  deleteStat = asyncHandler(async (statId) => {
    const res = await axios.delete(`${this.stat_url}/${statId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  incrementStat = asyncHandler(async (statId, amount = 1) => {
    const res = await axios.patch(
      `${this.stat_url}/${statId}/increment`,
      { amount },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  getUserStatBySkill = asyncHandler(async (userId, skill) => {
    const res = await axios.get(`${this.stat_url}/user/${userId}/skill/${skill}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });
}

const statService = new StatService();
export default statService;
