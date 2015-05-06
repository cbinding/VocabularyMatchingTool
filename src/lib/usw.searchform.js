/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.searchform
Summary	: Search box and button (used with usw.aatsearch.js and usw.skossearch.js)
Require	: jquery, jquery-ui
Example	: <div class="usw.searchform"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma
   
	$.widget("usw.searchform", {	// start of widget code 
		
		// default options
	    options: {
	        placeholder: "Search..."          
	    },

	    // resize controls
	    resize: function () {
	        var self = this;

	        var searchForm = $("form:first", self.element);
	        var searchBox = $("input[type='search']:first", searchForm);
	        var searchButton = $("input[type='submit']:first", searchForm);
	        searchForm.width($(self.element).parent().width());
	        searchBox.width(searchForm.width() - (searchButton.outerWidth() + 6));
	    },

	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);        

	        // build the search	form	        
	       $("<form><input type='search'><input type='submit' value='Go'></form>")
                .appendTo(self.element)
                .css({
                    width: $(self.element).parent().width(),
                    padding: "0px",
                    margin: "0px"
                });          

	        // set up the 'Go' button
	        $("input[type='submit']:first", self.element)
                .css({
                    position: "absolute",                    
                    margin: "0px 2px"
                })
                .click(function (e) {                    
                    var searchText = searchInput.val().trim();
                    if (searchText !== self.options.placeholder && searchText !== "") {
                        $(self.element).trigger('submit', { "searchfor": searchText });
                        //alert(searchText);                        
                    }
                    e.preventDefault();
                    return false;
                });

	        // set up the search input box
	        var searchInput = $("input[type='search']:first", self.element)
                .attr({
                    placeholder: self.options.placeholder, //default text when empty
                    autocomplete: "on",
                    results: 5
                });                

	        // initial resize for layout
	        self.resize();

	        // resize whenever window resizes
	        $(window).resize(function () {
	            self.resize();
	        });

	        return self;
	    },

	    
		
	});	// end of widget code

	// elements of class usw.searchform become one
	$(window).load(function () {
	    $(".usw.searchform").searchform(); 
	});

}(jQuery));	//end of main jquery closure
