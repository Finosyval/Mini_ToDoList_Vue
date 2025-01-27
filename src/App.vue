<template>

<form action="" @submit.prevent="addTodo"  >

    <fieldset role="group">
<input 
v-model="newtodo"
type="text"
placeholder="La tâche à effectuer"
>
<button 

:class="{'disabled-btn':newtodo.length===0}"
> Ajouter une tâche</button>

</fieldset>

</form>

<div v-if="todos.length==0" > 
Mhhh, aucune tâche à effectuer pour le moment
</div>
<div v-else="">
<ul>

<li 
v-for="todo in sortedTodos()" 
:key="todo.date"
:class="{'completed':todo.completed}">

<input type="checkbox" v-model="todo.completed" >    
{{ todo.title }}
</li>
</ul>
</div>

<input type="checkbox"
v-model:="hideCompleted"
>
Masquer les tâches complétées

<div>

</div>
</template>

<script setup>
import { ref } from 'vue';


const newtodo=ref('');
const hideCompleted=ref(false);
const todos=ref( [
    {
        title:'Apprendre Vue 3',
        completed:true,
        date:Date.now()
    },
    {
        title:'Apprendre Vue Router',
        completed:false,
        date:Date.now()
    }
 
 
]);

const addTodo=()=>{
    todos.value.push({
        title:newtodo.value,
        completed:false,
        date:Date.now()
    });
   newtodo.value='';
}

const sortedTodos= () => {
    const AFiltrer =todos.value.toSorted((a,b)=>a.completed > b.completed ? 1 : -1);
if (hideCompleted.value){
    return AFiltrer.filter(todo=>!todo.completed);

}

return AFiltrer;
}


</script>

<style>
.disabled-btn {
  cursor: not-allowed !important;
  opacity: 0.6; /* Facultatif pour rendre visuellement désactivé */
}


.completed{
    opacity: .5;
    text-decoration: line-through;
}

</style>