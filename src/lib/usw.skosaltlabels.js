/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosaltlabels
Version	: 20150205
Summary	: List of alternate labels
Require	: jquery, jquery-ui, usw.aatlist.js usw.uri.js
Example	: <div class="usw-skosaltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skosaltlabels", $.usw.skosfile, {	
	$.widget("usw.skosaltlabels", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() === "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data
	       var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <" + usw.uri.SKOS.NS + ">"
               + " SELECT DISTINCT ?label WHERE {"
               + " <" + self.options.conceptURI + "> skos:altLabel ?label ."
	           + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
               + " }"
               + " ORDER BY ASC(str(?label))"
	           + (offset > 0 ? " OFFSET " + offset : "")
               + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosaltlabels become a widget
	$(window).load(function () {
	    $(".usw-skosaltlabels").skosaltlabels(); 
	});

})(jQuery);	//end of main jquery closure
