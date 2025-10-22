## Understanding CSS Animations

- an alternative to animating with transition is defining animation keyframes
- dynamically add `animate` class depending on `animatedBlock()`

```html
<div class="block" :class="{animate:animatedBlock}"></div>
```

- 'forwards' says the animation should keep final key state as the new state

```css
.animate{
  /* transform: translateX(-150px); */
  animation: slide-fade 0.3s ease-out forwards;
}

@keyframes slide-fade{
  0% {
    transform: translateX(0) scale(1);
  }
  70%{
    transform: translateX(-120px) scale(1.1);
  }
  100%{
    transform: translateX(-150px) scale(1);
  }
}
</style>
```

## Why Is Just CSS Not Enough

- vue can help with animating into view and dissapearance by delaying dissapearance

## Playing CSS Animations with Vue's Help

- you can wrap the element that should be animated with `<transition>`
- `<transition>` should only have 1 direct child

### element mounted

- transition adds utility classes to the element
  - .v-enter-from{}
  - .v-enter-active{}
  - .v-enter-to{}

### element unmounted

- transition adds utility classes to the element
  - v-leave-from{}
  - v-leave-active{}
  - v-leave-to{}

## Using the Transition Component

- then you can define styles for these utility classes in css code

```css
/* entering */
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* leaving */
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```

## CSS Animations with the Transition Component

- using animation and @keyframes instead

```css
<style>
.v-enter-from{
  /* opacity:0;
  transform: translateY(-30px); */
}

.v-enter-active{
  /* transition: all 0.3s ease-out; */
  animation: slide-scale 0.3s ease-out;
}

.v-enter-to{
  /* opacity:1;
  transform:translateY(0); */
}

.v-leave-from{
  /* opacity:1;
  transform:translateY(0); */
}

.v-leave-active{
  /* transition: all 0.3s ease-in; */
  animation: slide-scale 0.3s ease-out;
}

.v-leave-to{
  /* opacity:0;
  transform: translateY(30px); */
}

@keyframes slide-scale{
  0% {
    transform: translateX(0) scale(1);
  }
  70%{
    transform: translateX(-120px) scale(1.1);
  }
  100%{
    transform: translateX(-150px) scale(1);
  }
}
</style>
```

## Using Custom CSS Class Names

- if you want different transitions for different components on your page
- `<transition name="para">` - here you add your custom prefix `para` for transition classes which will then support your custom css class names

```css
<style>

.para-enter-from{
  /* opacity:0;
  transform: translateY(-30px); */
}

.para-enter-active{
  /* transition: all 0.3s ease-out; */
  animation: slide-scale 0.3s ease-out;
}

.para-enter-to{
  /* opacity:1;
  transform:translateY(0); */
}

.para-leave-from{
  /* opacity:1;
  transform:translateY(0); */
}

.para-leave-active{
  /* transition: all 0.3s ease-in; */
  animation: slide-scale 0.3s ease-out;
}

.para-leave-to{
  /* opacity:0;
  transform: translateY(30px); */
}
</style>
```

### incase you want to replace the entire class name

- so instead, you can use completely custom class names

```vue
<transition enter-to-class="" enter-active-class="" enter-from-class="">
    <p></p>
</transition>
```

## Example Animating a Modal

- we are setting up `transition name="modal"` but animation is not happening because in `<base-modal>` - the template has 2 elements at the same level and `<transition>` wants one direct child element
- the `<base-modal>` has 2 direct child, the `backdrop` and `dialog`
- if you remove the backdrop, you will see the animation works.

```html
<!-- App.vue -->
<transition name="modal">
  <base-modal @close="hideDialog" v-if="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
</transition>
```

### to fix: remove transition and put it inside base-modal

```html
<!-- App.vue -->
<base-modal @close="hideDialog" v-if="dialogIsVisible">
  <p>This is a test dialog!</p>
  <button @click="hideDialog">Close it!</button>
</base-modal>
```

- but if `<transition>` is part of the template that is added/removed with v-if="dialogIsVisible" it wont have any effect.
- so instead of v-if use :open="dialogIsVisible"
- note: you can reverse an animation `.modal-leave-active { animation: modal 0.3s ease-in reverse; }`

```html
<!-- App.vue -->
<base-modal @close="hideDialog" :open="dialogIsVisible">
  <p>This is a test dialog!</p>
  <button @click="hideDialog">Close it!</button>
</base-modal>
```

```vue
<!-- BaseModal -->
<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>
  <transition name="modal">
    <dialog open v-if="open">
      <slot></slot>
    </dialog>
  </transition>
</template>

<style>
.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}
</style>
```

## Transitioning Between Multiple Elements

- there is one exception when you are allowed to have more than one child inside `<transition>` - is when you guarantee that only one child is added to the DOM at the same time
- NOTE: instead of using 2x v-if you need to use v-if/v-else

### mode="out-in"

- AND transition can also take mode="in-out" or mode="out-in" to decide which element is animated first

```vue
<!-- App.vue -->
<div class="container">
  <transition name="fade-button" mode="out-in">
    <button @click="showUsers" v-if="!usersAreVisible">show users</button>
    <button @click="hideUsers" v-else>hide users</button>
  </transition>
</div>

<style>
.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
</style>
```

## Using Transition Events

- can trigger methods during animation cycle (these functions receive a prop - the element on which the function runs)

  - @before-enter="beforeEnter"
  - @enter
  - @after-enter - can listen for after enter animation finishes
  - @before-leave="beforeLeave"
  - @leave="leave"
  - @after-leave="afterLeave"

```vue
<template>
  <div class="container">
    <transition
      name="para"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <p v-if="paragraphIsVisible">This is only sometimes visible...</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
</template>

<script>
export default {
  methods: {
    beforeEnter(el) {
      console.log("beforeEnter");
      console.log(el);
    },
    enter(el) {
      console.log("enter");
      console.log(el);
    },
    afterEnter(el) {
      console.log("afterEnter");
      console.log(el);
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      console.log(el);
    },
    leave(el) {
      console.log("leave");
      console.log(el);
    },
    afterLeave(el) {
      console.log("afterLeave");
      console.log(el);
    },
  },
};
</script>
```

## Building JavaScript Transitions (instead of CSS)

- building animation with javascript requires the hooks

  - @before-enter="beforeEnter"
  - @enter="enter"
  - @after-enter="afterEnter"
  - @before-leave="beforeLeave"
  - @leave="leave"
  - @after-leave="afterLeave"

- these methods receive a second parameter, `done` which you call to signal to vue the hook is done
- there is also the `@enter-cancelled=""` and `@leave-cancelled=""`
- if enter or leave animation gets cancelled -> cancel enter interval immediately
- update by adding `enterInterval` and `leaveInterval` as data()
- NOTE: for `this` to be scoped correctly use arrow function for setInterval

```vue
<script>
export default {
  data(){
    return {
      enterInterval: null,
      leaveInterval: null
    }
  }
  methods: {
    beforeEnter(el) {
      console.log("beforeEnter");
      console.log(el);
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log("enter");
      console.log(el);
      let round = 1;
      this.enterInterval = setInterval(()=> {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    beforeLeave(el) {
      console.log("beforeLeave");
      console.log(el);
      el.style.opacity = 1;
    },
    leave(el, done) {
      console.log("leave");
      console.log(el);
      let round = 1;
      this.leaveInterval = setInterval(()=> {
        el.style.opacity = 1 - round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },

    enterCancelled(el) {
      console.log(el);
      clearInterval(this.enterInterval);
    },
    leaveCancelled(el) {
      console.log(el);
      clearInterval(this.leaveInterval);
    },
  },
};
</script>
```
