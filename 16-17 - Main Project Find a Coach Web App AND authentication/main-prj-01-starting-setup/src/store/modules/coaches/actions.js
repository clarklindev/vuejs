export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    console.log('registerCoach userId:', userId);

    //get the object attributes correct to match db
    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT', //write data if it didnt exist or override
        body: JSON.stringify(coachData),
      }
    );
    console.log('registerCoach response: ', response);

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to register coach.'
      );
      throw error;
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-16-find-a-coach-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
