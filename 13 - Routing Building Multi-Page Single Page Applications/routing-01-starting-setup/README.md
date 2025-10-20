## Routing Setup

```
npm i --save vue-router
```

```js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});
```

## Registering & Rendering Routes

```js
// main.js
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamsList,
    },
    {
      path: '/users',
      component: UsersList,
    },
  ],
});

const app = createApp(App);
app.use(router);
```

### router-view

```js
// App.vue
<template>
  <the-navigation @set-page="setActivePage"></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>
```
