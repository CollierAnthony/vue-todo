const state = {
    tasks: []
};

const getters = {
    allTasks: (state) => state.tasks,
};
const actions = {
    async fetchTasks({state,commit, rootState}){
        const res = await fetch("http://localhost:3000/tasks", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+rootState.users.accessToken
            }
        });
        const data = await res.json();
        console.log("data");
        console.log(data);
        commit('setTasks', data);
    },
    async updateTask({state,commit, rootState}, updTask){
        const res = await fetch("http://localhost:3000/tasks/" + updTask._id, {
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ rootState.users.accessToken
            },
            body: JSON.stringify(updTask)
        });
        const data = await res.json();
        commit('updateTask', data);

    },
    async deleteTask({state,commit, rootState}, _id){
        if(confirm('Are you sure ?')) {
            const res = await fetch(`http://localhost:3000/tasks/${_id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ rootState.users.accessToken
                }
            });
            commit('deleteTask',_id);
        }
    },
    async addTask({state,commit, rootState},task){
        const res = await fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ rootState.users.accessToken
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