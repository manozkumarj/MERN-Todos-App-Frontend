import axios from "axios";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const { accessToken } = useContext(authContext);
    if (accessToken) {
      config.headers["x-authorization-token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    console.log("prevRequest --> ", prevRequest);
    if (
      !isRefreshing &&
      error?.response?.status === 403 &&
      !prevRequest?.sent
    ) {
      isRefreshing = true;
      prevRequest.sent = true;
      const newAccessToken = await axios.get(
        `${import.meta.env.REACT_APP_URL}/api/auth/refresh`,
        { withCredentials: true }
      );
      if (newAccessToken) {
        isRefreshing = false;
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${newAccessToken} `;
        axios.defaults.headers.common[
          "x-authorization-token"
        ] = `Bearer ${newAccessToken} `;
        return axiosPrivate(prevRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
