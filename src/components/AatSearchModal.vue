<script setup lang="ts">
	import { ref } from "vue"

	import AatSearchControl from "@/components/AatSearchControl.vue"
	import AatSearchResults from "@/components/AatSearchResults.vue"
	import AatConceptDetails from "@/components/AatConceptDetails.vue"
	
	const emit = defineEmits(['select', 'cancel'])

	const searchText = ref("")
	const selectedConceptURI = ref("")
	const selectedConceptLabel  =ref("")
	
	const searchRequested = (e: string) => {
		searchText.value = e.trim()
		//console.log(`AatSearch.vue: searchRequested: ${searchText.value}`)		
	}
		
	const conceptSelected = (e: { uri: string; label: string }) => {
		selectedConceptURI.value = e?.uri?.trim()
		selectedConceptLabel.value = e?.label?.trim()
		//console.log(`AatSearch.vue: selected: ${selectedConceptURI.value} / ${selectedConceptLabel.value}`)				
	}

</script>

<template>
<div class='modal-mask'>	
<div class="modal-wrapper">
<div class="modal-container">
<div class="modal-body">
	<AatSearchControl @submit='searchRequested'></AatSearchControl>		
	<AatSearchResults :searchFor='searchText' :limit='100' @conceptSelected='conceptSelected'></AatSearchResults>
	<AatConceptDetails :conceptURI='selectedConceptURI' @conceptSelected='conceptSelected'></AatConceptDetails>
	<div>&nbsp;</div>
    <div class='u-pull-right'>		
		<button 
			:class='{ "button-primary": selectedConceptURI.length > 0 }' 
			:disabled='selectedConceptURI == ""'
			@click='emit("select", { uri: selectedConceptURI, label: selectedConceptLabel })'><i class="fas fa-check-square"></i> Select</button>
		<button class='button-primary' @click='emit("cancel")'><i class="fas fa-window-close"></i> Cancel</button>		
	</div>	
</div><!--modal-body-->
</div><!--modal-container-->
</div><!--modal-wrapper-->
</div><!--modal-mask-->	
</template>



