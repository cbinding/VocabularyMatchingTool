/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatscopenotes
Version	: 20150205
Summary	: Scope notes for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatscopenotes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatscopenotes", $.usw.aatlist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015", // for example
	    },
        	  
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;
	        
	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

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

	        self._getData(sparql);
	    },

	});	// end of widget code

	// elements of class usw-aatscopenotes become a widget
	$(window).load(function () {
	    $(".usw-aatscopenotes").aatscopenotes(); 
	});

})(jQuery);	//end of main jquery closure
