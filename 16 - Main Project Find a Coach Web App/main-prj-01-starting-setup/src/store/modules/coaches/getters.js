export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    console.log('state.coaches: ', state.coaches);
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId); //if one of the coaches has id same as userId
  },
};
