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
  - same data, methods, components:{}
