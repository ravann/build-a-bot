import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: [],
    parts: null,
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
      console.log(`Cart : ${state.cart}`);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
  },
  actions: {
    getParts({ commit }) {
      axios.get('http://localhost:8081/api/parts')
        .then((result) => commit('updateParts', result.data))
        .catch(console.error);
    },
    addRobotToCart(content, robot) {
      const { state, commit } = content;
      const cart = { ...state.cart, robot };
      return axios.post('http://localhost:8081/api/cart', cart)
        .then(() => {
          commit('addRobotToCart', robot);
        });
    },
  },
};
