import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'

Vue.use(Vuex);

Vue.mixin({
    computed : {
        ...mapState([
            'connected'
        ])
    },
});

export default new Vuex.Store({
    state: {
        connected : false,
        showNav : true
    },
    mutations: {
        isConnected (state, data) {
            state.isConnected = data;
            },
        showNav (state, data) {
            state.showNav = data;
        }
    },
    actions: {

    }
});

