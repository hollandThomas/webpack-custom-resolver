import Vue from 'vue';
import { VueEmotion } from '@egoist/vue-emotion';
import App from './commons/App/App.vue';

Vue.use(VueEmotion);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
