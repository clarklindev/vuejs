<template>
  <base-dialog :show="!!error" title="An error occured" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>you havent received any request yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
        this.isLoading = false;
      } catch (err) {
        this.error = err.message || 'failed to fetch messages';
        this.isLoading = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
