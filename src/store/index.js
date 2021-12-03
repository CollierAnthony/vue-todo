import Vuex from 'vuex';
import tasks from './modules/tasks';
import users from './modules/users';
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    modules:{
        tasks,
        users
    },
    plugins: [createPersistedState()]
});