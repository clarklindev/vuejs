<template>
  <section>
    <base-card>
      <h2>Register as a coach now</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  data() {
    return {};
  },
  components: {
    CoachForm,
  },

  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to register coach.');
      }
    },
  },
};
</script>
