<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>
        {{ part.description }}
    </div>
  </div>
</template>

<script>
import getPartsMixin from './getPartsMixin';

export default {
  name: 'PartInfo',
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  mixins: [getPartsMixin],
  computed: {
    part() {
      console.log(`Part Type : ${this.partType}; id: ${this.id}`);
      const p = this.parts[this.partType].find((part) => part.id === +this.id);
      return p;
    },
  },
};
</script>

<style>

</style>
