import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";

class ItemService {
  constructor() {
    this.item_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/items";
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

  createItem = asyncHandler(async ({ name, description, price, image, type, amount, attribute_name, userId }) => {
    const response = await fetch(`${this.item_url}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, image, type, amount, attribute_name, userId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Item creation failed");
  });

  getUserItems = asyncHandler(async (userId) => {
    const response = await fetch(`${this.item_url}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user items failed");
  });

  getStoreItems = asyncHandler(async () => {
    const response = await fetch(`${this.item_url}/store`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching store items failed");
  });

  getItemById = asyncHandler(async (itemId) => {
    const response = await fetch(`${this.item_url}/${itemId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching item failed");
  });

  updateItem = asyncHandler(async (itemId, { name, description, price, image, type, amount, claimed, attribute_name }) => {
    const response = await fetch(`${this.item_url}/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, image, type, amount, claimed, attribute_name }),
      credentials: "include",
    });
    return this.handleResponse(response, "Updating item failed");
  });

  deleteItem = asyncHandler(async (itemId) => {
    const response = await fetch(`${this.item_url}/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Deleting item failed");
  });

  purchaseItem = asyncHandler(async (itemId, userId) => {
    const response = await fetch(`${this.item_url}/${itemId}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
      credentials: "include",
    });
    return this.handleResponse(response, "Purchasing item failed");
  });

  useItem = asyncHandler(async (itemId) => {
    const response = await fetch(`${this.item_url}/${itemId}/use`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return this.handleResponse(response, "Using item failed");
  });
}

const itemService = new ItemService();
export default itemService;
