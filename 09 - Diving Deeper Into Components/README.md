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
