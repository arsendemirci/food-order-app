import { useState, useCallback } from "react";
import axiosApi from "@api";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config, applyData) => {
    const {
      method,
      url,
      body: payload,
    } = {
      method: config.method || "GET",
      url: config.url,
      body: config.body || null,
    };
    setIsLoading(true);
    setError(null);
    let response;
    try {
      if (method === "GET") {
        response = await axiosApi.getResponse(url);
      } else if (method === "POST") {
        response = await axiosApi.postData(url, payload);
      } else {
        throw new Error("Request method is undefined");
      }
      if (response.statusText !== "OK") throw new Error("Request failed!");
      applyData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, sendRequest };
};

export default useAxios;
