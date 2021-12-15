<template>
    <div :key="task.id" v-for="task in allTasks" :class="[task.reminder ? 'reminder' : '', 'task']">
        <Task :task="task"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Task from "./Task";

    export default {
        name: 'Tasks',
        computed: mapGetters(['allTasks']),
        components:{
            Task,
        },
    }
</script>

