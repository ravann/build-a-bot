export default {
  created() {
    console.log(`Component created at ${Date.now()}`);
  },
  beforeMount() {
    console.log(`About to mount at ${Date.now()}`);
  },
  mounted() {
    console.log(`Mounted at ${Date.now()}`);
  },
  beforeUpdate() {
    console.log(`About to update at ${Date.now()}`);
  },
  updated() {
    console.log(`Updated at ${Date.now()}`);
  },
};
