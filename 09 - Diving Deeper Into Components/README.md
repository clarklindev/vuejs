# diving deeper into components

- component registration & styling
- slots + dynamic components
- naming & folder structure

## making components Local Components

- using 'components'

```js
//App.vue
import TheHeader from "./components/TheHeader.vue";
import UserInfo from "./components/UserInfo.vue";
import BadgeList from "./components/BadgeList.vue";

export default {
  components: {
    "the-header": TheHeader,
    "user-info": UserInfo,
    "badge-list": BadgeList,
  },
};
```

## Scoped Styles

- using ' scoped' to localize styling

```
<style scoped></style>
```

## Introducing Slots

- add slot in BaseCard.vue
- use `<slot></slot>`

```vue
<template>
  <div><slot></slot></div>
</template>
```

- pass-in data from UserInfo.vue

```vue
<template>
  <section>
    <base-card>
      <header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </header>
      <p>{{ infoText }}</p>
    </base-card>
  </section>
</template>
```

## named slots

- says... put this in header slot

```vue
//UserInfo.vue
<template v-slot:header></template>
```

- or the default slot

```vue
//BadgeList.vue and UserInfo.vue
<template v-slot:default></template>
```

- the other content will automatically go in the other slot... but best practice is to use default slot

```vue
// BaseCard.vue
<template>
  <div>
    <header><slot name="header"></slot></header>
    <slot></slot>
  </div>
</template>
```

## Slot Styles & Compilation

- even if you send markup into a slot, the style is for the template before its sent into the component not where you send to.

## More on Slots

- slots that dont receive content can render default content

```vue
<slot name="header">
  <h2>The default</h2>
</slot>
```

- with `$slots` you can use that data to see if you receive information for the slot and then render it conditionally only if there is data
- this.$slots.header
- this.$slots.default

BaseCard.vue

```vue
<template>
  <div>
    <header v-if="$slots.header">
      <slot name="header">
        <!-- <h2>The default</h2> -->
      </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$slots.header);
  },
};
</script>
```

### shortcut for v-slot:

instead of

```vue
<template v-slot:default></template>
```

you can write #

```vue
<template #default></template>
```

## Scoped Slots

- we may want to make the contents of `<li>` customizable..
- eg you want to pass the 'template' into the component from the outside (eg from App.vue)
- scoped slots let you pass data from 'inside' the component where you define the slot eg. CourseGoals.vue,
  to the component where you pass the markup for the slot eg. App.vue
- on the slot, add a prop (eg. `item`) and bind it `:item=goal`
- what you set on the slot, is now accessible from where you pass data for that slot eg. App.vue
- so we are making `item` (which is assigned value 'goal') accessible to App.vue

```vue
// CourseGoals.vue
<template>
  <ul>
    <li v-for="goal of goals" :key="goal">
      <slot :item="goal" another-prop="..."></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      goals: ["Finish the course", "Learn Vue"],
    };
  },
};
</script>
```

- in App.vue, add a `<template>` around the slot markup
- on `<template>` use `v-slot` or `#` (shorthand) on default or named slot, and define anyname of your choice... eg. slotProps - which will be an object where all the props you define on the slot `<slot :item="goal"></slot>` are merged in.
- now you can use `slotProps` inside the App.vue template to access any attribute eg. `item` defined on the `<slot>` eg. slotProps.item `<h2>{{ slotProps.item }}</h2>`

```vue
//App.vue
<template>
  <course-goals>
    <template #default="slotProps">
      <h2>{{ slotProps.item }}</h2>
      <p>{{ slotProps["another-prop"] }}</p>
    </template>
  </course-goals>
</template>
```

## Dynamic Components

- using component element: `<component :is=''>` and is is assigned the component to use

```
<component :is="selectedComponent"></component>`
```

```vue
// App.vue
<template>
  <div>
    <the-header></the-header>

    <button @click="setSelectedComponent('active-goals')">active goals</button>
    <button @click="setSelectedComponent('managed-goals')">
      Managed goals
    </button>
    <!-- <active-goals v-if="selectedComponent === 'active-goals'"></active-goals>
    <managed-goals v-if="selectedComponent === 'managed-goals'"></managed-goals> -->
    <component :is="selectedComponent"></component>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import ActiveGoals from "./components/ActiveGoals.vue";
import ManagedGoals from "./components/ManagedGoals.vue";

export default {
  components: {
    "the-header": TheHeader,
    ActiveGoals,
    ManagedGoals, //will be usable as 'course-goals'
  },
  data() {
    return {
      selectedComponent: "active-goals",
      activeUser: {
        name: "Maximilian Schwarzmüller",
        description: "Site owner and admin",
        role: "admin",
      },
    };
  },
  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp;
    },
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
```

## Keeping Dynamic Components Alive

- if you type into the input and change `selectedComponent` the component is actually destroyed and input is lost

```vue
//ManagedGoals.vue
<template>
  <div>
    <h2>managed goals</h2>
    <input type="text" />
  </div>
</template>
```

### keep-alive

- solution is to wrap `<keep-alive>` around the dynamic `<component>`

```vue
//App.vue
<template>
  <keep-alive>
    <component :is="selectedComponent"> </component>
  </keep-alive>
</template>
```

### Applying What We Know & A Problem

- we create an error-alert component
- styling happens inside `<error-alert>` component while the template is in `ManagedGoals.vue`

```vue
<template>
  <error-alert v-if="inputIsInvalid">
    <h2>Input is invalid</h2>
    <p>Please enter at least a few characters...</p>
    <button @click="confirmError">ok</button>
  </error-alert>
</template>
```

### Teleporting Elements

- the problem with having the `<error-alert>` inline with the rest of the html is that its semmantically incorrect (and accessibility), its supposed to be an overlay on the whole page

#### teleport

- wrap the content to be teleported elsewhere with `<teleport>`
- teleport wants a `to` prop pointing to a css selector - selecting an html element on entire page where content should actually be added to in html markup eg. `<teleport to="body">`
- means render this directly in `body` element

```vue
//ManagedGoals.vue
<template>
  <teleport to="body">
    <error-alert v-if="inputIsInvalid">
      <h2>Input is invalid</h2>
      <p>Please enter at least a few characters...</p>
      <button @click="confirmError">ok</button>
    </error-alert>
  </teleport>
</template>
```

```

```
