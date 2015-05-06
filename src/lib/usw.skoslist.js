/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skoslist
Summary	: Base SKOS concept list
Require	: jquery, jquery-ui
Example	: <div class="usw-skoslist"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015 CFB Initially created script
27/04/2015 CFB Code refactored to reduce duplication
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skoslist", $.usw.waitable, { // start of widget code 
		
	    // default options
	    options: {
	        endpointURI: "http://heritagedata.org/live/sparql",
	        useCache: true, // cache responses to prevent repeated requests (not working...)	        
	        language: "en", // values: "en" (default), "es", "de", "nl" etc.
	        fallback: "en", // fallback language if chosen language label is not present
	        limit: 100, // for restricting number of results (0 = no limit)
	        offset: 0, // for implementation of paging (0 = no offset)	            
	    },

	    // initialization code (runs once only)
	    _create: function (options) {
	        var self = this;
	        self.options = $.extend({}, self.options, options);

	        self.element.addClass("usw-skoslist");

	        //create the list element to hold the results
	        $("<ul/>").appendTo(self.element);

	        // fire	an event when any results link is clicked
	        $(self.element).on("click", "a", function (e) {
	            var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
	            $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
	            e.preventDefault();  // don't follow links
	            return false;
	        });

	        self._refresh();
	    },

	    // put this.element	back to	how	it was
	    destroy: function () {
	        self.element.removeClass("usw-skoslist");
	        //$.Widget.prototype.destroy.call(this);
	    },

	    // set an option after control has loaded
	    _setOption: function (key, value) {
	        var self = this;

	        // clean up input
	        key = $.trim(key || '');
	        value = $.trim(value || '');

	        // do nothing if same value	is passed for key
	        if (value === self.options[key]) {
	            return;
	        }

	        // change the option value 
	        self.options[key] = value;
	        self._refresh();
	    },

	    _refresh: function () {
	        var self = this;

	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey();
	        if (!key) {
	            return;
	        }
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }
	        else {

	            // appear blocked while refereshing results
	            //self.element.waitable({ waiting: true });

	            // build the SPARQL query and execute the AJAX the call
	            var sparql = self.getSPARQL();

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
	        }
	    },

	    // default key, but may be overriden by inherited widgets
	    getLocalStorageKey: function () {
	        if ($.trim(this.options.conceptURI) !== "") {
	            return this.options.conceptURI + "@" + this.options.language;
	        }
	        else {
	            return null;
	        }
	    },

	    // expecting data to contain uri, label, language
	    ajaxSuccess: function (data, textStatus, jqXHR) {
	        var self = this;
	
	        // cache retrieved data for next time...
	        var key = self.getLocalStorageKey();
	        if (key) {
	            $.data(self.element, key, data);
	        }

	        // items may already be sorted, but ensure (case insensitive) sorting prior to display
	        data.results.bindings.sort(function (a, b) {
	            return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
	        });

	        var list = $("ul:first", self.element).html("");

	        // add each item to the list (as a listitem!)
	        $(data.results.bindings).each(function (index, item) {
	            var uri = item.uri ? item.uri.value : "";
	            var label = usw.util.htmlEscape(item.label.value);
	            var language = item.label["xml:lang"];

	            // if uri is blank it's a literal value, otherwise create a link
	            if (uri === "") {
	                $("<li xml:lang='" + language + "'>" + label + "</li>")
                        .appendTo(list); 
	            }
	            else {
	                $("<li><a class='concept' href='" + uri + "' xml:lang='" + language + "'>" + label + "</a></li>")
		                .appendTo(list);	                
	            }
	        });
	    },     

	    ajaxError: function (jqXHR, textStatus, errorThrown) {
	        var self = this;
	        //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
	    },

	    ajaxComplete: function (jqXHR, textStatus) {
	        var	self = this;
	        $(self.element).waitable({ "waiting": false });
	        //$(self.element).unblock();
	    }        

	});	// end of widget code

	// elements of class usw-skoslist become a widget
	$(window).load(function () {
	    $(".usw-skoslist").skoslist(); 
	});

})(jQuery);	//end of main jquery closure
 