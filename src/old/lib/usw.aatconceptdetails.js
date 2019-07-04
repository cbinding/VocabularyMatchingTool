/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatconceptdetails
Version	: 20150223
Summary	: display details of a single concept based	on conceptURI
Require	: jquery, jquery-ui
Example	: <div class='usw-aatconceptdetails'/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
23/02/2015	CFB Script adapted from usw.seneschal.conceptdetails.js
===============================================================================
*/
(function ($) {	// start of	main jQuery	closure
	"use strict"; // strict	mode pragma
	$.support.cors = true;

	$.widget('usw.aatconceptdetails', {

		//Default options
		options: {
		    //conceptURI: "http://vocab.getty.edu/aat/300193015", //example	
		    conceptURI: "",
            language: "en"
		},

		// Called on initialization
		_create: function (options)	{
		    var self = this;
		    
			// override	default	options	with any passed	in
			self.options = $.extend(self.options, options);

            // style the widget
			$(self.element).css({
			    border: "1px solid gray",
			    "overflow-y": "scroll",
			    "padding": "3px",
                "height": "150px"
			});

            // build the composite control
			$("<span class='usw-aatbroader'/>").appendTo(self.element);
			$("<span class='fa fa-arrow-right'/>").appendTo(self.element).css({ "margin": "0px 3px" });                
		    $("<span class='usw-aatpreflabels'/>").appendTo(self.element).css({ "font-weight": "bold" });
		    $("<span class='usw-aataltlabels'/>").appendTo(self.element).css({ "font-style": "italic", "margin": "0px 3px" });
		    $("<div	class='usw-aatscopenotes'/>").appendTo(self.element).css({ "margin": "3px 0px" });
		    $("<span class='usw-aatnarrower'/>").appendTo(self.element);
			$("<span class='usw-aatrelated'/>").appendTo(self.element);

            // set up the individual controls
			$(".usw-aatpreflabels:first", self.element).aatpreflabels(self.options);
			$(".usw-aataltlabels:first", self.element).aataltlabels(self.options);
			$(".usw-aatscopenotes:first", self.element).aatscopenotes(self.options);
			$(".usw-aatbroader:first", self.element).aatbroader(self.options);
			$(".usw-aatnarrower:first", self.element).aatnarrower(self.options);
			$(".usw-aatrelated:first", self.element).aatrelated(self.options);

			// refresh controls if a concept is selected
			$(".usw-aatbroader, .usw-aatnarrower, .usw-aatrelated").on("click", "a", function (e) {
			    var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
			    $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
			    self._setOption("conceptURI", uri);

			    // don't follow links
			    e.preventDefault();
			    return false;
			});           
		},

	    // set an option after control has loaded
		_setOption: function (key, value) {
		    var self = this;

		    // clean up input
		    key = $.trim(key || '');
		    value = $.trim(value || '');

		    if (value === self.options[key]) {
		        // do nothing if same value	is passed for key
		        return;
		    }

		    // change the option value 
		    self.options[key] = value;
		    self._refresh();		    
		},

	    // redraw the control
		_refresh: function() {
		    var self = this;

		    if (self.options.conceptURI.trim() === "") { return; }

		    $(".usw-aatpreflabels:first", self.element).aatpreflabels(self.options);
		    $(".usw-aataltlabels:first", self.element).aataltlabels(self.options);
		    $(".usw-aatscopenotes:first", self.element).aatscopenotes(self.options);
		    $(".usw-aatbroader:first", self.element).aatbroader(self.options);
		    $(".usw-aatnarrower:first", self.element).aatnarrower(self.options);
		    $(".usw-aatrelated:first", self.element).aatrelated(self.options);
		}
		
	});	//end of usw.aatconceptdetails

	// any elements with class usw-aatconceptdetails automatically become one
	$(window).load(function(){
		$(".usw-aatconceptdetails").aatconceptdetails();
	});

}(jQuery));	//end of main jQuery closure
