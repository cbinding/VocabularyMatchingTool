/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatsearchresult
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatsearchresult"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma

    $.widget("usw.aatsearchresult", $.usw.aatlist, {	// start of widget code 

        // default options
        options: {
            searchfor: ""
        },

        // override default key
        getLocalStorageKey: function () {
            if (this.options.searchfor.trim() !== "") {
                return this.options.searchfor + "@" + this.options.language;
            }
            return null;
        },

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            $(self.element)
                .waitable()
                .css({
                    padding: "3px",
                    margin: "0px",
                    border: "1px solid gray",
                    "height": "100px",
                    "overflow-y": "scroll"                   
                });           

            // overridden base "create" function, so call that now
            this._super(options);
        },

        getSPARQL: function () {
            var self = this;

            // appear blocked while running the query (gets unblocked by aatlist)
            self.element.waitable({ waiting: true });

            //	build a sparql query to get the data, filtering by language,
            // supplying a fallback if required language label is not present
            var limit = parseInt(self.options.limit, 10);
            var offset = parseInt(self.options.offset, 10);

            var sparql = "PREFIX aat: <http://vocab.getty.edu/aat/>"
               + " PREFIX luc: <http://www.ontotext.com/owlim/lucene#>"
               + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
               + " PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>"
               + " SELECT DISTINCT ?uri ?label WHERE {"
               + " ?uri skos:inScheme aat: ; luc:term '" + self.options.searchfor + "' ."
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

            return sparql;
        }

    });	// end of widget code

    // any elements of class usw-aatsearch automatically become one...
    $(window).load(function () {
        $(".usw-aatsearchresult").aatsearchresult();
    });

}(jQuery));	//end of main jquery closure
