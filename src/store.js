import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        backend: 'http://localhost:8080/api', //Development backend
        // backend: 'https://icesi-vip-alien-backend.herokuapp.com/api', //Production backend
         token: '',
        //backend: process.env.NODE_ENV=='production' ? 'https://icesi-vip-alien-backend.herokuapp.com/api' : 'http://localhost:8080/api'
    }
})
