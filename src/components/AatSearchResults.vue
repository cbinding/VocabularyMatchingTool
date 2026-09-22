<script setup lang="ts">
	import { ref, watch, onMounted, onBeforeUnmount } from "vue"
	import { searchForTerm } from "@/composables/useVmtAPI"

	type Result = {
	    conceptURI: string,		
		conceptLabel: string,
		scopeNote: string,
		parentString: string
	}

	const props = defineProps({
        searchFor: { type: String, default: "" },
		limit: { type: Number, default: 100 }
    })	
	
	const emit = defineEmits(['conceptSelected'])
	
	const results = ref(<Result[]>[])
	
	let cache = new Map()
	const CACHENAME = 'aatsearchresults'

    const styles= {
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
		const local = localStorage.getItem(CACHENAME)
		if (local) {
			try {
				cache = new Map(JSON.parse(local || '{}'));
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

	watch(() => props.searchFor, (newValue) => { getData(newValue || "") }, {}) 
	
	const conceptSelected = (evt: any) => emit('conceptSelected', { uri: evt.target.href, label: evt.target.innerText })
        
    const getData = (searchTerm: string = ""): void => { 
		const cleanedSearchTerm = searchTerm.trim()
		//console.log(`AatSearchResults.vue: getData: ${cleanedSearchTerm}`)           
		if(cleanedSearchTerm !== "") { 
			// get from cache if already present
			if(cache.has(cleanedSearchTerm)) {
				results.value = cache.get(cleanedSearchTerm)
			}
			else {
				searchForTerm(cleanedSearchTerm, {
					limit: props.limit,
					success: function(data: Array<Result>) { 
						cache.set(cleanedSearchTerm, data)
						//console.log(`AatSearchResults.vue: getData: '${cleanedSearchTerm}' - ${data.length}`)
						results.value = data						
					},
					error: function(msg: string) {
						//console.log(`AatSearchResults.vue: getData: ${cleanedSearchTerm} - Error: ${msg}`)
						results.value = []
					},
					complete: function(msg: string) {
						//console.log(`AatSearchResults.vue: getData: ${cleanedSearchTerm} - Complete: ${msg}`);
					}				
				});							
			}	
		}
	}

	
	
</script>

<template>
	<div class='usw-aat-search-results'>
		<ul id='aat-search-results' :style='styles'>
			<li v-for='(item, key) in results' >
				<a target='_blank'
                        :title='item.scopeNote'
                        :href='item.conceptURI' 
						@click.prevent='conceptSelected'><i class="fas fa-tag"></i>&nbsp;{{ item.conceptLabel }}</a>				
			</li>
        </ul>
		<div class='u-pull-right'>{{ results.length }} results</div>
	</div>
</template>

