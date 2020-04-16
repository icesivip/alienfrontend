<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
    <side-bar :background-color="sidebarBackground" short-title="CT" title="VIP - Alien">
      <template slot-scope="props" slot="links">
        <!-- <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        >
        </sidebar-item>-->
        <sidebar-item
          :link="{
            name: $t('Linear Programming'),
            icon: 'tim-icons icon-molecule-40'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('Graphical Method'),
              path: '/graphical'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('Simplex Method'),
              path: '/simplex'
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: $t('Branch & Bound'),
              path: '/branch'
            }"
          >
          </sidebar-item>
        </sidebar-item>
      <sidebar-item
          :link="{
            name: $t('Inventory Management'),
            icon: 'tim-icons icon-notes'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('Inventory Control Systems'),
              path: '/inventory'
            }"
          ></sidebar-item>
      </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('Facility Planning'),
            icon: 'tim-icons icon-components'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('Craft Algorithm'),
              path: '/craft'
            }"
          >
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('Master Plan Schedule'),
            icon: 'tim-icons icon-calendar-60'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('Master Production Schedule'),
              path: '/master-production-schedule'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('Material Requirements Planning'),
              path: '/material-requirements-planning'
            }"
          ></sidebar-item>
          </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('Networks'),
            icon: 'tim-icons icon-atom'
          }"
        >
          <sidebar-item
            :link="{
              name: $t('Shortest Path'),
              path: '/shortest-path'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('Minimum Spanning Tree'),
              path: '/minimum-spanning-tree'
            }"
          ></sidebar-item>
           <sidebar-item
            :link="{
              name: $t('Maximum Flow Problem'),
              path: '/maximum-flow-problem'
            }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div :class="{ content: !$route.meta.hideContent }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./SampleNavbar.vue";
import ContentFooter from "./SampleFooter.vue";
import DashboardContent from "../Layout/Content.vue";
import SidebarFixedToggleButton from "../Layout/SidebarFixedToggleButton.vue";
import { SlideYDownTransition, ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackground: "primary" //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("sidebar");
        initScrollbar("main-panel");
        initScrollbar("sidebar-wrapper");

        docClasses.add("perfect-scrollbar-on");
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    }
  },
  mounted() {
    this.initScrollbar();
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
