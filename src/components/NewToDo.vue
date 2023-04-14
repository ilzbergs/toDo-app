<template>
    <h1 class="">My To Do list!</h1>
    <div>
        <p v-if="toDos.length === 0">Currently you have no any new ToDo </p>
        <button v-if='editing' @click="toogler(false)">Cancel</button>
        <button v-else='' @click="toogler(true)">New ToDo</button>
    </div>
    <div v-if="editing">
        <label for="addToDo"></label>
        <input type="text" id="addToDo" placeholder="Add To Do" v-model="toDo" @keyup.enter="addToDo">
        <button @click="addToDo">ADD</button>
    </div>
    <div>
        <ul v-for="(toDo, index) in toDos" :key="index">
            <div v-if="editMode === index">
                <input type="text" v-model="toDo.name" @keyup.enter="saveEdit" @blur="saveEdit" />
                <button @click="cancelEdit">Cancel</button>
            </div>
            <div v-else>
                <input type="checkbox" v-model="toDo.done" />
                <span :class="{ done: toDo.done }">{{ toDo.name }}</span>
                <button @click="editMode = index">Edit</button>
                <button @click="deleteToDo(index)">Delete</button>
            </div>
        </ul>
    </div>
</template>


<script>
export default {

    name: 'AddToDo',
    data() {
        return {
            toDo: '',
            toDos: [],
            editMode: null,
            editing: false,
        };
    },
    mounted() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            this.toDos = JSON.parse(storedTodos);
        }
    },
    methods: {
        saveToDos() {
            localStorage.setItem('todos', JSON.stringify(this.toDos));
        },
        toogler(editing) {
            this.editing = editing;
            this.toDo = '';
            this.visible = false;
        },
        addToDo() {
            if (this.toDo.length === 0) {
                return;
            } if (this.editToDo != null) {
                this.toDos[this.editToDo].name = this.toDo;
                this.editToDo = null;
            }
            else {
                this.toDos.push({
                    name: this.toDo,
                    done: false,
                    id: Math.random(),
                });
                this.toDo = '';
                this.saveToDos();
            }
        },
        deleteToDo(index) {
            this.toDos.splice(index, 1);
            this.saveToDos();
        },
        enterEditMode(index) {
            this.editMode = index;
        },
        saveEdit() {
            this.editMode = null;
            this.saveTodos();
        },
        cancelEdit() {
            this.editMode = null;
        },
    },
};
</script>

<style>
.done {
    text-decoration: line-through;
}
</style>