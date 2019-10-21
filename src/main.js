import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

Vue.use(VuePlyr);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
