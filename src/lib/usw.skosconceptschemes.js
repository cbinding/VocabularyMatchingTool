/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosconceptschemes
Summary	: List of all concept schemes at the sparql endpoint in use
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosconceptschemes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015 CFB Initially created script
27/04/2015 CFB Code refactored to reduce duplication
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosconceptschemes", $.usw.skoslist, {	// start of widget code 
		
	    getLocalStorageKey: function () {
	        return "schemes@" + self.options.language;	       
	    },

	    getSPARQL: function(){
	        var self = this;

	        //	build a sparql query to get the data, filtering by language
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);
	        var language = $.trim(self.options.language);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
	            + " PREFIX dc: <http://purl.org/dc/elements/1.1/>"
	            + " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + " PREFIX dct: <http://purl.org/dc/terms/>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a skos:ConceptScheme ."
	            + " {{?uri dc:title ?label} UNION {?uri dct:title ?label} UNION {?uri rdfs:label ?label}}"
	            + (language !== "" ? " FILTER(langMatches(lang(?label),'" + language + "') || lang(?label)='')" : "")
	            + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        return sparql;
	    }	      
	    
	});	// end of widget code

	// elements of class usw-skosschemes become a widget
	$(window).load(function () {
	    $(".usw-skosconceptschemes").skosconceptschemes(); 
	});

})(jQuery);	//end of main jquery closure
