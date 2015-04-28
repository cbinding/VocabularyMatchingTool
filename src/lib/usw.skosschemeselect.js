/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosschemeselect
Version	: 20150205
Summary	: List of languages
Require	: jquery, jquery-ui, usw.uri.js, fontawesome
Example	: <div class="usw-skosschemeselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015 CFB Initially created script
13/04/2015 CFB Hide if unchanged but lost focus
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma	
	
    //$.widget("usw.skosaltlabels", $.usw.skosfile, {	
    $.widget("usw.skosschemeselect", {	// start of widget code 
		
    // default options
        options: {
            endpointURI: "http://heritagedata.org/live/sparql", // user can enter alternative SPARQL endpoint
            //endpointURI: "http://heritagedata.org/tematres/tma/sparql.php", // test example - alternative SPARQL endpoint (TemaTres)
            schemeURI: "http://purl.org/heritagedata/schemes/mda_obj", // default; currently selected scheme
            useCache: true, // cache responses to prevent repeated requests (not working...)	        
            language: "en", // values: "en" (default), "es", "de", "nl" etc.
            limit: 100, // for restricting number of results returned (0 = no limit)
            offset: 0, // for implementation of paging (0 = no offset)	            
        },            

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);
	       
            var parent = self.element.parent();

            // build and attach the clickable cog icon for displaying the selector
            var cog = $("<div class='fa fa-cog' title='choose source vocabulary'></div>")
                 .css({
                     position: "absolute",
                     left: parent.position().left + parent.width() - 14,
                     top: parent.position().top,
                     display: "inline",
                     width: "14px",
                     height: "14px",
                     margin: "0px",
                     padding: "0px",
                     border: "0px",
                     cursor: "pointer"
                 })
                .appendTo(self.element)
                .on("click", function () {
                    //var element = $("select:first", self.element);
                    var element = $("form:first", self.element);
                    if (element.is(':hidden')) {
                        $(element).show(300).focus();                       
                    }
                });

            // add the form containing the scheme selection controls
            var form = $("<form><label>SPARQL endpoint:</label><input type='text'/><br><label>Concept scheme:</label><select/><br><input type='button' value='OK'/><input type='button' value='Cancel'/></form>")
                .hide()
                .appendTo(cog)
                .css({
                    border: "1px solid gray",
                    background: "whitesmoke",
                    width: "300px",
                    padding: "5px",
                    position: "relative"
                });                
            
            // set up the endpoint URL input field
            $("input:first", form) 
                .attr({ placeholder: 'Endpoint URL', autocomplete: 'on' })
                .css({ width: "100%" })
                .val(self.options.endpointURI)
                .change(function () {
                    self.options.endpointURI = $(this).val();
                    self._getData();
                });

            // set up the scheme list selector
            $("select:first", form)
                .css({ width: "100%" });
                
            // set up the OK/Cancel buttons
            $("input[type='button']", form)
                .addClass("button button-primary")
                .css({ width: "120px", "text-align": "center", "margin": "3px" });

            // handle click on 'OK' button
            $("input[type='button']:first", form)
                .click(function () {
                    // change the option values and hide the form
                    self.options.endpointURI = $("input[type='text']:first", form).val();
                    self.options.schemeURI = $("select:first option:selected:first", form).val();
                    var label = $("select:first option:selected:first", form).text();
                    $(self.element).trigger("selected", { "uri": self.options.schemeURI, "label": label });
                    $(form).hide(300);
                });

            // handle click on 'Cancel' button
            $("input[type='button']:last", form)
                .click(function () {
                    // set values back to how they were and hide the form
                    $("input[type='text']:first", form).val(self.options.endpointURI);
                    $("select:first", form).val(self.options.schemeURI);
                    $(form).hide(300);
                });

            // resize/reposition things when window resizes
            $(window).resize(function () {
                $(cog).css({
                    left: parent.position().left + parent.width() - 14,
                    top: parent.position().top
                });
            });

            self._getData();
        },

        // redraw the control
        _getData: function () {
            var self = this;

            // if we have cached data use that; don't do the ajax call 
            // (as the browser cache doesn't seem to work with AAT SPARQL calls)            
            var key = self.options.endpointURI + "@schemes";
            if ($.data(self.element, key)) {
                self.ajaxSuccess($.data(self.element, key), "from cache", {});
                return;
            }

            //	build a sparql query to get the data, filtering by language
            var limit = parseInt(self.options.limit, 10);
            var offset = parseInt(self.options.offset, 10);
            var language = $.trim(self.options.language);

            var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                 + " PREFIX dc: <http://purl.org/dc/elements/1.1/>"
                 + " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                 + " PREFIX dct: <http://purl.org/dc/terms/>"
                 + " SELECT DISTINCT ?uri ?label WHERE {"
                 + " ?uri a skos:ConceptScheme ."
                 + " {{?uri dc:title ?label} UNION {?uri dct:title ?label} UNION {?uri rdfs:label ?label}}"
                 + (language !== "" ? " FILTER(langMatches(lang(?label),'" + language + "'))" : "")
                 + " }"
                 + " ORDER BY ASC(str(?label))"
                 + (offset > 0 ? " OFFSET " + offset : "")
                 + (limit > 0 ? " LIMIT " + limit : "");

            // make the call
            $.support.cors = true;
            $.ajax({
                method: "GET",	            
                url: self.options.endpointURI,
                crossDomain: true,
                dataType: "jsonp",
                data: { output: "json", query: sparql },
                context: self,
                cache: self.options.useCache,             
                success: self.ajaxSuccess, 
                error: self.ajaxError, 
                complete: self.ajaxComplete,
            }); // end ajax call	            
        },        

        // expecting data to contain uri, label, language
        ajaxSuccess: function (data, textStatus, jqXHR) {
            var self = this;
	
            // cache the retrieved data for next time...
            var key = self.options.endpointURI + "@schemes";
            $.data(self.element, key, data);

            // items may already be sorted, but ensure (case insensitive) sorting prior to display
            data.results.bindings.sort(function (a, b) {
                return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
            });

            var selectElement = $("select:first", self.element).html("");

            // add each item to the list (as a listitem!)
            $(data.results.bindings).each(function (index, item) {
                var uri = item.uri ? item.uri.value : "";
                var label = usw.util.htmlEscape(item.label.value);
                var language = item.label["xml:lang"];

                if (self.options.schemeURI == uri)
                    $("<option value='" + uri + "' selected>" + label + "</option>").appendTo(selectElement);
                else
                    $("<option value='" + uri + "'>" + label + "</option>").appendTo(selectElement);
                
            });
        },     

        ajaxError: function (jqXHR, textStatus, errorThrown) {},
        ajaxComplete: function (jqXHR, textStatus) { }

    });	// end of widget code

    // any elements of class usw-skosschemeselect automatically become one...
    $(window).load(function () {
        $(".usw-skosschemeselect").skosschemeselect();
    });

})(jQuery);	//end of main jquery closure
