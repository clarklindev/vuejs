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
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  props: ['firstName', 'lastName'],
  setup(props, context) {
    onBeforeMount(function () {
      console.log('onBeforeMount');
    });
    onMounted(function () {
      console.log('onMounted');
    });
    onBeforeUpdate(function () {
      console.log('onBeforeUpdate');
    });
    onUpdated(function () {
      console.log('onUpdated');
    });
    onBeforeUnmount(function () {
      console.log('onBeforeUnmount');
    });
    onUnmounted(function () {
      console.log('onUnmounted');
    });

    const age = inject('userAge');

    const uName = computed(function () {
      return props.firstName + ' ' + props.lastName;
    });

    // this.$emit('save-data', 1);
    context.emit('save-data', 1);

    return { userName: uName, age };
  },
};
</script>
