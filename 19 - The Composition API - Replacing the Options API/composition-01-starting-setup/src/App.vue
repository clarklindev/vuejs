<template>
  <section class="container">
    <!-- <h2>{{ user.name }} {{ user.age }}</h2>
    <h2>{{ userName }}</h2> -->
    <user-data
      :first-name="firstName"
      :last-name="lastName"
      :age="age"
    ></user-data>
    <button @click="setAge">Change age</button>
    <div>
      <!-- <input type="text" placeholder="first name" @input="setFirstName" />
      <input type="text" placeholder="last name" @input="setLastName" /> -->

      <input type="text" placeholder="first name" v-model="firstName" />
      <!-- <input type="text" placeholder="last name" v-model="lastName" /> -->
      <input type="text" placeholder="last name" ref="lastNameInput" />
      <button @click="setLastName">set last name</button>
    </div>
  </section>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
import UserData from './components/UserData.vue';

export default {
  // data() {
  //   return {
  //     userName: 'Maximilian',
  //   };
  // },
  components: { UserData },
  setup() {
    // const uName = ref('Maximilian');
    const uAge = ref(31);
    const firstName = ref('');
    const lastName = ref('');

    const lastNameInput = ref(null);

    const uName = computed(function () {
      return firstName.value + ' ' + lastName.value;
    });

    // watch(uAge, function (newValue, oldValue) {
    //   console.log('old age: ', oldValue);
    //   console.log('new age:', newValue);
    // });

    watch([uAge, uName], function (newValues, oldValues) {
      console.log('old age: ', oldValues[0]);
      console.log('new age:', newValues[0]);

      console.log('old name:', oldValues[1]);
      console.log('new name: ', newValues[1]);
    });

    const user = ref({
      name: 'Maximilian',
      age: 32,
    });

    const user2 = reactive({
      name: 'Tony',
      age: 30,
    });

    setTimeout(function () {
      // uName.value = 'Max';
      uAge.value = 32;

      user.value.name = 'Max';
      user.value.age = 32;

      user2.name = 'Tona';
      user2.age = 50;
    }, 2000);

    function setNewAge() {
      user.value.age = 32;
      uAge.value = 50;
    }

    function setLastName() {
      lastName.value = lastNameInput.value.value; //options api
    }

    // function setFirstName(event) {
    //   firstName.value = event.target.value;
    // }

    // function setLastName(event) {
    //   lastName.value = event.target.value;
    // }

    return {
      user: user,
      user2: user2,
      userName: uName,
      age: uAge,
      setAge: setNewAge,
      // setFirstName,
      // setLastName,
      firstName,
      lastName,
      lastNameInput,
      setLastName,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
