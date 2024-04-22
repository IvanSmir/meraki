import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const HttpActionsProducts = () => {
  const createProduct = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === "images" && data[key].length) {
          data[key].forEach((img) => formData.append(key, img));
        } else if (key === "tallas" && Object.keys(data[key]).length) {
          for (const prop in data[key]) {
            if (Object.prototype.hasOwnProperty.call(data[key], prop)) {
              formData.append(`tallas[${prop}]`, data[key][prop]);
            }
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    try {
      const response = await axios.post(
        `${BackendUrl}/api/products/add`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getProducts = async (search) => {
    try {
      const response = await axios.get(
        search
          ? `${BackendUrl}/api/products/all?search=${search}`
          : `${BackendUrl}/api/products/all`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (data, id) => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/products/${id}`,
        { withCredentials: true },
        data
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${BackendUrl}/api/products/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getProduct = async (id) => {
    try {
      const response = await axios.get(`${BackendUrl}/api/products/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTopThree = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/products/top`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
  return {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    getTopThree,
  };
};
