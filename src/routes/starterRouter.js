import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from './../pages/Starter/SampleLayout.vue';
import Beginner from './../pages/Starter/Beginner.vue';
import SimplexMethod from './../pages/Starter/SimplexMethod.vue';
import Table from './../pages/Tables/Table.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: { default: DashboardLayout}

        },{
          path: 'simplex',
          name: 'simplex',
          components: { default: SimplexMethod}
        }
      ]
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
