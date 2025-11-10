# 20 - Reusing Functionality Mixins & Custom Composition Functions

- reusing code in the options & compositions API
- reducing code duplication by allowing re-using code

  - mixins (when using Options API)
  - custom compositions functions (when using Composition API)

- in the project example, theres a modal/alert thats used in 2 places (different template)
- you can reuse `html structure / styling` AND `logic + events`

```vue
<!--  UserAlert.vue-->
<template>
  <div class="backdrop" @click="closeDialog"></div>
  <dialog open>
    <header>
      <h2>{{ title }}</h2>
    </header>
    <div>
      <slot></slot>
    </div>
    <menu>
      <button @click="closeDialog">Close</button>
    </menu>
  </dialog>
</template>

<script>
export default {
  props: ["title"],
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
```

### Using Mixins

- the reusable logic is in UserAlert.vue
  - same data, methods, computed:{}, watch:{}
- so cant have components:{} in a mixin

## Understanding Mixin Merging

- when you merge in a mixin, `component option` vs `mixin`, the component options properties take preference if there is a clash with the same data property

## Global Mixins

- global mixins affect all components in the app, not just the components where the they are imported
- eg. analytics, or logging functionality

```js
//src/mixins/logger.js
export default {
  mounted() {
    console.log("mounted!");
  },
};
```

```js
// main.js
import { createApp } from "vue";

import App from "./App.vue";
import LoggerMixin from "./mixins/logger.vue";

const app = createApp(App);

app.mixin(LoggerMixin);

app.mount("#app");
```

## Disadvantages of Mixins

- its not always obvious where something is happening..

---

## Composition API - Custom Hooks Composables & The Composition API

- hooks are also called `Custom Hooks Composables`

```js
// hooks/alert.js
import { ref } from "vue";

export default function useAlert() {
  const alertIsVisible = ref(false);

  function showAlert() {
    alertIsVisible.value = true;
  }
  function hideAlert() {
    alertIsVisible.value = false;
  }

  return {
    alertIsVisible,
    showAlert,
    hideAlert,
  };
}
```

- then use it in eg. AddUser.vue

```vue
<template>
  <user-alert v-if="alertIsVisible" title="Add a User?" @close="hideAlert">
    <p>Do you want to continue with adding a user?</p>
  </user-alert>
  <section>
    <h2>Add a User</h2>
    <button @click="showAlert">Add User</button>
  </section>
</template>

<script>
import UserAlert from "./UserAlert.vue";
import useAlert from "../hooks/alert.vue";

export default {
  components: {
    UserAlert,
  },
  setup() {
    const [alertIsVisible, showAlert, hideAlert] = useAlert();

    return { alertIsVisible, showAlert, hideAlert };
  },
};
</script>
```

## More Custom Composition Functions

- custom hooks can also receive parameters

```js
const [alertIsVisible, showAlert, hideAlert] = useAlert(true);
```

## Why Hooks Composables Beat Mixins

## Example Creating a Search Hook

- `reuse-07-example-starting-project/` `ProjectsList` and `UserList` have common functionality
- creating the `useSearch()` hook

```js
// search.js
import { ref, computed, watch } from "vue";

export function useSearch(items, searchProp) {
  const enteredSearchTerm = ref("");
  const activeSearchTerm = ref("");

  const availableItems = computed(function () {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items) {
      filteredItems = items;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
}
```

## Custom Hooks Gotchas

- useSearch() updated to take in props, specifically a ref and make sure its not null either or empty array
- UserList.vue -> update props.users to be a ref with `const { users } = toRefs(props);`

## More Thoughts on Custom Hooks Composables

- instead of updating the ref's value call the function from the hook

```js
watch(user, function () {
  updateSearch("");
});
```
