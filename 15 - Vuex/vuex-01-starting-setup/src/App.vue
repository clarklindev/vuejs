<template>
  <base-container v-if="loginStatus" title="Vuex">
    <p>the counter: <the-counter></the-counter></p>
    <p>favorite value:<favorite-value></favorite-value></p>
    <button @click="addOne">add 10</button>
    <Change-counter></Change-counter>
  </base-container>

  <base-container title="auth">
    <user-auth></user-auth>
  </base-container>

</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue';
import ChangeCounter from './components/ChangeCounter.vue';
import FavoriteValue from './components/FavoriteValue.vue';
import UserAuth from './components/UserAuth.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue,
    UserAuth
  },
  
  methods:{
    addOne(){
      // this.$store.commit('increase', {value: 10});

      //alternate syntax
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10
      // });

      //using the action
      this.$store.dispatch({
        type: 'increase',
        value: 10
      })
    }
  },
  computed: {
    // counter(){
    //     // return this.$store.state.counter
    //     return this.$store.getters.finalCounter
    // }
    ...mapGetters(["loginStatus"])
  }
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
</style>