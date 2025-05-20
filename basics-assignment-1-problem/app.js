const app = Vue.createApp({
  data() {
    return {
      name: `<i>Clark</i>`,
      age: 40,
      imageUrl: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/250px-Google_Images_2015_logo.svg.png`,
    };
  },
  methods: {
    getName() {
      return this.name;
    },
    ageIn5Years() {
      return this.age + 5;
    },
    favoriteNumber() {
      return Math.random();
    },
  },
});
app.mount(`#assignment`);
