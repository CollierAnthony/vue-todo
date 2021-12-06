<template>
    <div @dblclick="onDblClick(task)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
            <div v-if="getUser.isLoggedIn" >
                <i @click="toggleModifyTask" class="fas fa-pen"></i>
                <i @click="deleteTask(task._id)" class="fas fa-times"></i>
            </div>
        </h3>
        <p>{{ task.day }}</p>
        <div v-show="showModifyTask">
            <form @submit.prevent="modifyTask(task)"  >
                <div class="d-flex justify-between">
                    <div class="d-inline-block">
                        <label> Change title :</label><br>
                        <input type="text" v-model="newText" name="newTitle" placeholder="Modify Title" />
                    </div>
                    <div class="d-inline-block">
                        <label> Change Day :</label><br>
                        <input type="text" v-model="newDay" name="newDay" placeholder="Modify Day & Time" />
                    </div>
                </div>

                <input type="submit" value="Modify task" class="btn btn-block" />
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default{
        name: 'Task',
        props: {
            task: Object
        },
        data() {
            return{
                showModifyTask: false,
                newText: this.task.text,
                newDay: this.task.day,
            }
        },
        computed: {
            ...mapGetters([
                'getUser',
            ]),
        },
        methods: {
            ...mapActions(['updateTask', 'deleteTask']),
            onDblClick(task){
                if(this.$store.state.users.user.isLoggedIn){
                    const updTask = {
                        _id: task._id,
                        text: task.text,
                        day: task.day,
                        reminder: !task.reminder
                    }
                    this.updateTask(updTask);
                }
            },
            toggleModifyTask(){
                this.showModifyTask = !this.showModifyTask;
            },
            modifyTask(task){
                if(this.newText && this.newDay){
                    const updTask = {
                        _id: task._id,
                        text: this.newText,
                        day: this.newDay,
                        reminder: task.reminder
                    }
                    this.updateTask(updTask);
                }else{
                    alert('The two fields are required');
                    return;
                }
            }
        }

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
    .d-flex{
        display: flex;
    }
    .justify-between{
        justify-content: space-between;
    }
    .d-inline-block{
        display: inline-block;
    }
</style>