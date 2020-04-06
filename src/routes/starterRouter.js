import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from './../pages/Starter/SampleLayout.vue';

import SimplexMethod from 'src/components/AlienComponents/SIMPLEX/SimplexMethod.vue';
import BranchAndBound from 'src/components/AlienComponents/B&B/BranchAndBound.vue';
import Starter from './../pages/Starter/SamplePage.vue';
import CraftLayout from 'src/components/AlienComponents/CRAFT/CraftLayout'
import graphicalMethod from 'src/components/AlienComponents/GM/graphicalMethod'
import LPTable from 'src/components/AlienComponents/Auxiliary/LPTable.vue'
import testEmit from 'src/components/AlienComponents/Test/testEmit.vue'

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
        }, {
          path: 'branch',
          name: 'branch',
          components: { default: BranchAndBound }
        },
        {
          path: 'graphical',
          name: 'graphical',
          components: { default: graphicalMethod }
        },
        {
          path: 'test',
          name: 'test',
          components: { default: LPTable }
        },
        {
          path: 'testTable',
          name: 'testTable',
          components: { default: testEmit }
        },
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
