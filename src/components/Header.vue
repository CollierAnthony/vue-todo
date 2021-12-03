<template>
    <div class="authentication">
        <h2 v-if="getUser.isLoggedIn">Hello {{ getUser.data.username }}</h2>
        <nav v-if="!getUser.isLoggedIn">
            <router-link to="/signup" v-show="SignupPage">sign up</router-link>
            <router-link to="/login" v-show="LoginPage">Login</router-link>
        </nav>
    </div>
    <header>
        <h1>{{ title }}</h1>
        <Button v-show="homePage" @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task' " :color="showAddTask ? 'red' : 'green'"/>
    </header>
</template>

<script>
    import Button from './Button'
    import {mapGetters} from 'vuex';

    export default{
        name: 'Header',
        props: {
            title: String,
            showAddTask: Boolean
        },
        components:{
            Button
        },
        computed:{
            ...mapGetters([
                'getUser',
            ]),
            homePage(){
                if(this.$route.path === "/"){
                    return true;
                }
                return false;
            },
            SignupPage(){
                if(this.$route.path === "/signup"){
                    return false;
                }
                return true;
            },
            LoginPage(){
                if(this.$route.path === "/login"){
                    return false;
                }
                return true;
            },
        }

    }
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .authentication{
        display: flex;
        justify-content: space-between;

    }
    .authentication a{
        margin-left: 10px;
    }
</style>