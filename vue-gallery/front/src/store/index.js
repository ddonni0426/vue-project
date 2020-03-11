import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js.js';
import actions from './actions.js.js';
import getters from './getters.js.js';

Vue.use(Vuex);

const state = {
    kakaoLogin: {
        code:'',
        user: "",
    },

    images: [],
}

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});