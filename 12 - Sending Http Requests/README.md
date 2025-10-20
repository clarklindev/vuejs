## Connecting a backend

- sending http requests

## Adding a Backend

- using Firebase for backend (https://console.firebase.google.com/)
- create account
- add new project
- realtime database -> create database
- start in test mode

## Sending a POST Request to Store Data

- note: firebase urls end with the database to create and then `.json`

```
fetch('https://vue-http-demo-a8932-default-rtdb.firebaseio.com/surveys.json');
```

## Request to store data

```js
fetch("https://vue-http-demo-a8932-default-rtdb.firebaseio.com/surveys.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: this.enteredName,
    rating: this.chosenRating,
  }),
});
```

## Using Axios Instead Of fetch()

### axios

```js
import axios from 'axios'; // at the start of your <script> tag, before you "export default ..."
...
axios.post('https://vue-http-demo-85e9e.firebaseio.com/surveys.json', {
  name: this.enteredName,
  rating: this.chosenRating,
});
```

- with Axios, you have to write less code.
- It automatically sets the Content-Type header for you
- it also automatically converts the body data to JSON.
