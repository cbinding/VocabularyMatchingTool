/*jslint nomen: true, vars: true, white: true */
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aataltlabels
Version	: 20150223
Summary	: Alternate labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js, usw.uri.js
Example	: <div class="usw-aataltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
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

	    // default, may be overriden in inherited widgets
	    getLocalStorageKey: function () {
	        return this.options.conceptURI + "@" + this.options.language;
	    },

	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() === "") {
	            return;
	        }

	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <" + usw.uri.SKOS.NS + ">"
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
            + " }";
	        + " ORDER BY ASC(str(?label))"
	        + (offset > 0 ? " OFFSET " + offset : "")
            + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }

	});	// end of widget code

	// elements of class usw-aataltlabelss become a widget
	$(window).load(function () {
	    $(".usw-aataltlabels").aataltlabels(); 
	});

})(jQuery);	//end of main jquery closure
