<template>
  <div>
    <the-header></the-header>
    <!-- <badge-list></badge-list>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
    <course-goals></course-goals> -->
    <button @click="setSelectedComponent('active-goals')">active goals</button>
    <button @click="setSelectedComponent('managed-goals')">
      Managed goals
    </button>
    <!-- <active-goals v-if="selectedComponent === 'active-goals'"></active-goals>
    <managed-goals v-if="selectedComponent === 'managed-goals'"></managed-goals> -->
    <keep-alive>
      <component :is="selectedComponent"> </component>
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
// import UserInfo from "./components/UserInfo.vue";
// import BadgeList from "./components/BadgeList.vue";
// import CourseGoals from "./components/CourseGoals.vue";
import ActiveGoals from "./components/ActiveGoals.vue";
import ManagedGoals from "./components/ManagedGoals.vue";

export default {
  components: {
    "the-header": TheHeader,
    // "user-info": UserInfo,
    // "badge-list": BadgeList,
    // CourseGoals,
    ActiveGoals,
    ManagedGoals, //will be usable as 'course-goals'
  },
  data() {
    return {
      selectedComponent: "active-goals",
      activeUser: {
        name: "Maximilian Schwarzmüller",
        description: "Site owner and admin",
        role: "admin",
      },
    };
  },
  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp;
    },
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
