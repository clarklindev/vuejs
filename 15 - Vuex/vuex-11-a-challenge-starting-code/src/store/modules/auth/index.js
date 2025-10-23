import authMutations from './mutations';
import authActions from './actions';
import authGetters from './getters';

export default {
    namespaced: true,
    state(){
        return {
            isLoggedIn: false
        }
    },
    mutations: authMutations, 
    actions: authActions,
    getters: authGetters
};
