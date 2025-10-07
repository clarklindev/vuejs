## section 2 - basics

- import into html

```html
<script src="https://unpkg.com/vue@3.4.9/dist/vue.global.js"></script>
```

- const app = Vue.createApp({}).mount("#user-goal");

```js
const app = Vue.createApp({
  data() {
    return {
      courseGoal: "finish the course and learn vue",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return "learn vue";
      } else {
        return "master vue";
      }
    },
  },
}).mount("#user-goal");
```

- use data interpoliation between html tags `{{}}`
  - data(),
  - methods: {}
- use `v-bind:href` for html attributes eg. <a v-bind:href="vueLink">
- functions - if you define methods, you call it like a {{ method() }}

### Working with Data inside of a Vue App

- from methods refer to data() attributes via `this`

### Outputting Raw HTML Content with v-html

- BUT if it is an html string...use `v-html`

### Events & Methods

- `v-on:click="add"`

### Using the Native Event Object

- methods by default receive in methods "event" -> event.target.value

### Using the Native Event Object (passing event AND your own arguments)

- if you need the event AND to pass a value:

```html
<input type="text" v-on:input="setName($event, 'something')" />
```

then in javascript - it can be the first param

```js
methods: {
  setName(event, lastName);
}
```

### Exploring Event Modifiers

- method has event which you call `event.preventDefault()`

```html
<form v-on:submit="submitForm">
  <input type="text" />
  <button>Sign up</button>
</form>
```

- vs. event modifier
- form handler .prevent is a modifier for form `<form v-on:submit.prevent="submitForm">`

```html
<form v-on:submit.prevent="submitForm">
  <input type="text" />
  <button>Sign up</button>
</form>
```

- modifiers for reacting to mouse right-click only

```html
<button v-on:click.right="reduce(5)">Reduce</button>
```

- key modifier
- v-on:keyup.enter

```html
<input
  v-on:input="setName($event, 'surname')"
  v-on:keyup.enter="confirmInput"
  type="text"
/>
```

### v-once

- binding should only happen once

```html
<p v-once>Starting counter: {{counter}}</p>
```

### data binding + event binding = two way binding

- `v-bind:value="name"`

```html
<input
  type="text"
  v-bind:value="name"
  v-on:input="setName($event, 'Schwarzmüller')"
/>
```

- v-model directive

- 2-way binding
- replace with `<input type="text" v-model="name" />`

### computed properties

- when calling a computed property, you call it like {{fullname}} not {{ fullname() }}

- vue is aware of the dependencies of computed properties, caches value, only recalculate and reevaluate if dependency changed.
- only use methods when you want to recaculate a method when anything on a page changes (rarely the case)
- you still bind events to methods (NOT to computed properties)
- use computed properties to output

```js
const app = Vue.createApp({
  computed: {
    fullname() {
      if (this.name === "") {
        return "";
      }
      return this.name + " " + "Schwarzmüller";
    },
  },
  //...
});
```

```html
<p>Your Name: {{ fullname }}</p>
```

### watchers

- A function that runs automatically when a watched data or computed property changes.
- Defined inside a watch option e.g., watch: { name(newValue, oldValue){} }
- a watcher automatically gets the last value of data or computed property as an argument
- Useful when you want to perform side effects based on data changes, not compute values.

Examples:

- Reset a counter when it exceeds 50.
- Send an HTTP request when data changes.
- Trigger a timer or perform async actions.

### v-bind and v-on Shorthands

- shorthand for 'v-on:' is @

```html
<button @click=""></button>
```

- shorthand for 'v-bind:' is to drop the 'v-bind' and just have the colon

### dynamic styling with inline styles

```html
<div
  class="demo"
  v-bind:style="{borderColor: boxCSelected ? 'red' : '#CCC'}"
  @click="boxSelected('C')"
></div>
```

### Adding CSS Classes Dynamically

- option 1 - using ternarary expression

```html
<div
  v-bind:class="{boxASelected ? 'demo active': 'demo'}"
  @click="boxSelected('B')"
></div>
```

- option 2 - use an object and add properties where property names are the css classes and values are true/false or truthy/falsy indicating whether class should be added

```html
<div
  class="demo"
  v-bind:class="{active: boxASelected}"
  @click="boxSelected('A')"
></div>
```

### Classes & Computed Properties

- moving the classes to the computed properties

```html
<div class="demo" v-bind:class="boxAClasses" @click="boxSelected('A')"></div>
```

```js
const app = Vue.createApp({
  //...
  computed: {
    boxAClasses() {
      return { active: this.boxASelected };
    },
  },
  //...
});

app.mount("#styling");
```

### Dynamic Classes Array Syntax

- using array syntax

```html
<div
  v-bind:class="['demo', {active: boxBSelected}]"
  @click="boxSelected('B')"
></div>
```

---

## 03 - Rendering Conditional Content & Lists

### Rendering Content Conditionally

### v-if, v-else and v-else-if

```html
<p v-if="goals.length === 0">
  No goals have been added yet - please start adding some!
</p>
<ul v-else>
  <li>Goal</li>
</ul>
```

### Using v-show Instead Of v-if

- with v-show, it only adds a 'display:none' (show/hide) - doesnt remove from DOM

```html
<p v-show="goals.length === 0">NO GOAL</p>
```

### Rendering Lists of Data

```html
<li v-for="goal in goals">{{goal}}</li>
```
