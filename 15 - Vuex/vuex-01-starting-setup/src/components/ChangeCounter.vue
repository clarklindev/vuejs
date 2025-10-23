<template>
  <button @click="inc">add 2</button>
  <button @click="increase({ value: 11 })">add 11</button>
</template>

<script>
import {mapActions} from 'vuex';

export default{

    data(){
        return{

        }
    },
    methods:{
        // addOne(){
        //     // this.$store.state.counter++;

        //     //call mutation        
        //     // this.$store.commit('increment')

        //     //call action
        //     this.$store.dispatch('increment');
        // }

        // ...mapActions(['increment', 'increase'])

        //using custom action name mapping
        ...mapActions({
            inc:'increment',
            increase: 'increase'
        })
    }
}
</script>