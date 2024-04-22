import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const HttpActionsClients = () => {
  const createClient = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === "image" && data[key].length) {
          formData.append(key, data[key][0]);
        } else if (key === "medidas" && Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            for (const prop in item) {
              if (Object.prototype.hasOwnProperty.call(item, prop)) {
                formData.append(`${key}[${index}][${prop}]`, item[prop]);
              }
            }
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    try {
      const response = await axios.post(
        `${BackendUrl}/api/clients/add`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      }
      console.error(error);
    }
  };
  const getClients = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/clients/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      }
      console.error(error);
    }
  };
  const updateClient = async (data, id) => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/clients/${id}`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      }
      console.error(error);
    }
  };
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(`${BackendUrl}/api/clients/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      }
      console.error(error);
    }
  };
  const getClient = async (id) => {
    try {
      const response = await axios.get(`${BackendUrl}/api/clients/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      } else {
        throw new Error(error);
      }
    }
  };

  const getProductsFronClient = async (id) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/prices/client/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      } else {
        throw new Error(error);
      }
    }
  };
  const getProductsFronClientByNumber = async (number) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/prices/client/number/${number}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error({ status: 401, message: "No autorizado" });
      } else {
        throw new Error(error);
      }
    }
  };
  return {
    createClient,
    getClients,
    updateClient,
    deleteClient,
    getClient,
    getProductsFronClient,
    getProductsFronClientByNumber,
  };
};
