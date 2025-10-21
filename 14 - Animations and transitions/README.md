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
  - \*-enter-from
  - \*-enter-active
  - \*-enter-to

### element unmounted

- transition adds utility classes to the element
  - \*-leave-from
  - \*-leave-active
  - \*-leave-to
