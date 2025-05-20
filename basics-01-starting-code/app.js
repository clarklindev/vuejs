const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "finish the course",
      courseGoalB: "<h3>Master vue</h3>",
      vueLink: "https://vuejs.org",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});
app.mount(`#user-goal`);
