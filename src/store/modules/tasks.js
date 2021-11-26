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
    async updateTask({commit}, updTask){
        const res = await fetch("api/tasks/" + updTask.id, {
            method: "PUT",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask)
        });
        const data = await res.json();
        commit('updateTask', data);

    },
    // async addTask({commit},task){
    //     const res = await fetch("api/tasks", {
    //         method: 'POST',
    //         headers:{
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(task)
    //     });
    //     const data = await res.json();
    //     this.tasks = [...this.tasks, data];
    // },
};
const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,
    updateTask: (state, updTask) =>{
        const index = state.tasks.findIndex(task => task.id === updTask.id);
        if(index !== -1){
            state.tasks.splice(index, 1, updTask);
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}