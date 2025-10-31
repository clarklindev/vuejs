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

## Sending a PUT Http Request to Store Coach Data

- using Firebase for backend
  - project: `vue-16-find-a-coach`
  - create Realtime database (test-mode)
  - https://console.firebase.google.com/project/vue-16-find-a-coach/database/vue-16-find-a-coach-default-rtdb/data

### coaches

- `CoachRegistration.vue` - send request when register as a coach
- `CoachesList.vue` - fetching all coaches
- refresh (also re-fetches)

### request

- fetch all requests
- contact coach form (send a request)

## Fetching Coach Data (GET Http Request)

- `CoachesList.vue` dispatch an action `loadCoaches` on `created()` lifecycle hook

```js
created() {
  this.loadCoaches();
},
```

## Rendering a Loading Spinner

- note: in actions, loadCoaches returns a promise from the async function,
- so when we call `loadCoaches()` method in CoachesList
- we add a data property: `isLoading: false`

```js
//pages/coaches/CoachesList.vue
loadCoaches() {
  this.$store.dispatch('coaches/loadCoaches');
},
```

## Adding Http Error Handling

- throw an error that can be handled by the component that dispatches the action
- change `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches.json` to `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches.jso`

```js
//store/modules/coaches/actions.js
async loadCoaches(context) {
  const response = await fetch(
    `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches.json`
  );

  const responseData = await response.json();
  if (!response.ok) {
    //error handling
    const error = new Error(responseData.message || 'Failed to fetch!');
    throw error;
  }
}
```

- CoachesList.vue can then catch the error and use it in the template
- create a data prop 'error'
- then use `BaseDialog.vue`

```vue
// CoachesList.vue
<template>
  <base-dialog :show="!!error" title="An error occured" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
</template>

<script>
export default {
  data() {
    return {
      //...
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches");
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = this.error.message || "Something went wrong";
      }
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>
```

## Sending Coaching Requests Http Requests

- NOTE: responseData.name will contain the id thats autogenerated by firebase
- When you use POST, Firebase returns an object with a single property, name, which contains the auto-generated ID it created for that new entry.

```js
//src/store/modules/requests/actions.js
export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to send request");
      throw error;
    }

    newRequest.id = responseData.name;

    context.commit("addRequest", newRequest);
  },
};
```

- handle the error in pages/requests/ContactCoach.vue when submitForm() is called...
- note: fetchRequests() returns responseData that is everything below the coachId in Firebase...
- which is an object with id's as keys (the keys are objects) so need to transform

```js
//src/modules/requests/actions.js
export default {
  //...

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests"
      );
      throw error;
    }

    console.log("requests responseData: ", responseData);

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
```

- so in `RequestsReceived.vue` you can call the action fetchRequests

## Caching Http Response Data

- cache data locally and only refetch after eg. a minute or after clicking refresh button
- store/modules/coaches/index add a `lastFetch` key in `state()`

```js
// store/modules/coaches/index.js
export default {
  namespaced: true,
  state() {
    return { lastFetch: null, coaches: [] };
  },
};
```

- add the mutation to set lastFetch

```js
//store/modules/coaches/mutations.js
export default {
  //...

  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
```

- call this from store/modules/coaches/actions.js

```js
export default {
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches.json`
    );
  },

  //...
  context.commit('setFetchTimestamp')
};
```

- then add shouldUpdate() in store/modules/coaches/getters.js

```js
export default {
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
```

- see loadCoaches() above..
- we add a `forceRefresh` prop
- you can pass in forceRefresh from CoachesList

```vue
<!-- pages/coaches/CoachesList.vue -->
<template>
  {/* ... */}
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)"
          >refresh</base-button
        >
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (err) {
        this.error = err.message || "Something went wrong";
      }
      this.isLoading = false;
    },
  },
};
</script>
```

## Adding Route Transitions

- transitioning router
- animating modal
- change modules/coaches/actions.js by breaking the url to show modal

- `components/ui/BaseDialog.vue`
- wrap dialog with `<transition name="dialog">`
- use eg. dialog-enter-from, dialog-leave-to css classes

```vue
<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
```

### route transitions

- App.vue

```vue
<!-- App.vue -->
<template>
  <TheHeader></TheHeader>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
```

## The Not Found Page & Summary

---

# 17. Authententication

- using real users
- login, signup, logout
- keep users logged in if they leave the page and return

## How Authentication Works in Vue Apps (or any SPA)

- restricted data -> fetching requests / creating a coach
- backend does not track whether user is logged in -> need a way to keep track of user logged in status
- step1 -> user login data sent to backend
- step2 -> backend sends back token to user -> stored in vuex or localstorage
  NOTE: (only server can validate the token)
- step3 -> token is attached to out going requests and server can validate token and then grant/deny access to restricted resource
- on user interface you want to restrict displaying certain buttons like (fetching requests button, create a coach) to only when user is logged in

## Locking Protecting Backend Resources

- update firebase (which was created in test-mode) to not grant access to all resource by updating `realtime database rules`
- COACHES
  -> read -> all can access
  -> create -> not everyone can create a coach

- REQUESTS
  -> sending requests to coaches -> all can access
  -> read -> restricted

### Firebase Realtime Database Rules

- update the firebase realtime database rules
- note: `auth` is a restricted firebase variable

- with the updated rules, localhost:8080/requests yields error: `Failed to load resource: the server responded with a status of 401 (Unauthorized)`
- same with trying to register a new coach
- sending messages should work
- with the updates to firebase rules, you need a token to access these restricted resources which is made available with login/signup

```json
{
  "rules": {
    "coaches": {
      ".read": true,
      ".write": "auth != null"
    },
    "requests": {
      ".read": "auth != null",
      ".write": true
    }
  }
}
```

## Adding an Authentication Page (Login & Signup)

- added pages/auth/UserAuth.vue

## Preparing Vuex

### firebase sign-in methods

- with firebase, build/authentication - you can set up authentication `sign-in methods` (providers)
  - enable `email/password`
  - or google
  - or facebook
  - or github
  - or twitter

### firebase auth rest API

- google search `firebase auth rest API`
- https://firebase.google.com/docs/reference/rest/auth
- these are endpoints to create a user and get a token or log an user in
  - sign up with email/password
  - sign in with email/password

## managing authentication with vuex

- NOTE: we are not going to namespace the module (ie we will merge in the state) this is because we previously managed the logged in user on the global vuex state

### Sign up with email / password

- note: from pages/auth/UserAuth.vue -> can dispatch the action from `submit()`
- http://localhost:8080/auth
- successful signup of user will add to firebase -> authentication -> `users` table

#### request payload

- DOCS - https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
- from Firebase project -> project settings -> get the `web api key`
- `POST`: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  - note the request body payload: 'email', 'password', 'returnSecureToken'

#### response payload

`idToken` - string - A Firebase Auth ID token for the newly created user.
`email` - string - The email for the newly created user.
`refreshToken` - string - A Firebase Auth refresh token for the newly created user.
`expiresIn` - string - The number of seconds in which the ID token expires.
`localId` - string - The uid of the newly created user.

```js
//store/modules/auth/actions.js
export default {
  login(context, payload) {},
  async signup(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJYfuySSxhacWZiBECg6x6hsAUOqKlc4Q",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || "Failed to authenticate");
      throw error;
    }

    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
```

```js
// store/modules/auth/mutations.js
export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
};
```

```js
//store/modules/auth/index.js
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  // namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};
```

## Better UX Loading Spinner & Error Handling

- handle thrown errors in `pages/auth/UserAuth.vue`

## Adding a Login Action & Flow

- sign in with email/password - https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
- endpoint: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
- NOTE: the only difference is the endpoint url for the action
- call when trying to login in UserAuth.vue

### Request Body Payload

Property Name Type Description
`email` - string - The email the user is signing in with.
`password` - string - The password for the account.
`returnSecureToken` - boolean - Whether or not to return an ID and refresh token. Should always be true.

### Response Payload

Property Name Type Description
`idToken` - string - A Firebase Auth ID token for the authenticated user.
`email` - string - The email for the authenticated user.
`refreshToken` - string - A Firebase Auth refresh token for the authenticated user.
`expiresIn` - string - The number of seconds in which the ID token expires.
`localId` - string - The uid of the authenticated user.
`registered` - boolean - Whether the email is for an existing account.

## Attaching the Token to Outgoing Requests

- modules/auth/mutations.js -> vuex -> we are storing the token
- we should attach this token to outgoing requests that target endpoints' resources on firebase that are protected
- give access to the token in auth/getters
- use the token:

### coaches/actions.js

- you can add a token to url request by adding: `?auth=` + token

```js
async registerCoach(context, data) {
  //...
  const token = context.getters.token;

  const response = await fetch(
    `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=`+token,
    {
      method: "PUT", //write data if it didnt exist or override
      body: JSON.stringify(coachData),
    }
  );
}
```

### requests/actions.js

- fetchRequests()

```js
async fetchRequests(context) {
  const coachId = context.rootGetters.userId;

  const token = context.rootGetters.token;

  const response = await fetch(
    `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
      token
  );
  //...
}
```

## Updating the UI Based on Auth State

- dont show `requests` or `register a coach` if not logged in. show `login` button instead
