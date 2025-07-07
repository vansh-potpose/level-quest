import asyncHandler from "./utils/asyncHandler";
import ApiError from "./utils/ApiError";
import axios from "axios";
class Auth {
  constructor() {
    this.auth_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/users";
  }

  login = asyncHandler(async ({ email = "", password = "" }) => {
    const res = await axios.post(
      `${this.auth_url}/login`,
      { email, password },
      { withCredentials: true }
    );

    return res.data?.data;
  });

  register = asyncHandler(async ({ name = "", email = "", password = "" }) => {
    const response = await fetch(`${this.auth_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      credentials: "include",
    });
    return await this.handleResponse(response, "Registration failed");
  });

  refreshAccessToken = asyncHandler(async () => {
    console.log("refreshing");
    const res = await axios.get(`${this.auth_url}/user`, {
      withCredentials: true,
    });
    return res.data.data;
  });

  logout = asyncHandler(async () => {
    const response = await fetch(`${this.auth_url}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Logout may not always return data, so handle gracefully
    try {
      const data = await response.json();
      return data?.data || true;
    } catch {
      return true;
    }
  });

  getUserDetails = asyncHandler(async (id) => {
    const response = await fetch(`${this.auth_url}/get-user-details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return this.handleResponse(response, "Fetching user details failed");
  });
}
const auth = new Auth();

export default auth;
