<template>
    <h2>Sign up</h2>
        <form @submit.prevent="onSubmit" v-show="!success">
            <div class="form-control">
                <label>Username:</label>
                <input type="text" v-model="username" placeholder="Pseudo">
            </div>
            <div class="form-control">
                <label>Mail:</label>
                <input type="mail" v-model="mail" placeholder="Mail">
            </div>
            <div class="form-control">
                <label>Password:</label>
                <input type="password" v-model="password" >
            </div>
            <input type="submit" value="Sign up" class="btn btn-block" />
        </form>
        <div v-show="success">
            <p>You are now successfully signed-up</p>
        </div>
    <router-link to="/">Go back</router-link>
</template>

<script>
    import {mapActions} from 'vuex';

    export default{
        name: "Signup",
        data(){
            return{
                success: false,
                username:'',
                mail:'',
                password:''
            }
        },
        methods: {
            ...mapActions['Signup'],
            onSubmit(){
                // TODO : better validation
                if(!this.username || !this.mail || !this.password){
                    alert('Please fill in all the fields ');
                    return;
                }
                const newUser = {
                    username: this.username,
                    mail: this.mail,
                    password: this.password,
                }
                this.Signup(newUser);
                this.success = true;
            }
        }
    }
</script>