/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales
Project	: ARIADNE
Classes	: usw.skosconceptdetails
Version	: 20150223
Summary	: display details of a single concept based	on conceptURI
Require	: jquery, jquery-ui
Example	: <div class='usw-skosconceptdetails'></div>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
23/02/2015	CFB Script adapted from usw.seneschal.conceptdetails.js
===============================================================================
*/
(function ($) {	// start of	main jQuery	closure
	"use strict"; // strict	mode pragma
	$.support.cors = true;

	$.widget('usw.skosconceptdetails', {

		//Default options
		options: {
		    //conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131", //example
		    conceptURI: "", 
		},

		// Called on initialization
		_create: function (options)	{
		    var self = this;		    

			// override	default	options	with any passed	in
		    self.options = $.extend(self.options, options);		    

			$(self.element).css({
			    border: "1px solid gray",
			    "overflow-y": "scroll",
			    "padding": "3px",
                "height": "150px"
			});

            // build the composite control
			$("<span class='usw-skosbroader'/>").appendTo(self.element);
			$("<span class='fa fa-arrow-right'/>").appendTo(self.element).css({ "margin": "0px 3px" });                
		    $("<span class='usw-skospreflabels'/>").appendTo(self.element).css({ "font-weight": "bold" });
		    $("<span class='usw-skosaltlabels'/>").appendTo(self.element).css({ "font-style": "italic", "margin": "0px 3px" });
		    $("<div	class='usw-skosscopenotes'/>").appendTo(self.element).css({ "margin": "3px 0px" });
			$("<span class='usw-skosnarrower'/>").appendTo(self.element);
			$("<span class='usw-skosrelated'/>").appendTo(self.element);

            // set up the individual controls
			$(".usw-skospreflabels:first", self.element).skospreflabels(self.options);
			$(".usw-skosaltlabels:first", self.element).skosaltlabels(self.options);
			$(".usw-skosscopenotes:first", self.element).skosscopenotes(self.options);
			$(".usw-skosbroader:first", self.element).skosbroader(self.options);
			$(".usw-skosnarrower:first", self.element).skosnarrower(self.options);
			$(".usw-skosrelated:first", self.element).skosrelated(self.options);

			$(".usw-skosbroader, .usw-skosnarrower, .usw-skosrelated").on("click", "a", function (e) {
			    var uri = $(this).attr('href'), label = $(this).text(), language = $(this).attr('xml:lang');
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
		    else {
		        // change the option value 
		        self.options[key] = value;
		        self._refresh();
		    }
		},

	    // redraw the control
		_refresh: function() {
		    var self = this;

		    if (self.options.conceptURI.trim() === "")
		        return;

		    $(".usw-skospreflabels:first", self.element).skospreflabels(self.options);
		    $(".usw-skosaltlabels:first", self.element).skosaltlabels(self.options);
		    $(".usw-skosscopenotes:first", self.element).skosscopenotes(self.options);
		    $(".usw-skosbroader:first", self.element).skosbroader(self.options);
		    $(".usw-skosnarrower:first", self.element).skosnarrower(self.options);
		    $(".usw-skosrelated:first", self.element).skosrelated(self.options);
		},
		
	});	//end of usw.skosconceptdetails

	// any elements with class usw-skosconceptdetails automatically become one
	$(window).load(function(){
		$(".usw-skosconceptdetails").skosconceptdetails();
	});

}(jQuery));	//end of main jQuery closure
