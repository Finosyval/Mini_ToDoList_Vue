<template>
<button  @click="showTimer=!showTimer" >
Afficher/masquer le temps
</button>

<Timer v-if="showTimer"></Timer>
<PageBone>
<template v-slot:header>
<!--Ici : en tête-->
<p v-if="tasksNotDone > 0">
  Il reste encore {{ tasksNotDone }}  tâche{{ tasksNotDone > 1 ? 's' : '' }}  à faire
</p>

</template>
<template v-slot:aside>
Ici sidebar
</template>
<template v-slot:main> 
    <form @submit.prevent="addTodo"  >

<fieldset role="group">
<input 
v-model="newtodo"
type="text"
placeholder="La tâche à effectuer"
>
<button 
:disabled="newtodo.length === 0"

> Ajouter une tâche</button>

</fieldset>

</form>

<div v-if="todos.length==0" > 
Mhhh, aucune tâche à effectuer pour le moment
</div>
<div v-else>
<ul>

<li 
v-for="todo in sortedTodos" 
:key="todo.date"
:class="{'completed':todo.completed}">

<Checkbox :label="todo.title" v-model="todo.completed" > 

</Checkbox>
</li>
</ul>
</div>

<input type="checkbox"
v-model:="hideCompleted"
>
Masquer les tâches complétées

    </template>

    <template v-slot:footer>
        ici le pied de page
        </template>

</PageBone>






</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Checkbox from './components/Checkbox.vue';
import Button from './components/Button.vue';
import PageBone from './components/PageBone.vue';
import Timer from './components/Timer.vue';
const newtodo=ref('');
const hideCompleted=ref(false);
const todos=ref( []);
const showTimer=ref(true);
onMounted(()=> {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response=>response.json())
    .then (valeur =>todos.value=valeur.map(todo =>({...todo, date:todo.id}) ))
    .catch(error => console.error("Erreur lors du fetch :", error)); //en cas de pépin
})


const addTodo=()=>{
    todos.value.push({
        title:newtodo.value,
        completed:false,
        date:Date.now()
    });
   newtodo.value='';
}

const sortedTodos=computed(()  => {


    const AFiltrer =todos.value.toSorted((a,b)=>a.completed > b.completed ? 1 : -1);
if (hideCompleted.value){
    return AFiltrer.filter(todo=>!todo.completed);

}

return AFiltrer;
});

const tasksNotDone= computed(()=>todos.value.filter(task=>!task.completed).length);


</script>

<style>



.completed{
    opacity: .5;
    text-decoration: line-through;
}

</style>