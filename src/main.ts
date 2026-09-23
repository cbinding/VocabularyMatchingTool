import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import i18n_messages from "../i18n_messages.json";
import App from '@/App.vue';

import "@/styles/normalize.css";
import "@/styles/skeleton.css";
import "@/styles/tabulator.min.css";
import "@/styles/usw-modal.css";
import "@/styles/usw-vmt.css";

const DEFAULT_LOCALE = "en";

const i18n = createI18n({
  locale: localStorage.getItem("locale") || DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: i18n_messages,  
  globalInjection: true,
  legacy: false,
  missingWarn: false, // suppress warnings on missing translations
  fallbackWarn: false, // suppress warnings about fallbacks
});

const app = createApp(App)
  .use(i18n)
  //.mount('#app')

app.config.warnHandler = function (msg, vm, trace) {
  // suppress warnings about missing translations
  if (msg.includes("Cannot find translation key")) {
    return;
  }
  console.warn(msg, trace);
};

app.config.errorHandler = function (msg, vm, trace) {  
  console.error(msg, trace);
};

app.mount('#app')