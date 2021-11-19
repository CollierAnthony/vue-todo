<template>
    <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
            <div>
                <i @click="toggleModifyTask" class="fas fa-pen"></i>
                <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
            </div>
        </h3>
        <p>{{ task.day }}</p>
        <div v-show="showModifyTask">
            <ModifyTask :task="task" @modify-task="modifyTask" />
        </div>
    </div>
</template>
<script>
    import ModifyTask from "./ModifyTask";

    export default{
        name: 'Task',
        props: {
            task: Object
        },
        components:{
            ModifyTask
        },
        data() {
            return{
                showModifyTask: false,
            }
        },
        methods: {
            toggleModifyTask(){
                this.showModifyTask = !this.showModifyTask;
            },
            modifyTask(modifiedTask){
                this.$emit('modify-task', modifiedTask);
            }
        },
    }
</script>

<style scope>
    .fa-times {
        color: red;
    }
    .fa-pen{
        color: blue;
        margin-right: 5px;
    }
    .task {
        background: #f4f4f4;
        margin: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }
    .task.reminder {
        border-left: 5px solid green;
    }
    .task h3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>