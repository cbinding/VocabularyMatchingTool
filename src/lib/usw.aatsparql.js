// set up namespace
var usw	= window.usw || {};

"use strict"; // strict mode pragma
$.support.cors = true; // allow cross domain script

// data layer to perform sparql queries on SKOS (AAT) data
usw.aatsparql = {

    // default options
    defaults: {
        useCache: true, // cache responses to prevent repeated requests for same data
        endpointURI: "http://vocab.getty.edu/sparql",   //sparql endpoint URI
        conceptURI: "http://vocab.getty.edu/aat/300194567",
        searchfor: "fishing AND vessels",
        language: "en", // values: "en", "es", "de" etc.
        fallback: "en", // fallback language to use if label in chosen language is not available
        limit: 0, // for restricting number of results
        offset: 0, // for implementation of paging
        success: function (data) { },
        error: function (msg) { },
        complete: function (msg) { }
    },

    // Get preferred labels for a specified conceptURI. Usage:
    // data = usw.aatsparql.getPreferredLabels({conceptURI: "http://example.com/concept/123"});
    // returns array [{uri, label, language}, {uri, label, language} etc.]
    getPrefLabels: function (options) {
        // override default options with any passed in
        options = $.extend({}, usw.aatsparql.defaults, options);

        //	build the sparql query to get the data, filtered by language (if supplied)
        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
			+ " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
            + " OPTIONAL {"
			+ " <" + options.conceptURI + "> skos:prefLabel ?preferredLanguageLabel ."
			+ " FILTER(langMatches(lang(?preferredLanguageLabel),'" + options.language + "'))"
            + " }"
		    + " OPTIONAL {"
            + " <" + options.conceptURI + "> skos:prefLabel ?fallbackLanguageLabel ."
            + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + options.fallback + "'))"
            + " }"
            + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
            + " }";
        +(options.limit > 0 ? " LIMIT " + parseInt(options.limit, 10) : "")
        + (options.offset > 0 ? " OFFSET " + parseInt(options.offset, 10) : "")
        + " ORDER BY ASC(str(?label))";

        // make the call
        $.ajax({
            url: options.endpointURI,
            data: { format: "json", query: sparql },
            cache: options.useCache,
            context: this,
            success: function (data, textStatus, jqXHR) {
                // map returned json data to simpler structure: [ {uri, label, language}, {uri, label, language} ]
                var arr = $.map(data.results.bindings, function (item) {
                    // gvp server returns iso-8859-1 strings - convert to utf-8
                    var utflabel = usw.util.iso2utf(item.label.value);
                    return ({ "uri": options.conceptURI, "label": utflabel, "language": item.label["xml:lang"] });
                });
                // do success callback, passing simpler data structure
                options.success(arr);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // do error callback with message
                options.error(errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                // do completion callback with message
                options.complete(textStatus);
            }
        }); // end ajax call
    },	// end getPreferredLabels

    //getData(sparql, options) {}

    // (Note - same code as getPreferred labels - D.R.Y. - make internal function 'getLabels', then pass in parameter requesting pref or alt)
    // Get alternate labels for a specified conceptURI. Usage:
    // data = usw.aatsparql.getAlternateLabels({conceptURI: "http://example.com/concept/123"});
    getAltLabels: function (options) {
        // override default options with any passed in
        options = $.extend({}, usw.aatsparql.defaults, options);

        //	build the sparql query to get the data, filtered by language (if supplied)
        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
			+ " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
			+ " OPTIONAL {"
			+ " <" + options.conceptURI + "> skos:altLabel ?preferredLanguageLabel ."
			+ " FILTER(langMatches(lang(?preferredLanguageLabel),'" + options.language + "'))"
            + " }"
		    + " OPTIONAL {"
            + " <" + options.conceptURI + "> skos:altLabel ?fallbackLanguageLabel ."
            + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + options.fallback + "'))"
            + " }"
            + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
            + " }";
        +(options.limit > 0 ? " LIMIT " + parseInt(options.limit, 10) : "")
        + (options.offset > 0 ? " OFFSET " + parseInt(options.offset, 10) : "")
        + " ORDER BY ASC(str(?label))";

        // make the call
        $.ajax({
            url: options.endpointURI,
            data: { format: "json", query: sparql },
            cache: options.useCache,
            context: this,
            success: function (data, textStatus, jqXHR) {
                //var data1 = $.parseJSON(jqXHR.responseText);
                // map returned json data to simpler structure: [ {uri, label, language}, {uri, label, language} ]
                var arr = $.map(data.results.bindings, function (item) {
                    // gvp server returns iso-8859-1 strings - convert to utf-8
                    var utflabel = usw.util.iso2utf(item.label.value);
                    return ({ "uri": options.conceptURI, "label": utflabel, "language": item.label["xml:lang"] });
                });
                // do success callback, passing simpler data structure
                options.success(arr);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // do error callback with message
                options.error(errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                // do completion callback with message
                options.complete(textStatus);
            }
        }); // end ajax call
    }	// end getAlternateLabels	


};	// end usw.aatsparql





