<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <collapsible-component>
        <div class="preview-content">
          <div class="top-row">
            <img :src="remoteHost + selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="remoteHost + selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="remoteHost + selectedRobot.torso.src"/>
            <img :src="remoteHost + selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="remoteHost + selectedRobot.base.src"/>
          </div>
        </div>
      </collapsible-component>
      <button class="add-to-cart" @click="addToCart()">
        Add to Cart
      </button>
    </div>
    <div class="robot-name">
    {{selectedRobot.head.title}}
    <span v-if="selectedRobot.head.onSale" class="sale">Sale!!</span>
    </div>

    <div class="top-row">
      <partSelector :parts="availableParts.heads" type="head"
        @partSelected = "part => selectedRobot.head = part"
      />
    </div>
    <div class="middle-row">
      <partSelector :parts='availableParts.arms' type="leftarm"
        @partSelected = "part => selectedRobot.leftArm = part"
      />
      <partSelector :parts="availableParts.torsos" type="torso"
        @partSelected = "part => selectedRobot.torso = part"
      />
      <partSelector :parts="availableParts.arms" type="rightarm"
        @partSelected = "part => selectedRobot.rightArm = part"
      />
    </div>
    <div class="bottom-row">
      <partSelector :parts="availableParts.bases" type="base"
        @partSelected = "part => selectedRobot.base = part"
      />
    </div>
  </div>
</template>

<script>

import partSelector from './PartSelector.vue';
import CollapsibleComponent from '../shared/CollapsibleComponent.vue';

export default {
  name: 'RobotBuilder',
  components: { partSelector, CollapsibleComponent },
  data() {
    return {
      remoteHost: 'http://localhost:8081',
      addedToCart: false,
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torso: {},
        base: {},
      },
    };
  },
  created() {
    this.$store.dispatch('robot/getParts');
  },
  mixins: [],
  beforeRouteLeave(to, from, next) {
    const { cart } = this.$store.state.robot;
    if (cart.length > 0) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      const response = confirm('You have not added your robot to cart, are you sure you want to leave?');
      next(response);
    }
  },
  computed: {
    availableParts() {
      return this.$store.state.robot.parts;
    },
  },
  methods: {
    torsoBorderClass() {
      return this.selectedRobot.head.onSale ? 'center-sale-border' : '';
    },
    headBorderStyle() {
      if (this.selectedRobot.head.onSale) {
        return { border: '3px solid red' };
      }
      return '';
    },
    addToCart() {
      this.addedToCart = true;
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost
        + robot.rightArm.cost + robot.torso.cost + robot.base.cost;
      this.$store.dispatch('robot/addRobotToCart', { ...robot, cost })
        .then(() => this.$router.push('/cart'));
    },
  },
};
</script>

<style scoped>
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: relative;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.center-sale-border {
  border: 3px solid red;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
