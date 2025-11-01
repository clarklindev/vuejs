# 18. Optimizing & Deploying Vue Apps

- see `16-17 - Main Project Find a Coach Web App AND authentication AND optimization` which has updated to include
  optimization with lazy-loading

## Optimization Using Asynchronous Components

- refactoring for "lazy loading"
- using `defineAsyncComponent()`
- eg. dialog component

```js
import { defineAsyncComponent } from "vue";

const BaseDialog = defineAsyncComponent(() =>
  import("./components/ui/BaseDialog.vue")
);
```

- also in router.js can lazy load routes

```js
// router.js
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const CoachDetail = defineAsyncComponent(() =>
  import("./pages/coaches/CoachDetail.vue")
);

const CoachRegistration = defineAsyncComponent(() =>
  import("./pages/coaches/CoachRegistration.vue")
);

const ContactCoach = defineAsyncComponent(() =>
  import("./pages/requests/ContactCoach.vue")
);

const RequestsReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestsReceived.vue")
);

const UserAuth = defineAsyncComponent(() =>
  import("./pages/auth/UserAuth.vue")
);
```

## Building the Project For Production

- package.json

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
}
```

```sh
npm run build
```

- produces `dist/`

## Deploying a Vue App

- can use any static site hosting
- tutorial uses Firebase hosting

```
npm i -g firebase-tools
```

### login firebase

```
firebase login
```

### init firebase on project

```
firebase init
```

- select hosting
- select existing firebase project
- what do you want to use as your public directory? `dist`
- configure as a single-page app (re-write all urls to /index.html) `y` let vue route handle all paths

### deploy project

```
firebase deploy
```
