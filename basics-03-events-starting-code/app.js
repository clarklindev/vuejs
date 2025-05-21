const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    minus(num) {
      this.counter = this.counter - num;
    },
    setName(event, lastName) {
      this.name = event.target.value + " " + lastName;
    },
    submitForm(event) {
      alert("submitted");
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
    rightClicked() {
      alert("you right clicked");
    },
  },
});

app.mount("#events");
