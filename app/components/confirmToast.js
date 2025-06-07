// lib/confirmToast.js
import { toast } from "react-toastify";
import React from "react";

export function confirmToast({
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "No",
  timeout = 5000,
}) {
  return new Promise((resolve) => {
    const toastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
              onClick={() => {
                resolve(false);
                toast.dismiss(toastId);
              }}
            >
              {cancelText}
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
              onClick={() => {
                resolve(true);
                toast.dismiss(toastId);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      ),
      {
        autoClose: timeout,
        closeOnClick: false,
        closeButton: false,
      }
    );
  });
}
