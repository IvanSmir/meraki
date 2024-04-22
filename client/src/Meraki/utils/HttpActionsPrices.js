import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const HttpActionsPrices = () => {
  const createPrice = async (data) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/prices/add`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getPrices = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/prices/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updatePrice = async ({ data, id }) => {
    try {
      const response = await axios.put(`${BackendUrl}/api/prices/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const deletePrice = async (id) => {
    try {
      const response = await axios.delete(`${BackendUrl}/api/prices/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getPrice = async (id) => {
    try {
      const response = await axios.get(`${BackendUrl}/api/prices/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { createPrice, getPrices, updatePrice, deletePrice, getPrice };
};
