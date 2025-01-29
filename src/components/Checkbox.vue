<template>
<label>
    <input type="checkbox" v-model="model" />
    {{ label }}
</label>

</template>

<script setup>

const model= defineModel();

const props = defineProps({
    label: String
});

const emits = defineEmits(['checked', 'unchecked']);

const onChange = (event) => {
    if (event.target.checked) {
        emits('checked');
    } else {
        emits('unchecked');
    }
};

</script>