import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/route";
import Config from "./cognito-config";
import Cognito from "./cognito/Cognito";
import { VueShowdownPlugin } from "vue-showdown";

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(Cognito, Config.AWSConfig);
app.use(VueShowdownPlugin, {
  // set default flavor of showdown
  flavor: "github",
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: false,
  },
});
app.mount("#app");
