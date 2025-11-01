<template>
  <section class="container">
    <h2>{{ user.name }} {{ user.age }}</h2>
  </section>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  // data() {
  //   return {
  //     userName: 'Maximilian',
  //   };
  // },
  setup() {
    // const uName = ref('Maximilian');
    // const uAge = ref(31);
    const user = ref({
      name: 'Maximilian',
      age: 32,
    });

    const user2 = reactive({
      name: 'Tony',
      age: 30,
    });

    setTimeout(function () {
      // uName.value = 'Max';
      // uAge.value = 32;
      user.value.name = 'Max';
      user.value.age = 32;

      user2.name = 'Tona';
      user2.age = 50;
    }, 2000);

    return { user: user, user2: user2 };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
