export default {
  registerCoach(context, data) {
    //get the object attributes correct to match db
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    context.commit('registerCoach', coachData);
  },
};
