<template>
  <div>
    <h2>managed goals</h2>
    <input type="text" ref="goal" />
    <button @click="setGoal">Set Goal</button>
    <teleport to="body">
      <error-alert v-if="inputIsInvalid">
        <h2>Input is invalid</h2>
        <p>Please enter at least a few characters...</p>
        <button @click="confirmError">ok</button>
      </error-alert>
    </teleport>
  </div>
</template>

<script>
import ErrorAlert from "./ErrorAlert.vue";

export default {
  components: {
    ErrorAlert,
  },
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    setGoal() {
      const enteredValue = this.$refs.goal.value;
      if (enteredValue === "") {
        // alert("Input must not be empty");
        this.inputIsInvalid = true;
      }
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>
