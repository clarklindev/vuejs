import { createStore } from 'vuex';

import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';

import cartModule from './modules/cart/index.js';
import productModule from './modules/product/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
    modules:{
        cart: cartModule,
        product: productModule,
        auth: authModule
    }, 
    mutations: rootMutations,
    getters: rootGetters,
    actions: rootActions
});

export default store;
