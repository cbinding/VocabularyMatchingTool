/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatscopenotes
Summary	: Scope notes for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatscopenotes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
27/04/2015 CFB Code refactored to reduce duplication
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatscopenotes", $.usw.aatlist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015" // for example
	    },

	    getSPARQL: function () {
	        var self = this;

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
	            + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT (\"\" AS ?uri) ?label WHERE {" // record with blank uri can be handled as a literal value
                + " OPTIONAL {"
                + " <" + self.options.conceptURI + "> skos:scopeNote [rdf:value ?preferredLanguageLabel] ."
	            + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
	            + " }"
                + " OPTIONAL {"
                + " <" + self.options.conceptURI + "> skos:scopeNote [rdf:value ?fallbackLanguageLabel] ."
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
	            + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
	            + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        return sparql;
	    }

	});	// end of widget code

	// elements of class usw-aatscopenotes become a widget
	$(window).load(function () {
	    $(".usw-aatscopenotes").aatscopenotes(); 
	});

}(jQuery));	//end of main jquery closure
