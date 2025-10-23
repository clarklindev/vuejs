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

## Using Mapper Helpers

- `import { mapGetters } from 'vuex';`
- so instead of creating functions for computed:{} which access the getters of the $store
- use `mapGetters` takes an array, and inside you list as string all the getters names you want to have access to as computed properties

```vue
<!-- TheCounter.vue -->
<template>
  <!-- <h3>{{ counter }}</h3> -->
  <h3>{{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    // counter(){
    //     // return this.$store.state.counter
    //     return this.$store.getters.finalCounter
    // }
    ...mapGetters(["finalCounter"]),
  },
};
</script>
```

### using mapped actions

- instead of creating methods that just dispatch from the $store, you can use mapActions which works similarly to `mapGetters`
- you can then call mapActions directly

```vue
<template>
  <button @click="increment">add 2</button>
  <button @click="increase({ value: 11 })">add 11</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    // addOne(){
    //     // this.$store.state.counter++;

    //     //call mutation
    //     // this.$store.commit('increment')

    //     //call action
    //     this.$store.dispatch('increment');
    // }
    ...mapActions(["increment", "increase"]),
  },
};
</script>
```

### calling custom action names

- if you want your own custom action names, instead of passing an array, can pass an object,
- NOTE: you can do the same with mapGetters...
- NOTE: `<the-counter>` uses getter `finalCounter` which multiplies state counter by 2
- NOTE: `<favorite-value>` uses getter `normalizedCounter` which uses `getters.finalCounter`
- but otherwise the other buttons are just updating the state counter values

```vue
<template>
  <button @click="inc">add 2</button>
  <button @click="increase({ value: 11 })">add 11</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    // addOne(){
    //     // this.$store.state.counter++;

    //     //call mutation
    //     // this.$store.commit('increment')

    //     //call action instead (allows async)
    //     this.$store.dispatch('increment');
    // }
    ...mapActions({
      inc: "increment",
      increase: "increase",
    }),
  },
};
</script>
```

## Example Adding More State
