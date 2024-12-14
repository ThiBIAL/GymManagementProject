import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

router.beforeEach((to, from, next) => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = '/logo.jpg'; // Remplace "logo.jpg" par le nom de ton fichier dans le dossier public
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/logo.jpg'; // Remplace "logo.jpg" par le nom de ton fichier dans le dossier public
      document.head.appendChild(link);
    }
  
    next();
  })

createApp(App).use(router).mount('#app')

