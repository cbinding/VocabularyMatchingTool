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
            endpointURI: "http://heritagedata.org/live/sparql",
            schemeURI: "http://purl.org/heritagedata/schemes/mda_obj", // default; currently selected scheme
            useCache: true, // cache responses to prevent repeated requests (not working...)	        
            language: "en", // values: "en" (default), "es", "de", "nl" etc.
            //fallback: "en", // fallback language if chosen language label is not present
            limit: 100, // for restricting number of results (0 = no limit)
            offset: 0, // for implementation of paging (0 = no offset)	            
        },            

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);
	       
            var parent = self.element.parent();

            // buid and attach the language selector
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
                    var element = $("select:first", self.element);
                    if (element.is(':hidden')) {
                        $(element).show(300).focus();                       
                    }
                });

            $("<select></select>").hide()
                .appendTo(cog)
                .change(function () {
                    self.options.schemeURI = $("option:selected", this).first().val();
                    var label = $("option:selected", this).first().text();
                    $(self.element).trigger("selected", { "uri": self.options.schemeURI, "label": label });
                    $(this).hide(300);
                })
                // force change event if not changed but loses focus 
                // (otherwise never hides itself unless changed!)
                .focusout(function () {
                    $(this).change();
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

            var sparql = "PREFIX skos: <" + usw.uri.SKOS.NS + ">"
                + " PREFIX dct: <" + usw.uri.DCTERMS.NS + ">"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a skos:ConceptScheme; dct:title ?label . "
	            + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
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

        ajaxError: function (jqXHR, textStatus, errorThrown) {
            var self = this;
            //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
        },

        ajaxComplete: function (jqXHR, textStatus) {
            var	self = this;
            //$(self.element).waitable({ "waiting": false });
            //$(self.element).unblock();
        }        
    });	// end of widget code

    // any elements of class usw-skosschemeselect automatically become one...
    $(window).load(function () {
        $(".usw-skosschemeselect").skosschemeselect();
    });

})(jQuery);	//end of main jquery closure
