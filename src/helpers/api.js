import axios from "axios";

axios.defaults.baseURL = "https://api.service.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

import { mapState } from "pinia";
import { useUserStore } from "../stores/user";

function getAuthToken() {
  const token = mapState(useUserStore, ["authToken"]);
  return token.authToken();
}

/** USER */
export async function authfetchUserData() {
  return axios.post("/auth/user", {
    headers: {
      "x-access-token": getAuthToken(),
    },
  });
}
