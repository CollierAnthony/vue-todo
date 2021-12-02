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
            // async deleteTask(id){
            //     if(confirm('Are you sure ?')){
            //         const res = await fetch("api/tasks/" + id, {
            //             method: "DELETE",
            //         });
            //         res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id )) : alert('Error deleting task');
            //
            //     }
            // },
            // async modifyTask(modifiedTask){
            //     const taskToModify = await this.fetchTask(modifiedTask.id);
            //     const{text,day} = modifiedTask;
            //     const updTask ={text, day}
            //     const res = await fetch("api/tasks/" + modifiedTask.id, {
            //         method: "PUT",
            //         headers:{
            //             'Content-type': 'application/json',
            //         },
            //         body: JSON.stringify(updTask)
            //     });
            //     const data = await res.json();
            //     this.tasks = this.tasks.map((task) => task.id === modifiedTask.id ? {...task, text: data.text, day: data.day } : task);
            // },
            // async toggleReminder(id){
            //     const taskToToggle = await this.fetchTask(id);
            //     const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};
            //
            //     const res = await fetch("api/tasks/" + id, {
            //         method: "PUT",
            //         headers:{
            //             'Content-type': 'application/json',
            //         },
            //         body: JSON.stringify(updTask)
            //     });
            //
            //     const data = await res.json();
            //     this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task);
            // },


        },
        computed: mapGetters(['allTasks']),
        created(){
            this.fetchTasks();
        }
    }


</script>