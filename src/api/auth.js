import axios from "./axios";

export default {
  login: async (data) => {
    const resp = await axios({ url: "/auth/login", method: "POST", data });

    if (resp.accessToken && resp.refreshToken) {
      localStorage.setItem("accessToken", resp.accessToken);
      localStorage.setItem("refreshToken", resp.refreshToken);
      
      window.dispatchEvent(new Event("storage"));
    }

    return resp;
  },

  register: async (data) => {
    const resp = await axios({ url: "/auth/register", method: "POST", data });

    return resp;
  },
};
