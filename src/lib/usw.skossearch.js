/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skossearch
Version	: 20150205
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skossearch"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma
    
	$.widget("usw.skossearch", $.usw.skoslist, {	// start of widget code 
		
		// default options
	    options: {
	        schemeURI: "", //example
	        searchfor: "", 
           
	    },	    

	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);

	        $(self.element).css({
	            "overflow-y": "scroll",
	            "padding": "3px",
	            "height": "150px"
	        });
	       
	        // build and attach the search form
	        $("<form><input type='search' placeholder='Search...' autocomplete='on' /></form>")
                .css({ margin: "0px" })
                .appendTo(self.element); 
            
            // style the search box
	        $("input[type='search']:first", self.element)
				.css({
				    padding: "2px",
				    width: "99%",
				    border: "1px solid lightgray"
				});
	       
	        // what	to do when form	is submitted
	        $("form:first", self.element).submit(function (e) {
	            e.preventDefault(); // don't redirect on form submission
	            var searchText = $("input[type='search']:first", self.element).val().trim();
	            if (searchText !== self.options.placeholder && searchText !== "") {
	               
	                self._setOption("searchfor", searchText);	                
	                self._refresh();	                
	            }
	            return false;
	        });
	       
            // resize internal controls when window resizes
	        $(window).resize(function () {
	            $("form:first", self.element).css({ "width": "99%" });	            
	        });

	        // overridden base "create" function, so call that now
	        this._super(options);
	    },

	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.schemeURI + "@" + self.options.searchfor + "@" + self.options.language;
	        return key;
	    },
		// redraw the control
		_refresh: function() {
		    var	self = this;		   

		    $("ul:first", self.element).html(""); //clears any existing results

		    // if nothing to search for, don't proceed
		    if (self.options.searchfor.trim() == "")
		        return;

		    // if we have cached data use that; don't do the ajax call 
		    // (as the browser cache doesn't seem to work with AAT SPARQL calls)
		    var key = self.getLocalStorageKey(); 
		    if ($.data(self.element, key)) {
		        self.ajaxSuccess($.data(self.element, key), "from cache", {});
		        return;
		    }

		    //	build a sparql query to get the data, filtering by language,
		    // supplying a fallback if required language label is not present
		    var limit = parseInt(self.options.limit, 10);
		    var offset = parseInt(self.options.offset, 10);

		    var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
		        + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:inScheme <" + self.options.schemeURI + ">"
                + " { ?uri skos:prefLabel ?label } UNION { ?uri skos:altLabel ?label }"					
				+ "	FILTER(REGEX(?label, '" + self.options.searchfor + "', 'i'))"
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }";	               
		        + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");
		    self._getData(sparql);
		}	// end _refresh		

	});	// end of widget code

	// any elements of class usw-skossearch automatically become one...
	$(window).load(function () {
	    $(".usw-skossearch").skossearch(); 
	});

})(jQuery);	//end of main jquery closure
