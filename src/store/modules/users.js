const state = {
    user:{
        isLoggedIn: false,
        data: {}
    },

};
const getters = {
    getUser: (state) => state.user
};

const actions = {
    async Signup({commit}, user){
        const res = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
    },

    async Login({commit}, user){
        const res = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        commit('LoggedIn', user);
    }
};
const mutations = {
    LoggedIn: (state, user) => state.user = {isLoggedIn: true, data: user}
};

export default {
    state,
    getters,
    actions,
    mutations
}