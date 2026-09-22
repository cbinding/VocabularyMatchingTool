<template>
	<div class='usw-aat-concept-relations'>		
		<div v-for='(value, key) in groupedRelations'>
			<strong>{{ getRelationshipLabel(key.toString()) }}:</strong>
			<span v-for='item in value'>&nbsp;<a :href='item.uri' @click.prevent='conceptSelected'><i class="fas fa-tag"></i>&nbsp;{{ item.label }}</a>
			</span>			
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue"
	import {URI_SKOS} from "@/composables/Constants"
	import { getConceptRelations } from "@/composables/useVmtAPI"
	
	const emit = defineEmits(['conceptSelected'])

	type relatedItem = {
		relationship: string,
		uri: string,
		label: string
	}

	const props = defineProps({
		"conceptURI": {
			type: String,
			default: ""
		}
	})

	const relations = ref([] as relatedItem[])

	let cache = new Map()
	const CACHENAME = "aatconceptrelations"
		
	onMounted(() => {
		// get cached data from previous sessions
		const local = localStorage.getItem(CACHENAME)
		if (local) {
			try {
				cache = new Map(JSON.parse(local || '[]'));
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
	
	watch(() => props.conceptURI, (newValue) => { getData(newValue) }) 
	
	const conceptSelected = (evt: any) => emit('conceptSelected', { uri: evt.target.href, label: evt.target.innerText })
        
    const getData = (uri: string) => {
		const cleanedConceptURI = uri.trim()
		if(cleanedConceptURI !== "") { 			
			// get from cache if already present
			if(cache.has(cleanedConceptURI)) {
				relations.value = cache.get(cleanedConceptURI)
			}
			else {
				// get from server and store in cache for next time
				getConceptRelations(cleanedConceptURI, { 
					success: function(data: Array<relatedItem>) { 
						cache.set(cleanedConceptURI, data)
						relations.value = data						
					},
					error: function(msg: string) {
						relations.value = []
					}
				});
			}						
        }
	}
	
	const getRelationshipLabel = (uri: string) => {
		let label = ""
		switch(uri.trim()) {
			case URI_SKOS.BROADER: label = "Broader"; break;
			case URI_SKOS.NARROWER: label = "Narrower"; break;
			default: label = "Related"; break;
		}
		return label
	}
	
	const groupedRelations = computed(() => {
	    // group concepts by relationship
		const grouped = new Map()
			
		relations.value.forEach(item => {
			const relType = item.relationship
			if(!grouped.has(relType))
				grouped.set(relType, [])
			grouped.get(relType)?.push(item)
		})						
			
		// sort the arrays		
		for(const g of grouped.keys()) {
			grouped.get(g)?.sort()      
		}	

		return Object.fromEntries(grouped)		
	})		
</script>
