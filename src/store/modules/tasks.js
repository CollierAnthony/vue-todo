const state = {
    tasks: []
};

const getters = {
    allTasks: (state) => state.tasks,
};
const actions = {
    async fetchTasks({commit}){
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();
        commit('setTasks', data);
    },
    async updateTask({commit}, updTask){
        const res = await fetch("http://localhost:3000/tasks/" + updTask._id, {
            method: "PATCH",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask)
        });
        const data = await res.json();
        commit('updateTask', data);

    },
    async deleteTask({commit}, _id){
        if(confirm('Are you sure ?')) {
            const res = await fetch(`http://localhost:3000/tasks/${_id}`, {
                method: "DELETE"
            });
            commit('deleteTask',_id);
        }
    },
    async addTask({commit},task){
        const res = await fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                // 'Authorization': 'Bearer'+
            },
            body: JSON.stringify(task)
        });
        const data = await res.json();
        commit('newTask', data);
    },

};
const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,
    newTask: (state, task) => state.tasks.push(task),
    updateTask: (state, updTask) =>{
        const index = state.tasks.findIndex(task => task._id === updTask._id);
        if(index !== -1){
            state.tasks.splice(index, 1, updTask);
        }
    },
    deleteTask: (state, _id) => state.tasks = state.tasks.filter(todo => todo._id !== _id )
};

export default {
    state,
    getters,
    actions,
    mutations
}