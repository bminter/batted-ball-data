import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pitcher/:pitcherId',
      name: 'pitcher',
      component: () => import(/* webpackChunkName: "pitcher" */ '@/views/Pitcher'),
    },
    {
      path: '/batter/:batterId',
      name: 'batter',
      component: () => import(/* webpackChunkName: "batter" */ '@/views/Batter'),
    },
  ],
});
