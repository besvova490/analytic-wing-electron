import axios from "./axios";

// helpers
import { events } from "./routes.constants";

export default {
  get: async (id) => {
    const resp = await axios({ url: `${events.base}/${id}`, method: "GET" });

    return resp;
  },
};
