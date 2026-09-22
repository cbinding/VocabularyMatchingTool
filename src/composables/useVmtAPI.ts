"use strict"

import { NS } from "@/composables/Constants"


interface ISparqlResultBindingFieldProperties {
	type: string,
	value: string,	
	"xml:lang"?: string
}

type SparqlResultBinding = {
    [key:string]: {
		[key:string]: ISparqlResultBindingFieldProperties;
	};
}

type SparqlResult = {
	head: {
		vars: string[];
	}
	results: {
		bindings: Array<SparqlResultBinding>;
	}
};


// run a SPARQL query against Getty GVP SPARQL endpoint, return array of bindings (parsed.results.bindings)
// required options are callbacks: success(bindings), error(msg), complete(msg)
const runSPARQL = (sparql: string, options: {success: (bindings: Array<any>) => void, error: (msg: string) => void, complete: (msg: string) => void}) => {	
	//console.log(`runSPARQL: ${sparql}`);	
	var xhr = new XMLHttpRequest();	
	xhr.onreadystatechange = function() {
		if (this.readyState === 4) {	
			if(this.status === 200) {
				try {
					//console.log(`runSPARQL success: ${xhr.responseText}`);
					const parsed: Partial<SparqlResult> = JSON.parse(xhr.responseText);
					options.success(parsed.results?.bindings || []);
				} catch(error) {
					options.error(`Error parsing SPARQL results: ${error}`);
				}
								
			}
			else {
				options.error(xhr.responseText);
				console.log(`runSPARQL error: ${xhr.responseText}`);
			}
			options.complete("runSPARQL complete");						
		}			
	};	
	// 17/04/2019 using server side PHP proxy script to forward SPARQL queries - should resolve 'mixed content' errors when deployed
	// let uri = `${ options.endpoint }?query=${ encodeURIComponent(sparql) }${ options.useCache ? '' : '&t=' + Math.random() }`;	
	// when deployed the proxy script will be on the same domain as these scripts, so hopefully resolves the problem:
	// let aatproxy = "https://heritagedata.org/vmt2/sparql-proxy.php"; // our server side proxy script	
	// let aatproxy = `${ window.location.href.substring(0, window.location.href.lastIndexOf('/')+1) }sparql-proxy.php`;    
	// let endpoint = "http://vocab.getty.edu/sparql.json"; // SPARQL endpoint URI use for JSON responses		
	// let uri = `${ aatproxy }?service-uri=${ endpoint }&query=${ encodeURIComponent(sparql) }`; // the constructed call

	// 16/09/2026 CFB - test bypass the PHP proxy script - Getty endpoint is now using https, 
	// so no 'mixed content' errors,  plus proxy appears to be now causing truncation of results
	let endpoint = "https://vocab.getty.edu/sparql.json"; // SPARQL endpoint URI for JSON responses		
	let uri = `${ endpoint }?query=${ encodeURIComponent(sparql) }`; // the constructed call
	xhr.open("GET", uri, true);			
	xhr.send();		
}	// end runSPARQL


const defaults = {
    language: "en", // default preferred language - values: "en", "es", "de" etc.
    //fallback: "en", // fallback language to use if data in chosen language is not available
    limit: 0, // for restricting number of results
    offset: 0, // for implementation of paging
    success: (_data: Array<any>) => { },	// default callback
    error: (_msg: string) => { },		// default callback
    complete: (_msg: string) => { }	// default callback
} 	// end defaults

		
const getConceptDetails = function(uri: string, options = {}) {		
	const opts = Object.assign({}, defaults, options || {});
	const query = `PREFIX xl: <${NS.XL}>
		PREFIX rdf: <${NS.RDF}>
		PREFIX dc: <${NS.DC}>
		PREFIX gvp: <${NS.GVP}>
		PREFIX skos: <${NS.SKOS}>
		SELECT DISTINCT ?identifier ?prefLabel ?scopeNote ?parentString WHERE {
			<${ uri }> dc:identifier ?identifier ; 
		    gvp:parentStringAbbrev ?parentString ;
		    gvp:prefLabelGVP [ xl:literalForm ?prefLabel ] .
		    OPTIONAL {
			    <${ uri }> skos:scopeNote [rdf:value ?scopeNote] .
			    FILTER(langMatches(lang(?scopeNote), '${opts.language}'))
		    }
		} LIMIT 1`; 
	//console.log(query)
	runSPARQL(query, {
		success: function(bindings: Array<any>) {
			const data = (bindings || []).map(item => {
				return {
					identifier:  `${ (item.identifier || {}).value || '' }`,
					prefLabel: `${ iso2utf((item.prefLabel || {}).value || '') }`, 
					scopeNote: `${ iso2utf((item.scopeNote || {}).value || '') }`,
					parentString: `${ iso2utf((item.parentString || {}).value || '') }`
				}
			});
			opts.success(data);
		},
		error: opts.error,
		complete: opts.complete	
	});
}	// end getConceptDetails


// returns e.g. [{ value: "x", language: "en" }, { value: "y", language: "de" }]
const getConceptLabels = function(uri: string, options = {}) {
	const opts = Object.assign({}, defaults, options || {});
	const query = `PREFIX xl: <${NS.XL}>		
		SELECT DISTINCT ?label WHERE {
			<${ uri }> (xl:prefLabel | xl:altLabel) [xl:literalForm ?label] .
		}`; 
	runSPARQL(query, {
		success: function(bindings: Array<any>) {
			const data = (bindings || []).map(item => {
				return {						
					value: `${ iso2utf((item.label || {}).value || '') }`, 
					language: `${ (item.label || {})['xml:lang'] || '' }`
				}					
			});
			opts.success(data);
		},
		error: opts.error,
		complete: opts.complete
	});
}	// end getConceptLabels
		

// returns e.g. [{ relationship: "http://www.w3.org/2004/02/skos/core#broader", uri: "http://tempuri/1", label: "Concept 1" }, ...]
const getConceptRelations = function(conceptURI: string, options = {}) {
	const opts = Object.assign({}, defaults, options || {})
	const limit = opts.limit ? `LIMIT ${Math.trunc(Number(String(opts.limit)))}` : ''
	const offset = opts.offset ? `OFFSET ${Math.trunc(Number(String(opts.offset)))}` : ''
					
	const query = `PREFIX xl: <${NS.XL}>		
		PREFIX gvp: <${NS.GVP}>
		PREFIX skos: <${NS.SKOS}>
		PREFIX rdfs: <${NS.RDFS}>
						
		SELECT DISTINCT ?relationship ?uri ?label WHERE { 
			{
				<${ conceptURI }> ?prop ?uri .
				?prop rdfs:subPropertyOf gvp:broader .				
				BIND(skos:broader AS ?relationship) .
			}
			UNION
			{
				?uri ?prop <${ conceptURI }> .
				?prop rdfs:subPropertyOf gvp:broader .				
				BIND(skos:narrower AS ?relationship) .
			}
			UNION
			{
				<${ conceptURI }> ?prop ?uri .				
				?prop rdfs:subPropertyOf skos:related .
				BIND(skos:related AS ?relationship) .
			}
			?uri gvp:prefLabelGVP [ xl:literalForm ?label ] .
		}		
		${offset}
		${limit}`
						
	runSPARQL(query, {
		success: function(bindings: Array<any>) {
			const data = (bindings || []).map(item => {
				return {
					uri: `${ (item.uri || {}).value || '' }`,
					label: `${ iso2utf((item.label || {}).value || '') }`,
					relationship: `${ iso2utf((item.relationship || {}).value || '') }`					
				}
			});
			opts.success(data);		
		},			
		error: opts.error,
		complete: opts.complete
	});
}	// end getConceptRelations
	
	
/*
usage: API.searchForTerm("sediment", { success: function(json){ console.log(json)} });
returns: [{ 
	conceptURI: "http://vocab.getty.edu/aat/300379424", 
	conceptLabel: { value: "sediment", language: "en" },
	scopeNote: { 
		value: "Eroded matter from preexisting rocks which is carried and deposited by water, 
				wind, or ice, forming layers on the Earth's surface and fluvial deposits. 
				Sedimentary rock.is composed of consolidated sediment", 
		language: "en" 
	},
	parentString: { 
		value: "<soil by composition or origin>, soil, ... Materials Facet", 
		language: "en" 
	}]	
*/
const searchForTerm = function(term = '', options = {}) {		
	const opts = Object.assign({}, defaults, options || {})
	const limit = opts.limit ? `LIMIT ${Math.trunc(Number(String(opts.limit)))}`: ''
	const offset = opts.offset ? `OFFSET ${Math.trunc(Number(String(opts.offset)))}`: ''
			
	// build SPARQL query
	const query = `PREFIX aat: <${NS.AAT}>
		PREFIX gvp: <${NS.GVP}>
		PREFIX luc: <${NS.LUC}>
		PREFIX skos: <${NS.SKOS}>
		PREFIX xl: <${NS.XL}>		
				
		SELECT DISTINCT ?conceptURI ?conceptLabel ?scopeNote ?parentString WHERE {
			?conceptURI a gvp:Concept; 
			skos:inScheme aat: ; 
			luc:term '${term}' ;
			gvp:prefLabelGVP [xl:literalForm ?conceptLabel] ;
			gvp:parentStringAbbrev ?parentString .							
			OPTIONAL {
				?conceptURI skos:scopeNote [rdf:value ?scopeNote] .
				FILTER(langMatches(lang(?scopeNote), '${opts.language}'))
			}					
		}
		ORDER BY ASC(str(?conceptLabel)) 
		${offset}
		${limit}`
				
	// run SPARQL query  
	runSPARQL(query, {
		success: function(bindings: Array<any>) {
			const data = (bindings || []).map(item => {
				return {
					conceptURI: `${ (item.conceptURI || {}).value || '' }`,	
					conceptLabel: `${ iso2utf((item.conceptLabel || {}).value || '') }`, 
					scopeNote:`${ iso2utf((item.scopeNote || {}).value || '') }`,
					parentString: `${ iso2utf((item.parentString || {}).value || '') }`	
				}
			});				
			opts.success(data);
		},
		error: opts.error,
		complete: opts.complete			
	});           	
}	// end searchForTerm 
		
// Getty GVP server returns iso-8859-1 encoded strings - need to convert them to utf-8 encoded strings
// see http://stackoverflow.com/questions/5396560/how-do-i-convert-special-utf-8-chars-to-their-iso-8859-1-equivalent-using-javasc
// convert ISO8859-1 to UTF-8 string (but works other way round??)
const iso2utf = function(iso: string) {
	let utf=iso;
	try{
		utf=decodeURIComponent(escape(iso));
	} catch(_ignored) { }
	return utf
}	// end iso2utf
			
export { getConceptDetails, getConceptLabels, getConceptRelations, searchForTerm }



