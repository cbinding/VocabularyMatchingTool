/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aataltlabels
Summary	: Alternate labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aataltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015 CFB Initially created script
27/04/2015 CFB Code refactored to reduce duplication
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aataltlabels", $.usw.aatlist, {	// start of widget code 
		
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

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
			+ " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
			+ " OPTIONAL {"
			+ " <" + self.options.conceptURI + "> skos:altLabel ?preferredLanguageLabel ."
			+ " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
            + " }"
		    + " OPTIONAL {"
            + " <" + self.options.conceptURI + "> skos:altLabel ?fallbackLanguageLabel ."
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

	// elements of class usw-aataltlabelss become a widget
	$(window).load(function () {
	    $(".usw-aataltlabels").aataltlabels(); 
	});

}(jQuery));	//end of main jquery closure
