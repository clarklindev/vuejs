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
