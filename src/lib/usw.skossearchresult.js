/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skossearchresult
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skossearchresult"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma

    $.widget("usw.skossearchresult", $.usw.skoslist, {	// start of widget code 

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

            //	build a sparql query to get the data, filtering by language
            var limit = parseInt(self.options.limit, 10);
            var offset = parseInt(self.options.offset, 10);
            var language = $.trim(self.options.language);

            var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
		        + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:inScheme <" + self.options.schemeURI + ">"
                + " { ?uri skos:prefLabel ?label } UNION { ?uri skos:altLabel ?label }"
				+ "	FILTER(REGEX(?label, '" + self.options.searchfor + "', 'i'))"
                + (language !== "" ? " FILTER(langMatches(lang(?label),'" + language + "'))" : "")
                + " }";
            + " ORDER BY ASC(str(?label))"
            + (offset > 0 ? " OFFSET " + offset : "")
            + (limit > 0 ? " LIMIT " + limit : "");

            return sparql;
        }

    });	// end of widget code

    // any elements of class usw-aatsearch automatically become one...
    $(window).load(function () {
        $(".usw-skossearchresult").skossearchresult();
    });

}(jQuery));	//end of main jquery closure
