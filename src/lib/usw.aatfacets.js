/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatfacets
Version	: 20150205
Summary	: List of top (root) concepts (facets) for AAT
Require	: jquery, jquery-ui, usw.aatlist.js, usw.uri.js
Example	: <div class="usw-aatfacets"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

05/02/2015	CFB	adapted from usw.seneschal.topconcepts.js
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma
    $.support.cors = true;

    $.widget("usw.aatfacets", $.usw.aatlist, {	// start of widget code 
	    
        // default options
        options: {},

        getLocalStorageKey: function () {
            var self = this;
            var key = "aatfacets@" + self.options.language; 
            return key;
        },

        // redraw the control
        _refresh: function() {
            var self = this;    
            
            // if we have cached data use that; don't do the ajax call 
            // (as the browser cache doesn't seem to work with AAT SPARQL calls)
            var key = self.getLocalStorageKey(); // "aatfacets@" + self.options.language;
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
                + " ?uri a gvp:Facet; skos:inScheme aat: ."
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

	// any elements of class usw-aat-facets automatically become one...
	$(window).load(function () {
	    $(".usw-aatfacets").aatfacets(); 
	});

})(jQuery);	//end of main jquery closure
