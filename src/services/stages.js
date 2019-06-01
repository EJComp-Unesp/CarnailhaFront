import constants from "./constants";
import Axios from "axios";
import qs from "qs";
import Auth from "./auth";
const url = `${constants.base_url}/stage`;

const headers = {
  // authorization: `Bearer ${constants.token}`,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded"
};

export default {
  post: async data => {
    let response, token;

    token = await Auth.post();
    headers["authorization"] = `Bearer ${token}`;

    try {
      response = await Axios({
        method: "POST",
        headers,
        data: qs.stringify(data),
        url
      });
      return response;
    } catch (e) {
      return e.response.data;
    }
  },

  get: async () => {
    try {
      const response = await Axios({
        method: "GET",
        headers,
        url
      });

      return response;
    } catch (e) {
      return e.response.data;
    }
  },

  update: async data => {
    let response, token;

    token = await Auth.post();
    console.log(token);
    headers["authorization"] = `Bearer ${token}`;

    try {
      response = await Axios({
        method: "PUT",
        headers,
        data: qs.stringify(data),
        url
      });
      console.log(response);
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