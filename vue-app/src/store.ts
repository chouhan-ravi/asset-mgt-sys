import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    actions: {
        "SOCKET_oops"(state, server) {
            Vue.toasted.global.appError({
                message: server.message
            }).goAway(5000);
        },
        "SOCKET_success"(state, server) {
            Vue.toasted.global.appSuccess({
                message: server.message
            }).goAway(5000);
        },
        "SOCKET_info"(state, server) {
            Vue.toasted.global.appInfo({
                message: server.message
            }).goAway(5000);
        },
        "SOCKET_ping"(state, server) {
            alert(server[0]);
            Vue.toasted.global.appPing({
                message: server[1]
            }).goAway(5000);
        }
    }
});