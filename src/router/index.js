import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorso from '../parts/RobotTorso.vue';
import RobotBases from '../parts/RobotBases.vue';
import StandardSidebar from '../sidebar/StandardSidebar.vue';
import BuildSidebar from '../sidebar/BuildSidebar.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router(
  {
    //    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        components: {
          default: HomePage,
          sidebar: StandardSidebar,
        },
      },
      {
        path: '/build',
        name: 'Build',
        components: {
          default: RobotBuilder,
          sidebar: BuildSidebar,
        },
      },
      {
        path: '/parts/browse',
        name: 'BrowseParts',
        component: BrowseParts,
        props: true,
        children: [
          {
            name: 'BrowseHeads',
            path: 'heads',
            component: RobotHeads,
          },
          {
            name: 'BrowseArms',
            path: 'arms',
            component: RobotArms,
          },
          {
            name: 'BrowseTorso',
            path: 'torso',
            component: RobotTorso,
          },
          {
            name: 'BrowseBase',
            path: 'bases',
            component: RobotBases,
          },
        ],
      },
      {
        path: '/parts/:partType/:id',
        name: 'Parts',
        component: PartInfo,
        props: true,
        beforeEnter(to, from, next) {
          const { id } = to.params;
          const isValid = Number.isInteger(Number(id));
          next(isValid);
        },
      },
      {
        name: 'Cart',
        path: '/cart',
        component: ShoppingCart,
      },
    ],
  },
);
