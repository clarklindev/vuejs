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

- so you can call mutations with `.commit()`
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

## Introducing Getters - A Better Way Of Getting Data

- just as you use mutations to set data, you should use getters:{} to get data
- getters are functions that receive state and other getters

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
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  getters: {
    finalCounter(state, getters) {
      return state.counter * 2;
    },

    //receives state, getters
    normalizedCounter(_, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 100;
      }
      return finalCounter;
    },
  },
});
```

- then in the component, use the getter

```vue
<template>
  <h3>{{ counter }}</h3>
  <p>we do more...</p>
</template>

<script>
export default {
  computed: {
    counter() {
      // return this.$store.state.counter
      // return this.$store.getters.finalCounter;
      return this.$store.getters.normalizedCounter;
    },
  },
};
</script>
```

## Running Async Code with Actions

- when you have async code that needs time before it completes
- problem is mutations must be synchronous (without pause)
- solution: components should trigger actions that then in turn trigger mutations

### actions

- here, the `actions` object has an `increment` function that gets `context`
- `context` has a `commit()` method -> it commits a mutation
- you can pass a second argument as a payload or an object
- NOTE: actions are allowed to run asynchronous code
- NOTE: you should update the code to run the action (allows async code) instead of mutation

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
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizedCounter(_, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 100;
      }
      return finalCounter;
    },
  },
  actions: {
    increment(context) {
      setTimeout(function () {
        context.commit("increment");
      }, 2000);
    },
    increase(context, payload) {
      context.commit("increase", payload);
    },
  },
});
```

- then in App.vue where you should now use the action...
- use `this.$store.dispatch()`

```vue
<!-- App.vue -->
<script>
export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue,
  },

  methods: {
    addOne() {
      // this.$store.commit('increase', {value: 10});

      //alternate syntax
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10
      // });

      //using the action
      this.$store.dispatch({
        type: "increase",
        value: 10,
      });
    },
  },
};
</script>
```

## Understanding the Action Context

- you can call `dispatch` from `context`
- you should not manipulate the state from inside the action, use a mutation
