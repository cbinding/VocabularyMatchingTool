/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatsearch
Version	: 20150205
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatsearch"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma
    
	$.widget("usw.aatsearch", $.usw.aatlist, {	// start of widget code 
		
		// default options
	    options: {
	       searchfor: ""	       
	    },	    

	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);

	        $(self.element).css({
	            "overflow-y": "scroll",
	            "padding": "3px",
	            "height": "150px"
	        });
	       
	        // build the search	form and results box
	        $("<form><input type='search' placeholder='Search...' autocomplete='on' /></form>").appendTo(self.element).css({margin: "0px"});

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

		// redraw the control
		_refresh: function() {
		    var self = this;

            // if nothing to search for, don't proceed
		    if (self.options.searchfor.trim() == "")
		        return;

		    // if we have cached data use that; don't do the ajax call 
		    // (as the browser cache doesn't seem to work with AAT SPARQL calls)
		    if ($.data(self.element, self.options.searchfor)) {
		        self.ajaxSuccess($.data(self.element, self.options.searchfor), "from cache", {});
		        return;
		    }

		    //	build a sparql query to get the data, filtering by language,
		    // supplying a fallback if required language label is not present
		    var limit = parseInt(self.options.limit, 10);
		    var offset = parseInt(self.options.offset, 10);

		    var sparql = "PREFIX aat: <http://vocab.getty.edu/aat/>"
		        + " PREFIX luc: <http://www.ontotext.com/owlim/lucene#>"
                + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:inScheme aat: ; luc:term '" + self.options.searchfor + "'; skosxl:prefLabel [skosxl:literalForm ?label]"
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");                
		    self._getData(sparql);
		}	// end _refresh		

	});	// end of widget code

	// any elements of class usw-aatsearch automatically become one...
	$(window).load(function () {
	    $(".usw-aatsearch").aatsearch(); 
	});

})(jQuery);	//end of main jquery closure
