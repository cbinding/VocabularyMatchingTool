<template>
	<div class='usw-aat-concept-labels'>
		<strong v-if="labels.length">Terms</strong>
		<ul id='concept-labels'>
			<li v-for='(lbls, key) in groupedLabels'><span class='language'>{{ key }}</span>
				<ul>
					<li v-for='label in lbls'>{{ label }}</li>
				</ul>
			</li>
		</ul>		
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
	import { getConceptLabels } from "@/composables/useVmtAPI"

	const props = defineProps({
        conceptURI: {
			type: String,
			default: ""
		}
    })	
	
	type labelItem = {
		value: string,
		language: string
	}

	const labels = ref([] as labelItem[])

	let cache = new Map()
	const CACHENAME = 'aatconceptlabels'	
	
	onMounted(() => {
		// get cached data from previous sessions
		const local = localStorage.getItem(CACHENAME)
		if (local) {
			try {
				cache = new Map(JSON.parse(local || '{}'));
			} catch(e) {
				localStorage.removeItem(CACHENAME)
			}
		}
	})


	onBeforeUnmount(() => {
		// save cached data for future sessions
		const parsed = JSON.stringify(Array.from(cache.entries()));
		localStorage.setItem(CACHENAME, parsed);
	})
	

	watch(() => props.conceptURI, (newValue) => { getData(newValue) }) 
	
	const getData =(uri: string) => {
        const cleanedURI = uri.trim()     
		if(cleanedURI !== "") { 
			// get from cache if already present
			if(cache.has(cleanedURI)) {
				labels.value = cache.get(cleanedURI) || [];
				}
			else {
				// get from server and store in cache for next time
				getConceptLabels(cleanedURI, { 
					success: function(data: Array<labelItem>) { 
						cache.set(cleanedURI, data);
						labels.value = data
					},
					error: function(msg: string) {
						labels.value = []
					}
				})
			}			
		}			
	}		
	
	const groupedLabels = computed(() => {        
		const grouped = new Map()
			
		labels.value.forEach(item => {
			if(!grouped.has(item.language)) {
				grouped.set(item.language, [])
			}			
			grouped.get(item.language)?.push(item.value)													
		})
			
		// sort each of the grouped arrays
		for(const g of grouped.keys()) {
			grouped.get(g)?.sort();
		}		

		return Object.fromEntries(grouped)	
	})
</script>
