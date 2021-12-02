import Vuex from 'vuex';
import tasks from './modules/tasks';
import users from './modules/users';

export default new Vuex.Store({
    modules:{
        tasks,
        users
    }
});