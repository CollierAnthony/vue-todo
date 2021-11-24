const state = {
    tasks: []
};

const getters = {
    allTasks: (state) => state.tasks,
};
const actions = {
    async fetchTasks({commit}){
        const res = await fetch("api/tasks");
        const data = await res.json();
        commit('setTasks', data);
    },
};
const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks
};

export default {
    state,
    getters,
    actions,
    mutations
}