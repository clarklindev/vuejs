## Creating & Using a Store

- install vuex

```
npm i vuex@next
```

```js
// main.js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
});

app.use(store);
```

- then you get access to the store with `$store.state.`

```vue
<!-- App.vue -->
<template>
  <base-container title="Vuex">
    <h3>{{ counter }}</h3>
    <button @click="addOne">add 1</button>
  </base-container>
</template>

<script>
import BaseContainer from "./components/BaseContainer.vue";

export default {
  components: {
    BaseContainer,
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    addOne() {
      this.$store.state.counter++;
    },
  },
};
</script>
```

## Introducing Mutations - A Better Way of Changing Data

- vuex has mutations -> clearly defined methods to update the state
- components trigger mutations that update state

```js
// main.js
const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 2;
    },
  },
});
```

- then you trigger the mutation from multiple places eg. `ChangeCounter.vue` and `App.vue`
- you use `this.$store.commit('increment')` and inside is a name of the mutations 'increment'

```vue
<!-- ChangeCounter.vue -->
<template>
  <button @click="addOne">add 1</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addOne() {
      // this.$store.state.counter++;
      this.$store.commit("increment");
    },
  },
};
</script>
```

```vue
<!-- App.vue -->
<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <button @click="addOne">add 1</button>
    <Change-counter></Change-counter>
  </base-container>
</template>

<script>
import BaseContainer from "./components/BaseContainer.vue";
import TheCounter from "./components/TheCounter.vue";
import ChangeCounter from "./components/ChangeCounter.vue";

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
  },

  methods: {
    addOne() {
      this.$store.commit("increment");
    },
  },
};
</script>
```

## Passing Data to Mutations with Payloads

- see mutations:{} -> increase(state, payload)

```js
<!-- main.js -->
const store = createStore({
    state(){
        return {
            counter: 0
        }
    },
    mutations:{
        increment(state){
            state.counter = state.counter + 2;
        },
        increase(state, payload){
            state.counter = state.counter + payload.value;
        }
    }
});
```

- then when you call it, you pass the payload as the 2nd parameter

```vue
<!-- App.vue -->
<script>
export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
  },

  methods: {
    addOne() {
      this.$store.commit("increase", { value: 10 });

      //alternate syntax
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10
      // });
    },
  },
};
</script>
```
