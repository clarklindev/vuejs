# 16. Main Project Find a Coach Web App

<img
src='assets/003-Planning the Data Requirements.png'
alt=''
width=600
/>

<img
src='assets/004-Planning the Layout Components.png'
alt=''
width=600
/>

```
pnpm i vuex vue-router
```

## Registering as a Coach - The Form

- NOTE: for the form to be 'reusable' we dont hook it up to state but rather just emit the form data and let the parent component handle the data passed to it.

## Adding Coaches to Vuex

- from store/modules/coaches/actions.js we are accessing root state via a getter `id: context.rootGetters.userId,`
- NOTE: mutations:{} and getters:{} functions receive state,
- NOTE: actions:{} functions receive context
- You don’t need to use the namespace (coaches/registerCoach) in your context.commit('registerCoach', coachData) call because your action and mutation are defined in the same module (i.e. inside the same namespace context).

### CoachRegistration.vue

- dispatch the action in CoachRegistration
- because its called (not from within the module), note the namespace: `this.$store.dispatch("coaches/registerCoach", data);`
- if you call an action, use `this.$store.dispatch()`
- if you call a mutation eg. from action (action methods receive an object) use `context.commit()`

```vue
<!-- CoachRegistration.vue -->
<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";

export default {
  data() {
    return {};
  },
  components: {
    CoachForm,
  },

  methods: {
    saveData(data) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>
```

## Storing Requests (Messages) With Vuex

- NOTE: in ContactCoach.vue, we are calling the action (and using the url's id to get coachId) this is because ContactCoach is a child route of CoachDetail and we set `props:true` which allows us to receive the dynamic route as a prop
- OR we can access the dynamic prop from the url via `this.$route.params.id`

```js
this.$store.dispatch("requests/contactCoach", {
  coachId: this.$route.params.id,
  email: this.email,
  message: this.message,
});
```

## Outputting Incoming Requests (Messages)

- showing all requests for the active coach

## Filtering Requests for the Active Coach

- showing only the current coach (we get this id from root userId)
- we receive: `state, getters, rootState, rootGetters` in our getters
- from rootGetters we have access to `userId` getter
- then in hasRequests, we update to only check the filtered requests

```js
// store/requests/getters
export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
```
