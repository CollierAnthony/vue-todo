<template>
    <div @dblclick="onDblClick(task)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
            <div>
                <i @click="toggleModifyTask" class="fas fa-pen"></i>
                <i class="fas fa-times"></i>
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
    import {mapActions} from 'vuex';

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
            ...mapActions(['updateTask']),
            onDblClick(task){
                const updTask = {
                    id: task.id,
                    text: task.text,
                    day: task.day,
                    reminder: !task.reminder
                }
                this.updateTask(updTask);
            },
            toggleModifyTask(){
                this.showModifyTask = !this.showModifyTask;
            },
        },
    }
</script>

<style scoped >
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