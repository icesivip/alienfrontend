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


import ShortestPath from 'src/views/Modules/Networks/ShortestPath';
import MST from 'src/views/Modules/Networks/MST';
import MFP from 'src/views/Modules/Networks/MFP';

import NEOSServer from 'src/views/Modules/LinearProgramming/NEOSServer';
import InteriorPoint from 'src/views/Modules/LinearProgramming/InteriorPoint';

import NearestNeighbour from 'src/views/Modules/Routing/NearestNeighbor';
import ClarkeAndWright from 'src/views/Modules/Routing/ClarkeAndWright';
import Opt3Move from 'src/views/Modules/Routing/Opt3Move';
import Sweep from 'src/views/Modules/Routing/Sweep';

import PartitioningMethods from 'src/views/Modules/Clustering/PartitioningMethods';

import PCA from 'src/views/Modules/PCA/PCA';

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
          path: 'ampl',
          name: 'ampl',

          components: { default: NEOSServer }
        }
        ,
        {
          path: 'interior',
          name: 'interior',

          components: { default: InteriorPoint }
        }
        ,
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
          components: { default: NEOSServer }
        },
        {
          path: 'testTable',
          name: 'testTable',
          components: { default: TestEmit }
        },
        {
          path: 'shortest-path',
          name: 'shortest path',
          components: { default: ShortestPath }
        },
        {
          path: 'minimum-spanning-tree',
          name: 'mst',
          components: { default: MST }
        },
        {
          path: 'maximum-flow-problem',
          name: 'mfp',
          components: { default: MFP }
        },
        {
          path: 'maximum-flow-problem',
          name: 'mfp',
          components: { default: MFP }
        },
        {
          path: 'nearest-neighbor',
          name: 'nn',
          components: { default: NearestNeighbour }
        },
        {
          path: 'clark-and-wright',
          name: 'ck',
          components: { default: ClarkeAndWright }
        },
        {
          path: 'opt-3-move',
          name: 'o3p',
          components: { default: Opt3Move }
        },
        {
          path: 'sweep',
          name: 'sp',
          components: { default: Sweep }
        },
        {
          path: 'partitioning-methods',
          name: 'pm',
          components: { default: PartitioningMethods }
        },
        {
          path: 'pca',
          name: 'pca',
          components: { default: PCA }
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
