import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);
const pinia = createPinia();

if (localStorage.getItem("piniaState")) {
  pinia.state.value = JSON.parse(localStorage.getItem("piniaState"));
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("piniaState", JSON.stringify(state));
  },
  { deep: true }
);

app.use(pinia);
app.use(router);

app.mount("#app");
