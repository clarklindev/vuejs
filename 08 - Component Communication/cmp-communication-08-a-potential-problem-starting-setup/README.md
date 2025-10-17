### A Potential Problem

originally...

- identifies that `<knowledge-base>` acts as a 'pass-through' component for props
- it passes 'topics' and emits 'select-topic' when `<knowledge-grid>` emits 'select-topic'
- `<knowledge-grid>` emits topic when `<knowledge-element>` emits 'select-topic'
- its actually `<knowledge-element>` that emits the original event

### Provide + Inject To The Rescue

- minimize emiting and passthrough events
- at a higher level, use:

```js
// App.vue
provide() {
    return {
        topics: this.topics,
    };
},
```

- at the level you want to consume the data, use `inject: ['topics'],` inject all data you want to use.

### Provide + Inject for Functions Methods

- provide the function you want to execute lower down.. 'selectTopic'

```js
//App.vue
provide() {
    return {
      topics: this.topics,
      selectTopic: this.activateTopic,
    };
  },
```

- inject the function 'selectTopic'
- then use the function, NOTE: if provide() function 'selectTopic' signature expects props, you need to call the function passing the props

```vue
//KnowledgeElement.vue

<template>
  <li>
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>
    <button @click="selectTopic(id)">Learn More</button>
  </li>
</template>

<script>
export default {
  inject: ['selectTopic'],
  props: ['id', 'topicName', 'description'],
};
</script>
```
