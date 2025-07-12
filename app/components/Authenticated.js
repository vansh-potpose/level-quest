import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import auth from "../backend-services/auth.service";
import { clearUser, setUser } from "../redux/userSlice";

const Authenticated = ({ children }) => {
  // User slice
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Checking authentication status...");
    const fetchUser = async () => {
      try {
        const user = await auth.getUser();
        if (!user) {
          router.push("/login");
          dispatch(clearUser(null));
        }
        dispatch(setUser(user));
        console.log("User fetched successfully:", user);
      } catch (error) {
        console.log("Error fetching user:", error);
        router.push("/login");
        dispatch(clearUser(null));
      }
    };
    if (!isAuthenticated) {
      // console.log("isAuthenticated:", isAuthenticated);
      fetchUser();
    }
  }, []);
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
};

export default Authenticated;
