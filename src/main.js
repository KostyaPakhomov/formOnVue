import Vue from 'vue'
import App from './App.vue'
import './style.sass'
import 'sass-reset/src/reset.scss'
import Vuelidate from "vuelidate";
import Multiselect from "vue-multiselect";

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuelidate)
Vue.component('multiselect', Multiselect)

new Vue({
  render: h => h(App),
}).$mount('#app')
