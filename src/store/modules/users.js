const state = {
    user:{
        isLoggedIn: false,
        data: {}
    },
    accessToken: "blop",

};
const getters = {
    getUser: (state) => {
        return state.user
    },
    getAccessToken: (state) =>{
        return state.accessToken
    }
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

        if(data.message){
            alert(data.message);
        }else{
            commit('LoggedIn', data);
        }
    },
    async Logout({commit}){
        commit('LoggedOut');
    }
};
const mutations = {
    LoggedIn(state, data){
        state.user = {isLoggedIn: true, data: data.user};
        state.accessToken = data.accessToken;
        },
    LoggedOut: (state) => state.user = {isLoggedIn: false, data: {}}
};

export default {
    state,
    getters,
    actions,
    mutations
}