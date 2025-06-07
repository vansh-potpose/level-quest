// lib/confirmToast.js
import { toast } from "sonner";
import React from "react";

export function confirmToast({
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "No",
  duration = 5000,
}) {
  return new Promise((resolve) => {
    const id = toast.custom((t) => (
      <div className="bg-gray-900 text-white p-4 rounded-md shadow flex flex-col gap-3">
        <div>{message}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 text-sm"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
          >
            {cancelText}
          </button>
          <button
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 text-sm"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    ), { duration });
  });
}
