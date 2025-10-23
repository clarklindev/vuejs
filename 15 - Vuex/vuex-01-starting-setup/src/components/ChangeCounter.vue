<template>
    <button @click="addOne">add 2</button>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        addOne(){
            // this.$store.state.counter++;

            //call mutation        
            // this.$store.commit('increment')

            //call action
            this.$store.dispatch('increment');
        }
    }
}
</script>