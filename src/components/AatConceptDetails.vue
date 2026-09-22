<template>
	<div class='usw-aat-concept-details' :style='styles'>
		<span v-if='currentItem.prefLabel !== ""'>
			<i class="fas fa-tag"></i>&nbsp;<strong>{{ currentItem.prefLabel }}</strong> (see <a target='aat' :href='conceptURI'>{{ conceptURI }}</a>)
		</span>
		<AatConceptRelations :conceptURI='conceptURI' @conceptSelected='conceptSelected'></AatConceptRelations>
		<div v-if='currentItem.scopeNote !== ""'><strong>Note:</strong>&nbsp;<em>{{ currentItem.scopeNote }}</em></div>	
		<div v-if='currentItem.parentString !== ""'><strong>Hierarchy:</strong>&nbsp;<em>{{ currentItem.parentString }}</em></div>
		<AatConceptLabels :conceptURI='conceptURI'></AatConceptLabels>
	</div>
</template>

<script setup lang="ts">
	import { ref, toRefs, watch, onMounted, onBeforeUnmount } from "vue"
	import { getConceptDetails } from "@/composables/useVmtAPI"
	//import AatConceptHierarchy from "@/components/AatConceptHierarchy.vue"
	import AatConceptLabels from "@/components/AatConceptLabels.vue"
	import AatConceptRelations from "@/components/AatConceptRelations.vue"
	
	const props = defineProps({
        conceptURI: {
			type: String,
			default: ""
		}
    })

	const emit = defineEmits(['conceptSelected'])
	
	type resultItem = {
		identifier: string,
		prefLabel: string,
		scopeNote: string,
		parentString: string
	}

	const emptyItem: resultItem = {
		identifier: "",
		prefLabel: "",
		scopeNote: "",
		parentString: ""
	}

	const currentItem = ref({ ...emptyItem })

	let cache = new Map()
	const CACHENAME = 'aatconceptdetails'
	
    const styles = {
        width: 		'100%',
        height: 	'200px',
        border: 	'1px solid lightgray',
        padding: 	'5px',
        margin: 	'0px',
        cursor: 	'pointer',	
        overflow: 	'scroll'
    }

	
	onMounted(() => {
		// get cached data from previous sessions
		if (localStorage.getItem(CACHENAME)) {
			try {
				cache = new Map(JSON.parse(localStorage.getItem(CACHENAME) || '{}'));
			} catch(e) {
				localStorage.removeItem(CACHENAME);
			}
		}
	
	})


	onBeforeUnmount(() => {
		// save cached data for future sessions
		const parsed = JSON.stringify(Array.from(cache.entries()));
		localStorage.setItem(CACHENAME, parsed);
	})
	

	watch(() => props.conceptURI, (newValue) => {
		//console.log(`AatConceptDetails.vue: watch: conceptURI changed to '${newValue}'`)
		getData(newValue)
	}) 

		
	const conceptSelected = (evt: any) => {
		emit('conceptSelected', evt)
	}
      
	
	const getData = (uri: string) => {
		const cleanedConceptURI = uri.trim()
        if(cleanedConceptURI !== "") { 
			//console.log(`AatConceptDetails.vue: getData: '${ cleanedConceptURI }`)
			// get from cache if already present
			if(cache.has(cleanedConceptURI)) {
				currentItem.value = cache.get(cleanedConceptURI) || { ...emptyItem };
			}
			else {
				// get from server and store in cache for next time
				//console.log(`AatConceptDetails.vue: getData: '${cleanedConceptURI}'`)
					
				getConceptDetails(cleanedConceptURI, { 
					success: function(data: Array<resultItem>) { 
						//console.log(`AatConceptDetails.vue: getData: getConceptDetails: ${JSON.stringify(data)}`)
						if(data.length > 0) {
							currentItem.value = {
								identifier: (data[0]?.identifier || "").trim(),
								prefLabel: (data[0]?.prefLabel || "").trim(),
								scopeNote: (data[0]?.scopeNote || "").trim(),
								parentString: (data[0]?.parentString || "").trim()
							}
							cache.set(cleanedConceptURI, currentItem.value)														
						}
					},
					error: function(msg: string) {
						//console.log(`AatConceptDetails.vue: getData: '${cleanedConceptURI}' - Error: ${msg}`)
						currentItem.value = { ...emptyItem };
					},
					complete: function(msg: string) {
						//console.log(`AatConceptDetails.vue: getData: '${cleanedConceptURI}' - Complete: ${msg}`)
					}
				})
			}		
        }
    }
	
</script>
