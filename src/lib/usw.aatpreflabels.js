/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatpreflabels
Version	: 20150223
Summary	: Preferred labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatpreflabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatpreflabels", $.usw.aatlist, {	// start of widget code 
		
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
	        
	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
             + " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
             + " OPTIONAL {"
             + " <" + self.options.conceptURI + "> skos:prefLabel ?preferredLanguageLabel ."
             + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
             + " }"
             + " OPTIONAL {"
             + " <" + self.options.conceptURI + "> skos:prefLabel ?fallbackLanguageLabel ."
             + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
             + " }"
             + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
	         //+ " BIND('" + self.options.conceptURI + "' AS ?uri)"
             + " }";
	         + " ORDER BY ASC(str(?label))"
	         + (offset > 0 ? " OFFSET " + offset : "")
             + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    },        

	});	// end of widget code

	// elements of class usw-aatpreflabels become widgets
	$(window).load(function () {
	    $(".usw-aatpreflabels").aatpreflabels(); 
	});

})(jQuery);	//end of main jquery closure
