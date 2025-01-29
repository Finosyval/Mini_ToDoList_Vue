<template>

<div>

Temps : {{ time}}

</div>


</template>

<script setup>

import { ref , onMounted, onUnmounted} from 'vue';

const time= ref(0);

let timer

onMounted(() => {
   timer=setInterval(() => {
    console.log('incrementation')
    time.value++;
}, 1_000);
});

onUnmounted(() => {
    clearInterval(timer);
});

</script>
