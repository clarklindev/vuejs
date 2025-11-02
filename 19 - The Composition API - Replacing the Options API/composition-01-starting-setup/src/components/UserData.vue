<template>
  <h2>{{ userName }}</h2>
  <h3>{{ age }}</h3>
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
  setup(props) {
    const uName = computed(function () {
      return props.firstName + ' ' + props.lastName;
    });
    return { userName: uName };
  },
};
</script>
