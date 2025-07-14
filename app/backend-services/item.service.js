import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";
import axios from "axios";

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

  createItem = asyncHandler(async ({ name, description, price, file, type, amount, attribute_name }) => {
    const res = await axios.post(
      `${this.item_url}/create`,
      { name, description, price, type, amount, attribute_name, image: file },
      { 
        withCredentials: true, 
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return res.data?.data;
  });

  getUserItems = asyncHandler(async (userId) => {
    const res = await axios.get(`${this.item_url}/user/${userId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  getStoreItems = asyncHandler(async () => {
    const res = await axios.get(`${this.item_url}/store`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  getItemById = asyncHandler(async (itemId) => {
    const res = await axios.get(`${this.item_url}/${itemId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  updateItem = asyncHandler(async (itemId, { name, description, price, image, type, amount, claimed, attribute_name }) => {
    const res = await axios.put(
      `${this.item_url}/${itemId}`,
      { name, description, price, image, type, amount, claimed, attribute_name },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  deleteItem = asyncHandler(async (itemId) => {
    const res = await axios.delete(`${this.item_url}/${itemId}`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  purchaseItem = asyncHandler(async (itemId, userId) => {
    const res = await axios.post(
      `${this.item_url}/${itemId}/purchase`,
      { userId },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  useItem = asyncHandler(async (itemId) => {
    const res = await axios.patch(
      `${this.item_url}/${itemId}/use`,
      {},
      { withCredentials: true }
    );
    return res.data?.data;
  });
}

const itemService = new ItemService();
export default itemService;
