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
