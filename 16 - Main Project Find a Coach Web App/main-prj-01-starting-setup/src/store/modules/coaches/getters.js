export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        console.log('state.coaches: ', state.coaches);
        return state.coaches && state.coaches.length > 0;
    }
}