<template>
    <form @submit="modifyTask"  >
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
</template>

<script>
    export default {
        name: 'ModifyTask',
        props: {
            task: Object
        },
        data() {
            return{
                newText: this.task.text,
                newDay: this.task.day,
            }
        },
        methods: {
            modifyTask(e){
                e.preventDefault();
                if(this.newText && this.newDay){
                    var modifiedTask = {
                        id: this.task.id,
                        text: this.newText,
                        day: this.newDay
                    }
                    this.$emit('modify-task', modifiedTask);
                }else{
                    alert('The two fields are required');
                    return;
                }
            }
        },
    }
</script>

<style scoped>
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