import constants from "./constants";
import Axios from "axios";
import qs from "qs";
import Auth from "./auth";
const url = `${constants.base_url}/upload`;

const headers = {
  // authorization: `Bearer ${constants.token}`,
  "Access-Control-Allow-Origin": "*",
  "content-type": "multipart/form-data"
};

export default {
  post: async data => {
    let response, token;

    token = await Auth.post();
    headers["authorization"] = `Bearer ${token}`;

    const formData = new FormData();
    formData.append('file', data);

    try {
      response = await Axios({
        method: "POST",
        headers,
        data: formData,
        url
      });
      return response;
    } catch (e) {
      return e.response.data;
    }
  },

  delete: async data => {
    let token;

    token = await Auth.post();
    headers["authorization"] = `Bearer ${token}`;

    try {
      const response = await Axios({
        method: "DELETE",
        headers,
        url: url + "/" + data._id
      });

      return response;
    } catch (e) {
      return e.response.data;
    }
  }
};
