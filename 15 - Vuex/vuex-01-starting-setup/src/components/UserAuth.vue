<template>
    <button v-if="!loginStatus" @click="login">login</button>
    <button v-if="loginStatus" @click="logout">logout</button>
    <p>{{ testAuth }}</p>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default{

    methods: {
        ...mapActions(["login", "logout"]),
    },
    computed: {
    // counter(){
    //     // return this.$store.state.counter
    //     return this.$store.getters.finalCounter
    // }
    ...mapGetters(["loginStatus", 'testAuth']),
  },
}

</script>