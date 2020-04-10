import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from './../pages/Starter/SampleLayout';
import Starter from './../pages/Starter/SamplePage';

import SimplexMethod from 'src/views/Modules/LinearProgramming/SimplexMethod';
import InventoryControlSystems from 'src/views/Modules/InventoryManagement/InventoryControlSystems';
import BranchAndBound from 'src/views/Modules/LinearProgramming/BranchAndBound';
import CraftMethod from 'src/views/Modules/LinearProgramming/CraftMethod';
import GraphicalMethod from 'src/views/Modules/LinearProgramming/GraphicalMethod';

import MPS from 'src/views/Modules/MasterPlanSchedule/MPS';
import MRP from 'src/views/Modules/MasterPlanSchedule/MRP';

import LPTable from 'src/components/Modules/LinearProgramming/LPTable';
import TestEmit from 'src/views/Modules/LinearProgramming/Test/testEmit';

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
          components: { default: CraftMethod }

        },
        {
          path: 'simplex',
          name: 'simplex',
          components: { default: SimplexMethod }
        },
        {
          path: 'branch',
          name: 'branch',
          components: { default: BranchAndBound }
        },
        {
          path: 'graphical',
          name: 'graphical',
          components: { default: GraphicalMethod }
        },
        {
          path: 'inventory',
          name: 'inventory',
          components: { default: InventoryControlSystems}
        },
        {
          path: 'master-production-schedule',
          name: 'mps',
          components: { default: MPS }
        },
        {
          path: 'material-requirements-planning',
          name: 'mrp',
          components: { default: MRP }
        },
        {
          path: 'test',
          name: 'test',
          components: { default: LPTable }
        },
        {
          path: 'testTable',
          name: 'testTable',
          components: { default: TestEmit }
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
