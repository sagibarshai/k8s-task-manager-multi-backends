import axios from "axios";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const appAxios = axios.create({
  withCredentials: true,
});

const AxiosInterceptor = (navigate: NavigateFunction) => {
  appAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      return new Promise((_, reject) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 403) navigate("/login");
        }
        reject(error);
      });
    }
  );
};

export const AxiosInterceptorNavigate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AxiosInterceptor(navigate);
  }, [appAxios]);
  return <></>;
};

export default appAxios;
