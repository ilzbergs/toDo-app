<template>
  <div class="flex flex-col items-center h-screen mt-36">
     <NewToDo />
  </div>
 
</template>


<script>

import NewToDo from './components/NewToDo.vue';

export default {
  name: 'App',
  components: {
    NewToDo
  }
}

</script>




