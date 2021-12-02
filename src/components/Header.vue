<template>

    <header>
        <h1>{{ title }}</h1>
        <router-link to="/signup" v-show="SignupPage">sign up</router-link>
        <Button v-show="homePage" @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task' " :color="showAddTask ? 'red' : 'green'"/>
    </header>
</template>

<script>
    import Button from './Button'
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
        },

    }
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>