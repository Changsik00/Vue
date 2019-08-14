import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const About = () => import(/* webpackChunkName: "about" */ "./views/About.vue");

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "*",
      component: Home
    }
  ]
});

router.beforeResolve((to, from, next) => {
  next();
});

router.afterEach((to, from) => {});

export default router;