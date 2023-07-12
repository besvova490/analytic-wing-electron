import axios from "./axios";

// helpers
import { fileUpload } from "./routes.constants";

export default {
  post: async (file) => {
    const data = new FormData();
    data.append("file", file);

    const resp = await axios({
      url: fileUpload.base,
      method: "POST",
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return resp;
  },
};
