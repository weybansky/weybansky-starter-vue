import { ref } from "vue";
import { defineStore } from "pinia";
import { authfetchUserData } from "../helpers/api";

export const useUserStore = defineStore("user", () => {
  const authToken = ref("");

  const user = ref({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  async function fetchUserData() {
    const response = await authfetchUserData();
    user.value = response.data.data;
    return response;
  }

  return { authToken, user, fetchUserData };
});
