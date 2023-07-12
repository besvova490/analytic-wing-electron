import axios from "./axios";

// helpers
import { webApp } from "./routes.constants";

export default {
  post: async (data) => {
    const resp = await axios({ url: webApp.base, method: "POST", data });

    return resp;
  },
};
