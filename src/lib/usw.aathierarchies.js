/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aathierarchies
Version	: 20150205
Summary	: List of AAT hierarchies for specified AAT facet
Require	: jquery, jquery-ui, usw.aatlist.js, usw.uri.js
Example	:<div class="usw-aathierarchies"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

05/02/2015	CFB	adapted from usw.seneschal.topconcepts.js
===============================================================================
*/
(function($) { //start of main jquery closure
    "use strict"; // strict	mode pragma
    $.support.cors = true;

	$.widget("usw.aathierarchies", $.usw.aatlist, {	//start	of widget code
        		
	    // default options
	    options: {
            facetURI: "http://vocab.getty.edu/aat/300264092" // Example: 'Objects' facet as default	              
	    },
	    
	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.facetURI + "@" + self.options.language;
	        return key;
	    },

		// redraw the control
		_refresh: function() {
		    var self = this;

		    if (self.options.facetURI.trim() === "")
		        return;
		    
		    // if we have cached data use that; don't do the ajax call 
		    // (as the browser cache doesn't seem to work with AAT SPARQL calls at the moment)
		    var key = self.getLocalStorageKey(); // self.options.facetURI + "@" + self.options.language;
			if ($.data(self.element, key)) {
			    self.ajaxSuccess($.data(self.element, key), "from cache", {});
			    return;
			}

		    //	build a sparql query to get the data, filtering by language,
            // supplying a fallback if required language label is not present
			var limit = parseInt(self.options.limit, 10);
			var offset = parseInt(self.options.offset, 10);            			
		    
			var sparql = "PREFIX aat: <http://vocab.getty.edu/aat/>"
                + " PREFIX gvp: <http://vocab.getty.edu/ontology#>"
                + " PREFIX skos: <" + usw.uri.SKOS.NS + ">"
                + " PREFIX skosxl: <" + usw.uri.SKOSXL.NS + ">"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a gvp:Hierarchy; skos:inScheme aat: ;"
                + " gvp:broaderGeneric|gvp:broaderPreferred <" + self.options.facetURI + "> ."
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?preferredLanguageLabel]"
                + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))" 
                + " }"
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?fallbackLanguageLabel]"
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
                + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

			self._getData(sparql);
		}
	});	// end of widget code

    // any elements of class usw-aat-hierarchies automatically become one...
	$(window).load(function () {
	    $(".usw-aathierarchies").aathierarchies();
	});	

}(jQuery));	//end of main jquery closure
