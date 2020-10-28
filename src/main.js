import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引进路由器
import axios from 'axios'
import Resource from 'vue-resource'
import VueCookies from 'vue-cookies'

// 引入store
// import store from './store/index'
import { RadioGroup, Radio, Checkbox, CheckboxGroup ,Button,Card,Dialog,Toast} from 'vant';
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Resource);
Vue.use(VueCookies);
Vue.use(Toast);


import './utils/rem' //移动端适配
import './utils/reset.css'  // 样式重置
Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
