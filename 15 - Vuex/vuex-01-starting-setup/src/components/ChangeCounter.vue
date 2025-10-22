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
            this.$store.commit('increment')
        }
    }
}
</script>