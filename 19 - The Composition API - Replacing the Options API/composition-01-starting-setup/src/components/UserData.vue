<template>
  <div>
    <h2>{{ userName }}</h2>
    <h3>{{ age }}</h3>
    <slot></slot>
  </div>
</template>

<!-- OPTIONS API -->
<!-- <script>
export default {
  props: ['firstName', 'lastName', 'age'],
  computed: {
    userName() {
      return this.firstName + '' + this.lastName;
    },
  },
};
</script> -->

<!-- COMPOSITION API -->
<script>
import { computed } from 'vue';

export default {
  props: ['firstName', 'lastName', 'age'],
  setup(props, context) {
    const uName = computed(function () {
      return props.firstName + ' ' + props.lastName;
    });

    // this.$emit('save-data', 1);
    context.emit('save-data', 1);

    return { userName: uName };
  },
};
</script>
