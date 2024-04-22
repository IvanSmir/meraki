import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;
export const HttpActions = () => {
  const loginAuth = async (data) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/auth/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response.status == 401) {
        throw new Error("Credenciales Incorrectas");
      } else if (error.response.status === 500) {
        throw new Error("Error en el servidor. Intente Mas tarde");
      } else {
        console.error(error);
      }
    }
  };
  const registerAuth = async (data) => {
    try {
      await axios.post(`${BackendUrl}/api/auth/register`, data);
    } catch (error) {
      console.error(error);
      if (error.response.status === 409) {
        throw new Error("El usuario ya existe");
      }
      if (error.response.status === 400) {
        throw new Error("Datos Invalidos");
      }
      if (error.response.status === 500) {
        throw new Error("Error en el servidor. Intente Mas tarde");
      }
    }
  };
  const logoutAuth = async () => {
    try {
      const response = await axios.post(
        `${BackendUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loginAuth,
    registerAuth,
    logoutAuth,
  };
};
