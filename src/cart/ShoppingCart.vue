<template>
  <div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td>{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="salediv">
      <h2 class="saleheader">You saved money on these robots</h2>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in saleItems" :key="index">
            <td>{{robot.head.title}}</td>
            <td>{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  computed: {
    cart() {
      return this.$store.state.robot.cart;
    },
    saleItems() {
      return this.$store.getters['robot/cartSaleItems'];
    },
  },
};
</script>

<style scoped>
tr, th {
  text-align: left;
  padding: 5px;
  padding-right: 150px;
}
.cost {
  text-align: right;
}
.salediv {
    margin-top: 50px;
}
.saleheader {
    color: red;
}

</style>
