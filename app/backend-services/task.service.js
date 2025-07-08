import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class TaskService {
  constructor() {
    this.task_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/tasks";
  }

  handleResponse = async (response, defaultErrorMsg = "Request failed") => {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new ApiError(
        response.status || 500,
        `${defaultErrorMsg}: Invalid JSON response`
      );
    }
    if (!response.ok) {
      const errorMsg = data?.message || data?.error || defaultErrorMsg;
      throw new ApiError(response.status, errorMsg);
    }
    if (!("data" in data)) {
      throw new ApiError(
        response.status || 500,
        `${defaultErrorMsg}: Data not found`
      );
    }
    return data.data;
  };

  createTask = asyncHandler(async ({ id, name, userId }) => {
    const response = await fetch(`${this.task_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, userId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Task creation failed");
  });

  getUserTasks = asyncHandler(async (userId) => {
    const response = await fetch(`${this.task_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user tasks failed");
  });

  getTaskById = asyncHandler(async (taskId) => {
    const response = await fetch(`${this.task_url}/${taskId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching task failed");
  });

  updateTask = asyncHandler(async (taskId, { name, isCompleted }) => {
    const response = await fetch(`${this.task_url}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, isCompleted }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating task failed");
  });

  deleteTask = asyncHandler(async (taskId) => {
    const response = await fetch(`${this.task_url}/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting task failed");
  });

  completeTask = asyncHandler(async (taskId) => {
    const response = await fetch(`${this.task_url}/${taskId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Completing task failed");
  });

  getTasksByDate = asyncHandler(async (date, userId) => {
    const response = await fetch(
      `${this.task_url}/date/${date}/user/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    return this.handleResponse(response, `Fetching tasks for ${date} failed`);
  });
}

const taskService = new TaskService();
export default taskService;
