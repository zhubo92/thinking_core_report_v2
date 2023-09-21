import "@/styles/reset.scss";
import "@/styles/common.scss";
import "@/styles/fonts.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "vant/lib/index.css";
import { Swipe, SwipeItem } from "vant";
import vconsole from "vconsole";

new vconsole();

createApp(App)
  .use(router)
  .use(store)
  .use(Swipe)
  .use(SwipeItem)
  .component("VanSwipe", Swipe)
  .component("VanSwipeItem", SwipeItem)
  .mount("#app");
