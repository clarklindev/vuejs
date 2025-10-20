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

## Updating Params Data with Watchers

- trying to visit the same page path as page you are on now, but with different parameter
- eg. { path: '/teams/:teamId', component:TeamMembers }
- the solution is to watch the route for change and pass the route into loadTeamMembers()

```vue
<!-- TeamMembers.vue -->
watch:{ $route(newRoute){ this.loadTeamMembers(newRoute); } }
```

## Passing Params as Props

- up to this point TeamMembers is only loadable through routing...
- in the code we rely on this.$route -> `created()` and `watch:{$route(newRoute)}`

```vue
<!-- TeamMembers.vue -->
created(){ this.loadTeamMembers(this.$route); },
```

- instead of replying on $route, can receive `teamId` as a prop...

```vue
<script>
export default {
  inject: ['users', 'teams'],
  components: {
    UserItem,
  },
  props: ['teamId'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  methods: {
    loadTeamMembers(teamId) {
      console.log('teamId: ', teamId);
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    },
  },
};
</script>
```

### props:true

- then in main.js set props:true - which tells vue that the dynamic parameter should be passed into the component as a prop

```vue
<script>
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
    { path: '/teams/:teamId', component: TeamMembers, props: true },
  ],
});
</script>
```

## Redirecting & Catch All Routes

- directly visiting http://localhost:8080/ which has no route component
- fix: use `redirect` in routes:[]

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', redirect: '/teams' }],
});
```

### using alias

- instead of using `redirect`, you can go to the path that should load the root path and add `alias`
- NOTE: the downside is the url doesnt change...

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', redirect: '/teams' },
    { path: '/teams', component: TeamsList, alias: '/' },
    { path: '/users', component: UsersList },
    { path: '/teams/:teamId', component: TeamMembers, props: true },
  ],
});
```

### catch-all routes

- matching anything with path: '/:notFound(.\*)'

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:notFound(.*)', component: NotFound }],
});
```
