import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from './../pages/Starter/SampleLayout.vue';

import SimplexMethod from 'src/components/AlienComponents/SIMPLEX/SimplexMethod.vue';

import Starter from './../pages/Starter/SamplePage.vue';
import CraftLayout from 'src/components/AlienComponents/CRAFT/CraftLayout'

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


          components: { default: Starter }
        },
        {
          path: 'craft',
          name: 'craft',
          components: { default: CraftLayout }

        }, {
          path: 'simplex',
          name: 'simplex',
          components: { default: SimplexMethod }
        }
        ]
        }
      ],
      linkActiveClass: 'active',
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      }
    });
