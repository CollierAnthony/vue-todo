const state = {
    user:[]
};
const getters = {};
const actions = {
    async Signup({commit}, user){
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();
        commit('newUser', data);

    }
};
const mutations = {
    newUser:(state, user) => state.user.push(user),
};

export default {
    state,
    getters,
    actions,
    mutations
}