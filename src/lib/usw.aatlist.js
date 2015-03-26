/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatlist
Version	: 20150205
Summary	: List of AAT concepts - base widget for many others...
Require	: jquery, jquery-ui
Example	: <div class="usw-aatlist"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.aatlist", {	// start of widget code 
		
	    // default options
	    options: {
	        endpointURI: "http://vocab.getty.edu/sparql",   //sparql endpoint URI
            useCache: true, // cache responses to prevent repeated requests (not working...)
	        language: "en", // values: "en" (default), "es", "de", "nl" etc.
	        fallback: "en", // fallback language if chosen language label is not present
	        limit: 100, // for restricting number of results (0 = no limit)
	        offset: 0 // for implementation of paging (0 = no offset)	 
	    },

	    // initialization code (runs once only)
	    _create: function (options) {
	        var self = this;
	        self.options = $.extend({}, self.options, options);

	        self.element.addClass("usw-aatlist");
	        
	        //create the list element to hold the results
	        $("<ul/>").appendTo(self.element);               

	        // fire	an event when any results link is clicked
	        $(self.element).on("click", "a", function (e) {	            
	            var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
	            $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
	            e.preventDefault();  // don't follow links
	        });
	        
	        self._refresh();
	    },		

	    // put this.element	back to	how	it was
	    destroy: function () {
	        self.element.removeClass("usw-aatlist");
	        //$.Widget.prototype.destroy.call(this);
	    },

	    // set an option after control has loaded
	    _setOption:	function(key, value) {
	        var	self = this;

	        // clean up input
	        key	= $.trim(key ||	'');
	        value =	$.trim(value ||	'');

	        // do nothing if same value	is passed for key
	        if (value === self.options[key]) {
	            return;
	        }

	        // change the option value 
	        self.options[key] = value;
	        self._refresh();
	    },

	    // expecting sparql query to get: uri, label
	    _getData: function(sparql) {
	        var	self = this;    	   

	        // make the call
	        $.support.cors = true;
	        $.ajax({
	            method: "GET",
	            crossDomain: true,
	            url: self.options.endpointURI,
	            data: { format: "json", query: sparql },
	            context: self,
	            cache: self.options.useCache,             
	            success: self.ajaxSuccess, 
	            error: self.ajaxError, 
	            complete: self.ajaxComplete,
	        }); // end ajax call		    
	    },       

		// override _refresh() in widgets 
	    _refresh: function () { },

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
		    var key = self.options.conceptURI + "@" + self.options.language;
		    $.data(self.element, key, data);

		    // items may already be sorted, but ensure (case insensitive) sorting prior to display
		    data.results.bindings.sort(function (a, b) {
		        return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
		    });

            // get reference to the results list and clear it
		    var list = $("ul:first", self.element).html("");

		    // add each item to the list as a listitem
		    $(data.results.bindings).each(function (index, item) {		         
		        // GVP server returns iso-8859-1 strings even if we ask for utf-8: so converting here to utf-8
		        var value = usw.util.iso2utf(item.label.value);
		        // if uri is blank it's a literal value, otherwise create a link
		        if (item.uri.value === "") {
		            $("<li xml:lang='" + item.label["xml:lang"] + "'>" + usw.util.htmlEscape(value) + "</li>")
                        .appendTo(list); //.css({ "display": "inline", "margin": "0px 3px" });
		        }
		        else {
		            $("<li><a href='" + item.uri.value + "' xml:lang='" + item.label["xml:lang"] + "'>" + usw.util.htmlEscape(value) + "</a></li>")
		                .appendTo(list);
                        /*.css({
                            "display": "inline",
                            "margin": "0px 3px",
                            "background": "whitesmoke"
                        });*/
		        }
		    });
		} ,     

		ajaxError: function (jqXHR, textStatus, errorThrown) {
		    var self = this;
		    //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
            //log errorThrown?
		},

		ajaxComplete: function (jqXHR, textStatus) {
	        var	self = this;
	        //$(self.element).waitable({ "waiting": false });
	        //$(self.element).unblock();
	    }

	});	// end of widget code

	// any elements of class usw-aatlist automatically become one...
	$(window).load(function () {
	    $(".usw-aatlist").aatlist(); 
	});

})(jQuery);	//end of main jquery closure
