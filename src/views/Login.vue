<template>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit" v-show="!getUser.isLoggedIn">
        <div class="form-control">
            <label>Username:</label>
            <input type="text" v-model="username" placeholder="Username">
        </div>
        <div class="form-control">
            <label>Password:</label>
            <input type="password" v-model="password" >
        </div>
        <input type="submit" value="Sign up" class="btn btn-block" />
    </form>
    <div v-show="getUser.isLoggedIn">
        <p>You are now successfully signed-in</p>
    </div>
    <router-link to="/">Go back</router-link>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default{
        name: "Login",
        data(){
            return{
                username:'',
                password:''
            }
        },
        computed:{
            ...mapGetters(['getUser'])
        },
        methods: {
            ...mapActions(['Login']),
            onSubmit(){
                const user = {
                    username: this.username,
                    password: this.password,
                }
                this.Login(user);
            }
        }
    }
</script>