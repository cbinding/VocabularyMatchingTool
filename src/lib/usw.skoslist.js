/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skoslist
Version	: 20150205
Summary	: Base list widget - used by many others...
Require	: jquery, jquery-ui
Example	: <div class="usw-skoslist"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skoslist", {	// start of widget code 
		
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
	        self.options = $.extend(self.options, options);

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
	        self.element.removeClass("usw-aatlist");
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

	    // override _refresh() in widgets 
	    _refresh: function () { },
	        
	    // expecting sparql query to get: uri, label
	    _getData: function(sparql) {
	        var self = this;
	        
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

        // default, may be overriden in inherited widgets
	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.conceptURI + "@" + self.options.language; //default
	        return key;
	    },

	    // expecting data to contain uri, label, language
	    ajaxSuccess: function (data, textStatus, jqXHR) {
	        var self = this;
	
	        // cache the retrieved data for next time...
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        $.data(self.element, key, data);

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
	                $("<li><a href='" + uri + "' xml:lang='" + language + "'>" + label + "</a></li>")
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
	        //$(self.element).waitable({ "waiting": false });
	        //$(self.element).unblock();
	    }        

	});	// end of widget code

	// elements of class usw-skoslist become a widget
	$(window).load(function () {
	    $(".usw-skoslist").skoslist(); 
	});

})(jQuery);	//end of main jquery closure
 