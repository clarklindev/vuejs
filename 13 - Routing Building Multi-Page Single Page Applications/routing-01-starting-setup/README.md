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

### Using Nested Routes

- adding a `children` prop on a routes path
- then in `TeamsList.vue` you need to add another `<router-view></router-view>`

```js
// main.js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamsList,
      children: [
        { path: ':teamId', component: TeamMembers, props: true }, // /teams/t1
      ],
    },
  ],
});
```

## More Fun with Named Routes & Location Objects

- using named routes
- when a big app has deeply nested multiple nested routes, construction of links like in TeamsItem.vue
  `return '/teams/' + this.id;` can get cumbersome,
- router-link has 2 features:
  - :to can also take an object
  - you can name your routes...eg. name: 'team-members',

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: TeamsList,
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        }, // /teams/t1
      ],
    },
  ],
});
```

- then update

```js
export default {
  props: ['id', 'name', 'memberCount'],
  computed: {
    teamMembersLink() {
      // return '/teams/' + this.id;
      return {
        name: 'team-members',
        params: {
          teamId: this.id,
        },
      };
    },
  },
};
```

- using `name:` routes allow you to update the route `path` while your code still references the 'name'

## Using Query Params

- if router-link to="" takes an object form `<router-link :to="teamMembersLink">View Members</router-link>`
- you can add `query` prop eg: `query: {sort: 'asc'}`
- which will create url like: `http://localhost:8080/teams/t1?sort=asc`
- then in `<team-members>` you can access the query parameter via `this.$route.query`
- note: query parameters are NOT provided as props

```js
<script>
export default {
  props: ['id', 'name', 'memberCount'],
  computed:{
    teamMembersLink(){
      return {
        name: 'team-members',
        params:{
          teamId: this.id
        },
        query: {
          sort: 'asc'
        }
      };
      // this.$router.push({name:'team-members', params:{teamId:this.id}});
    }
  }
};
</script>
```

## Rendering Multiple Routes with Named Router Views

- can have multiple router views on same level if you make them named router views
- you can then load multiple components per route then send them to different router-views
  - eg. if you have:
  - teams/TeamsFooter.vue
  - users/UsersFooter.vue

```vue
<!-- App.vue -->
<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>
```

- because App.vue has `<router-view>` and a named `<router-view name="footer">` you can specify in to routes, the `components:` which target the `default` and eg `footer` router-view

```js
// main.js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        }, // /teams/t1
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
```

## Controlling Scroll Behavior

- controlling the scroll behavior
  - when you are scrolled to bottom of page and click something and page content up top updates, but you have to manually scroll to top... you can make it scroll automatically to the top
  - add a `scrollBehavior` prop - this method is called wheneever page changes..
- this makes it so if you use the browser back button, it will go to savedPosition, else if you click on new section, it will scroll to top

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
```

## Introducing Navigation Guards

- functions automatically called by vue-router when an navigation action starts
- you can also pass next(false); to cancel navigation
- you can pass string or object to next()

```js
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);

  // next(false);
  //if check prevents an infinite loop
  if (to.name === 'team-members') {
    next();
  } else {
    next({ name: 'team-members', params: { teamId: 't2' } });
  }
});
```

## Diving Deeper Into Navigation Guards

- you can set beforeEach() on individual routes using beforeEnter(){}

```js
<!-- Main.vue -->
const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path:'/users', components:{
        default: UsersList,
        footer: UsersFooter
    }, beforeEnter(to, from, next){
      console.log('users beforeEnter');
      console.log(to, from);
      next();
    }},
  ]
});
```

- if you dont want to add it at route level, you can add it to component
- the order of execution is first at global level, then route level, then component level

```vue
<!-- UsersList.vue -->
<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Component beforeRouteEnter');
    console.log(to, from);
    next();
  },
};
</script>
```

## beforeRouteUpdate

- if you updating eg. teams then the component will be re-used, Vue can call `beforeRouteUpdate()`
  - eg. TeamMembers.vue

```js
// TeamMembers.vue
export default {
  //...
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
```
