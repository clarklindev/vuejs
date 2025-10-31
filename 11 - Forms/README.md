## Working with v-model Modifiers and Numbers

### v-model

- when you read a number from a form, v-model uses the type of the input eg. if its a number, it stays a number (browser console outputs numbers in blue)

#### v-model modifiers

- .number - if input type was a 'string', you can force vue to convert to number eg. v-model.number="userAge"
- .lazy - change how vue updates the bound property eg. on every key-stroke or at a lower frequency
- .trim - remove excess whitespace before and after

#### refs

- when you use: `this.$refs.ageInput.value` on input, value will always be a string (ie. no automatic type conversion) (browser console outputs strings in black)

## v-model and Dropdowns

```vue
<template>
<select id="referrer" name="referrer" v-model="referrer">
</template>
```

## Using v-model with Checkboxes & Radiobuttons

- for checkbox and radio put `v-model` on every `input` will create a group.
- need to add `value` attributes: value=""
- starting value should is an array
- reset to empty array

### single checkbox

- initial value is true/false
- bind with v-model

```vue
<div class="form-control">
    <input type="checkbox" id="confirm-terms" name="confirm-terms" v-model='confirm'/>
    <label for="confirm-terms">agree to terms of use?</label>
</div>
```

## Adding Basic Form Validation

## Using v-model on Custom Components

- note - receives `modelValue` as prop and emits `update:modelValue`

```vue
<!-- RatingControl.vue -->
<template>
  <ul>
    <li :class="{ active: modelValue === 'poor' }">
      <button type="button" @click="activate('poor')">poor</button>
    </li>
    <li :class="{ active: modelValue === 'average' }">
      <button type="button" @click="activate('average')">average</button>
    </li>
    <li :class="{ active: modelValue === 'great' }">
      <button type="button" @click="activate('great')">great</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],

  methods: {
    activate(option) {
      this.$emit('update:modelValue', option);
    },
  },
};
</script>
```

- TheForm.vue passes rating as v-model

```vue
<template>
  <div class="form-control">
    <!-- using v-model='' is same as :model-value="" @update:modelValue="" -->
    <rating-control v-model="rating"></rating-control>
  </div>
</template>
```
