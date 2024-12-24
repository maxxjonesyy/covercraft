import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

function useAxiosInstance() {
  const { user, logout, refreshToken } = useContext(UserContext);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (request) => {
      const tokenAndCredentials = [
        "/coverLetter",
        "/profile",
        "/savedCoverLetters",
        "/create-checkout-session",
        "/verify-payment",
      ];
      const credentials = [
        "/refresh-token",
        "/login",
        "/profile",
        "/savedCoverLetters",
        "/create-checkout-session",
        "/verify-payment",
      ];

      const matchesTokenRoute = tokenAndCredentials.some((route) =>
        request.url?.startsWith(route)
      );

      const matchesCredentialRoute = credentials.some((route) =>
        request.url?.startsWith(route)
      );

      if (matchesTokenRoute && !request.headers["Authorization"]) {
        if (!user?.token) {
          toast.error("No token found. Please log in again.");
        }

        request.headers["Authorization"] = `Bearer ${user?.token}`;
        request.withCredentials = true;
      }

      if (matchesCredentialRoute) {
        request.withCredentials = true;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const errorMessage =
        error?.response?.data?.error || "Unexpected error, please try again.";

      if (errorMessage === "Expired access token" && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshedToken = await refreshToken();

          if (refreshedToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshedToken}`;

            return await axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          toast.dismiss();
          toast.error("Your session has expired. Please log in again.");
          logout();
          return Promise.reject(refreshError);
        } finally {
          originalRequest._retry = false;
        }
      }

      toast.dismiss();
      toast.error(errorMessage);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default useAxiosInstance;
