<template>
    <section>
        FILTER
    </section>
    <section>
        <div class="controls">
            <button>refresh</button>
            <router-link to="/register">register a coach</router-link>
        </div>
        <ul v-if="hasCoaches">
            <li v-for="coach in filteredCoaches" :key="coach.id">
                {{ coach.firstName }}
            </li>
        </ul>
        <h3 v-else>No coaches found</h3>
    </section>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        filteredCoaches(){
            return this.$store.getters['coaches/coaches']   
        },
        hasCoaches(){
            return this.$store.getters['coaches/hasCoaches']
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>