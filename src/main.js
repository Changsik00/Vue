import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/axios'
import './plugins/my'
import './assets/css/common.scss'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import VeeValidate from 'vee-validate'

Vue.use(VueVideoPlayer)
Vue.use(VeeValidate)

// https://vuejs.org/v2/guide/components-registration.html
const Loading = () => import(/* webpackChunkName: "Header" */ './components/Loading.vue')
const Snackbar = () => import(/* webpackChunkName: "Snackbar" */ './components/Snackbar.vue')

Vue.component('Loading', Loading)
Vue.component('Snackbar', Snackbar)

// https://kr.vuejs.org/v2/api/index.html
Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app')
