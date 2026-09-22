<template>
    <div class='usw-aat-search-control'>
		<form @submit.prevent="$emit('submit', searchText)" style="width:100%">
            <label for='searchFor'><i class='fas fa-search' title='Search for'></i> {{ labelText }}</label>
            <input id='searchFor' type='search' :placeholder='placeholder' v-model='searchText'>
            <button type='submit' :class='{ "button-primary": searchText.length > 2 }' :value='buttonText'><i class="fas fa-search"></i> {{ buttonText }}</button>		
        </form>
	</div>
</template>

<script setup lang="ts">
    import { ref } from "vue"

    defineEmits(['submit'])

    const props = defineProps({
        labelText: { type: String, default: "AAT search"},
        buttonText: { type: String, default: "Go"},
        placeholder: { type: String, default: "Search for"},
	}) 
		
	const searchText = ref("")	
	
</script>	

