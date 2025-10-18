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
