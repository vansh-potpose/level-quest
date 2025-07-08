import { showGameToast } from "@/app/components/ShowGameToast";
import ApiError from "./ApiError";

const asyncHandler = (callback) => {
  return async (...args) => {
    try {
      return await callback(...args);
    } catch (err) {
      const { message = err.message } = err.response?.data?.error;
      const { status = 500 } = err.response?.data;
      showGameToast({
        icon: "❌",
        title: "Error",
        description: message || err.message,
        border_color: "border-red-500",
        text_color: "text-red-500",
        progressClass_color: "!bg-red-700",
      });
      throw new ApiError(status, message || err.message);
    }
  };
};

export default asyncHandler;
