<template>
    <div class="flex flex-col bg-slate-50 w-5/6 text-center rounded-lg p-11">
        <h1 class="text-4xl mb-9">My To Do list!</h1>
        <div class="flex my-8 justify-around flex-col md:flex-row">
            <p class="mb-3" v-if="toDos.length === 0">Currently you have no any new ToDo </p>
            <button class="btn btn-error btn-xs" v-if='editing' @click="toogler(false)">Cancel</button>
            <button class="btn btn-primary btn-xs" v-else='' @click="toogler(true)">New ToDo</button>
        </div>
        <div class="flex flex-col md:flex-row justify-center" v-if="editing">
            <input class="flex input w-full max-w-xs" type="text" id="addToDo" placeholder="Add To Do" v-model="toDo"
                @keyup.enter="addToDo">
            <button class="btn btn-success btn-xs mt-4 md:h-full md:mt-0 " @click="addToDo">ADD</button>
        </div>
        <ul class="flex flex-col justify-center lg:w-3/5 m-auto">
            <li class="flex justify-center text-center md:justify-between" v-for="(toDo, index) in toDos" :key="index">
                <div v-if="editMode === index">
                    <input class="input input-bordered h-full mt-3" type="text" v-model="toDo.name" @keyup.enter="saveEdit"
                        @blur="saveEdit" />
                    <button class="btn btn-error btn-outline btn-xs ml-3" @click="cancelEdit">Cancel</button>
                </div>
                <div v-else class="flex mt-4 w-full text-center items-center">
                    <input type="checkbox" class="checkbox checkbox-info checkbox-xs" v-model="toDo.done" />
                    <div class="flex flex-col pl-6 items-center w-full md:flex-row md:justify-between">
                        <span :class="{ done: toDo.done }">{{ toDo.name }}</span>
                        <div class="flex md:ml-4">
                            <button class="btn btn-success btn-outline btn-xs mr-2" @click="editMode = index">Edit</button>
                            <button class="btn btn-error btn-outline btn-xs" @click="deleteToDo(index)">Delete</button>
                        </div>

                    </div>

                </div>
            </li>
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
        saveToDos() {
            localStorage.setItem('todos', JSON.stringify(this.toDos));
        },
        enterEditMode(index) {
            this.editMode = index;
        },
        saveEdit() {
            this.editMode = null;
            this.saveToDos();
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