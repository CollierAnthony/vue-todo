<template>
    <div :key="task.id" v-for="task in tasks">
        <Task @modify-task="modifyTask" @toggle-reminder="$emit('toggle-reminder', task.id)" @delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>
</template>

<script>
    import Task from './Task'
    export default {
        name: 'Tasks',
        props: {
            tasks: Array
        },
        components:{
            Task
        },
        methods: {
          modifyTask(data){
              this.$emit('modify-task', data);
          }
        },
        emits:['delete-task', 'toggle-reminder', 'modify-task']
    }
</script>