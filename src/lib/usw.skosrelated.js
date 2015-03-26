/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosrelated
Version	: 20150205
Summary	: List of related concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosrelated"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosrelated", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
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
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:related <" + self.options.conceptURI + "> ; skos:prefLabel ?label . "
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosrelated become a widget
	$(window).load(function () {
	    $(".usw-skosrelated").skosrelated(); 
	});

})(jQuery);	//end of main jquery closure
