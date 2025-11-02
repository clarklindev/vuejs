# 19 - The Composition API - Replacing the Options API

- we have a `setup()` function instead of `data()`, `methods`, `computed`, `watch`

## Replacing data with refs

- so instead of data(){ } property, you create a ref
- a ref is a reactive object
- you update via .value
- you need to return an object of the values you want to expose to the template

```vue
<template>
  <h2>{{ userName }}</h2>
</template>

<script>
import { ref } from "vue";

export default{
    const uName = ref('Maximilian');

    setTimeout(function(){
        uName.value = 'Max';
    }, 2000);

    return {userName: uName};
}
</script>
```

## Building reactive Objects

### ref objects

- so you can group refs as an ref object
- then you return the whole user object
- the template accesses the props

```vue
<template>
  <section class="container">
    <h2>{{ user.name }} {{ user.age }}</h2>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const user = ref({
      name: "Maximilian",
      age: 32,
    });
    return { user: user };
  },
};
</script>
```

### using reactive

- the difference is ref works with anything, but `reactive()` ONLY works with objects
- `reactive` doesnt wrap it with an object that you have to access values via `.value.` which is what happens with `ref`
- with `reactive`, you access the object props via a proxy but it makes it so that you can access the props directly (like a regular js object)

```vue
<template>
  <section class="container">
    <h2>{{ user.name }} {{ user.age }}</h2>
  </section>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const user = reactive({
      name: "Maximilian",
      age: 32,
    });

    setTimeout(function () {
      user.name = "Max";
      user.age = 50;
    }, 2000);

    return { user: user };
  },
};
</script>
```

## Reactivity A Deep Dive / toRefs()

- the object is reactive but the values are not thats why with setup(), you always return the reactive object (not just the reactive object's properties which would be like taking a snapshot)
- you can check if an object/value is reactive with `import { isReactive, isRef } from "vue";`
- you can make values inside an reactive object also reactive with `toRefs`
- you give toRefs() an object and it turns all property values into refs

```js
import { isReactive, isRef, toRefs } from "vue";

const uAge = ref(31);
const user = reactive({
  name: "Max",
  age: 31,
});
console.log(isRef(uAge)); //true
console.log(isReactive(user)); //true

const userRefs = toRefs(user);

return { user: user, userName: userRefs.name, age: userRefs.age };
```

## Replacing methods with Regular Functions

- instead of 'methods', you define other functions inside setup()
- you return functions in setup() to expose them

```vue
<script>
export default {
  setup() {
    //...
    function setNewAge() {
      user.age = 32;
    }
    return { setAge: setNewAge };
  },
};
</script>
```

## Replacing Computed Properties with the computed Function

- `import { computed } from 'vue';`
- a computed property is just a ref (but ONLY readonly)

```vue
<template>
  <p>{{ userName }}</p>
</template>
<script>
import { computed } from "vue";

export default {
  setup() {
    const uName = computed(function () {
      return firstName.value + " " + lastName.value;
    });

    return { userName: uName };
  },
};
</script>
```

## Two-Way-Binding and the Composition API

- you can still use v-model="" and bind to a ref

```vue
<template>
  <section class="container">
    <h2>{{ user.name }} {{ user.age }}</h2>
    <h2>{{ userName }}</h2>
    <button @click="setAge">Change age</button>
    <div>
      <!-- <input type="text" placeholder="first name" @input="setFirstName" />
      <input type="text" placeholder="last name" @input="setLastName" /> -->
      <input type="text" placeholder="first name" v-model="firstName" />
      <input type="text" placeholder="last name" v-model="lastName" />
    </div>
  </section>
</template>

<script>
import { ref, reactive, computed } from "vue";

export default {
  setup() {
    const firstName = ref("");
    const lastName = ref("");

    return {
      user: user,
      user2: user2,
      userName: uName,
      setAge: setNewAge,
      // setFirstName,
      // setLastName,
      firstName,
      lastName,
    };
  },
};
</script>
```

## Working with Watchers

- watch() takes 2 arguments
- the first arg is the dependencies of watch() (when watch() should be called)
- the second arg is the actual function to be called -> gets 2 arguments (newValue, oldValue)

```js
import { watch } from "vue";

const uAge = ref(31);

watch(uAge, function (newValue, oldValue) {
  console.log("old age: ", oldValue);
  console.log("new age:", newValue);
});

const uName = computed(function () {
  return firstName.value + " " + lastName.value;
});
```

### watching multiple values

- note: with multiple dependencies, the function receives `newValues, oldValues` and the value
  in newValues/oldValues depends on the order of the dependencies eg. `[uAge, uName]`

```js
watch([uAge, uName], function (newValues, oldValues) {
  console.log("old age: ", oldValues[0]);
  console.log("new age:", newValues[0]);

  console.log("old name:", oldValues[1]);
  console.log("new name: ", newValues[1]);
});
```

## How To Use Template Refs

- template refs
- with composition api, there is no reference to `this` in functions
- you create the ref in setup()
- with ref created, `lastNameInput.value` refers to the input and we call .value to get inputs value

```vue
<template>
  <input type="text" placeholder="last name" ref="lastNameInput" />
  <button @click="setLastName">set last name</button>
</template>

<script setup>
const lastNameInput = ref(null);
const lastName = ref("");

function setLastName() {
  // lastName.value = this.$refs.lastNameInput.value; //options api
  lastName.value = lastNameInput.value.value; //composition api, using the ref directly
}

return { lastNameInput, setLastName };
</script>
```

## Components, Props & The Composition API

- you can mix options and composition API

### options API (the way we know up to now)

```vue
<!-- src/components/UserData.vue -->
<template>
  <h2>{{ userName }}</h2>
  <h3>{{ age }}</h3>
</template>

<script>
export default {
  props: ["firstName", "lastName", "age"],
  computed: {
    userName() {
      return this.firstName + "" + this.lastName;
    },
  },
};
</script>
```

### UserData.vue but with Composition API

- setup() receives `props` as a prop
- setup() also receives `context`
- NOTE: we also dont need to return 'age' from setup(), its received as a prop and used directly in template

```vue
<!-- src/components/UserData.vue -->

<template>
  <h2>{{ userName }}</h2>
  <h3>{{ age }}</h3>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["firstName", "lastName", "age"],
  setup(props) {
    const uName = computed(function () {
      return props.firstName + " " + props.lastName;
    });
    return { userName: uName };
  },
};
</script>
```

### App uses composition API

```vue
<!-- App.vue -->
<template>
  <user-data
    :first-name="firstName"
    :last-name="lastName"
    :age="age"
  ></user-data>
</template>
<script>
import UserData from "./components/UserData.vue";

export default {
  components: { UserData },
  setup() {
    return {
      user: user,
      user2: user2,
      userName: uName,
      age: uAge,
      setAge: setNewAge,
      // setFirstName,
      // setLastName,
      firstName,
      lastName,
      lastNameInput,
      setLastName,
    };
  },
};
</script>
```

## Emitting Custom Events

- with composition api, setup receives `context` too: `setup(props, context)`
- context:
  - attrs - any fallthrough attributes eg. defining a `class` on `<user-data class="test">` and its not a defined as `props`
    - NOTE: fallthrough behavior doesnt work if your template has multiple root nodes
  - emit - can emit a custom event
  - slots - slots gives you access to slot data

```vue
<!-- COMPOSITION API -->
<script>
import { computed } from "vue";

export default {
  props: ["firstName", "lastName", "age"],
  setup(props, context) {
    const uName = computed(function () {
      return props.firstName + " " + props.lastName;
    });

    // this.$emit('save-data', 1);
    context.emit("save-data", 1);

    return { userName: uName };
  },
};
</script>
```

## Working with Provide Inject

- when you want to work with provide/inject,
- instead of forwarding age as prop to `<user-data>`

### options API using provide

```vue
<!-- App.vue -->
<template>
  <user-data
    :first-name="firstName"
    :last-name="lastName"
    class="test"
  ></user-data>
</template>

<script>
export default {
  provide() {
    age: this.age;
  },
};
</script>
```

### Composition API

- `import {provide} from 'vue';`

```vue
<!-- App.vue -->
<script>
import { provide } from "vue";

export default {
  setup() {
    provide("userAge", uAge);
  },
};
</script>
```

```vue
<!-- src/components/UserData.vue -->
<template>
  {{ age }}
</template>

<script>
import { inject } from "vue";

export default {
  // inject: [],
  setup(props, context) {
    const age = inject("userAge");

    return { age };
  },
};
</script>
```
