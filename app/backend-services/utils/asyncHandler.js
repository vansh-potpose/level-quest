import { showGameToast } from "@/app/components/ShowGameToast";
import ApiError from "./ApiError";

const asyncHandler = (callback) => {
  return async (...args) => {
    try {
      return await callback(...args);
    } catch (err) {
      let message = err.message || "something went wrong";
      let status = err.status || 500;
      console.log(err);
      if (err.response?.isBackendError) {
        message = err.response.message;
      }
      showGameToast({
        icon: "❌",
        title: "Error",
        description: message || err.message,
        border_color: "border-red-500",
        text_color: "text-red-500",
        progressClass_color: "!bg-red-700",
      });
      throw new ApiError(status, message);
    }
  };
};

export default asyncHandler;
