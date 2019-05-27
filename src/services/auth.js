import constants from "./constants";
import Axios from "axios";
import qs from "qs";


const url = `${constants.base_url}/oauth/token`;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded"
};


export default {
  post: async (data) => {
    let response;
    try {
      response = await Axios({
        method: "POST",
        headers,
        data: qs.stringify(data),
        url
      });
      window.localStorage.setItem("token", response.data.accessToken);
      window.localStorage.setItem("expiration", response.data.accessTokenExpiresAt);
      return response.data.accessToken;
    } catch (e) {
      return e.response.data;
    }
  },

  get: async () => {
    return window.localStorage.getItem("token");
  }
};
