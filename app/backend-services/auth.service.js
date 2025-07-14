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
    const res = await axios.post(
      `${this.auth_url}/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return res.data?.data;
  });

  getUser = asyncHandler(async () => {
    console.log("refreshing");
    const res = await axios.get(`${this.auth_url}/user`, {
      withCredentials: true,
    });
    return res.data?.data;
  });

  logout = asyncHandler(async () => {
    const res = await axios.get(`${this.auth_url}/logout`, {
      withCredentials: true,
    });
    // Logout may not always return data, so handle gracefully
    return res.data?.data;
  });

  updateProfile = asyncHandler(async (formData) => {
    const res = await axios.patch(`${this.auth_url}/user`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data?.data;
  })
}
const auth = new Auth();

export default auth;
