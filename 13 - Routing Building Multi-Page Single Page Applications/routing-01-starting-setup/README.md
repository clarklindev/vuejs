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

## Navigating with router-link

```vue
<!-- TheNavigation.vue -->
<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
```

- router-link are actually `<a>` tags

```css
<style>
a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
```

## Styling Active Links

- reflecting which tab is active
- difference between `router-link-active` and `router-link-exact-active`
  - `router-link-exact-active` - exact match (fully matching) to active path
  - `router-link-active` - applied to any navigation item which contains a part of the currently active route

```css
a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

- you can customize 'router-link-active' EG. to 'active'

```vue
<!-- main.js -->
const router = createRouter({ linkActiveClass:'active' })
```

```css
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

## Programmatic Navigation

- this.$router

```
this.$router.push('/teams');
this.$router.back();
this.$router.forward();
```

## Passing Data with Route Params (Dynamic Segments)

- :teamId -> { path: '/teams/:teamId', component:TeamMembers}

```js
<!-- main.js -->
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/teams', component:TeamsList
        },
        {
            path:'/users', component:UsersList
        },
        { path: '/teams/:teamId', component:TeamMembers}
    ]
});
```

- then in TeamMembers component we can access this :teamId

### this.$route.path

- this.$route.path;

### this.$route.params

- using `this.$route.params` eg. `this.$route.params.teamId;`

```vue
<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  components: {
    UserItem,
  },
  data() {
    return {};
  },
  created() {
    this.$route.params.teamId;
  },
};
</script>
```
