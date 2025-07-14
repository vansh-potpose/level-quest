"use client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GameProvider } from "./context/GameContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import NavbarWrapper from "./components/NavbarWrapper";
import Authenticated from "./components/Authenticated";

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <GameProvider>
        <Authenticated>
          <NavbarWrapper />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Toaster position="top-center" richColors closeButton theme="dark" />
        </Authenticated>
      </GameProvider>
    </Provider>
  );
}
