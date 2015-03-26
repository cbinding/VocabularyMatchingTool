/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosconceptschemes
Version	: 20150205
Summary	: List of all concept schemes at the sparql endpoint in use
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosconceptschemes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosconceptschemes", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {},

	    getLocalStorageKey: function () {
	        var self = this;
	        var key = "schemes@" + self.options.language;
	        return key;
	    },
	      
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey();

	        //if ($.data(self.element, key)) {
	        if ($.data(document.body, key)) {
	            self.ajaxSuccess($.data(document.body, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " PREFIX dct: <http://purl.org/dc/terms/>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a skos:ConceptScheme; dct:title ?label . "
	            + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
	            + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosschemes become a widget
	$(window).load(function () {
	    $(".usw-skosconceptschemes").skosconceptschemes(); 
	});

})(jQuery);	//end of main jquery closure
