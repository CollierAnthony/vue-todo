<template>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit" v-show="!success">
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
    <div v-show="success">
        <p>You are now successfully signed-in</p>
    </div>
    <router-link to="/">Go back</router-link>
</template>

<script>
    import {mapActions} from 'vuex';

    export default{
        name: "Login",
        data(){
            return{
                success: false,
                username:'',
                password:''
            }
        },
        methods: {
            ...mapActions(['Login']),
            onSubmit(){

                const user = {
                    username: this.username,
                    password: this.password,
                }
                this.Login(user);
                this.success = true;
            }
        }
    }
</script>