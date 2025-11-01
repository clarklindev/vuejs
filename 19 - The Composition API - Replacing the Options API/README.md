# 19 - The Composition API - Replacing the Options API

- we have a `setup()` function instead of data()

## Replacing data with refs

- so instead of data(){ } property, you create a ref
- a ref is a reactive object
- you update via .value
- you need to return an object of the values you want to expose to the template

```vue
<template>
  <h2>{{ userName }}</h2>
</template>

<script>
import { ref } from "vue";

export default{
    const uName = ref('Maximilian');

    setTimeout(function(){
        uName.value = 'Max';
    }, 2000);

    return {userName: uName};
}
</script>
```
