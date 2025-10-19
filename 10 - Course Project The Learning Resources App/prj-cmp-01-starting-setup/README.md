## Dynamic Components & Attribute Fallthrough

- when you add props or events on custom components, by default, they fall through to the root level html element in that custom components template
- so @click falls through - BaseButton will get the click event

```vue
  <base-card>
    <base-button @click="setSelectedTab('stored-resources')"
      >Stored Resource</base-button
    >
    <base-button @click="setSelectedTab('add-resource')"
      >Add Resource</base-button
    >
  </base-card>
</template>

```

```vue
//BaseButton.vue
<template>
  <button :type="type" :class="mode">
    <slot></slot>
  </button>
</template>
```
