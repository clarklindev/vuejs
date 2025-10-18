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
