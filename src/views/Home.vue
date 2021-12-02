<template>
    <div>
        <AddTask v-show="showAddTask" @add-task="addTask" />
        <Tasks />
    </div>
</template>

<script>
    import Tasks from '../components/Tasks';
    import AddTask from '../components/AddTask';
    import { mapGetters, mapActions } from 'vuex';

    export default{
        name:'Home',
        components: {
            Tasks,
            AddTask
        },
        props:{
          showAddTask: Boolean
        },
        //
        methods:{
            ...mapActions(['fetchTasks']),

        },
        computed: mapGetters(['allTasks']),
        created(){
            this.fetchTasks();
        }
    }


</script>