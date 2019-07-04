/*jslint browser: true, nomen: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales
Project	: SENESCHAL
Classes	: usw.waitable.js
Version	: 20140115
Summary	: Allows controls to appear	visually 'blocked',	preventing interaction
		  and displaying an	animation while	waiting	for	something to happen
          useful for asynchronous data loading in individual components
Require	: jquery, jquery.ui, fontawesome
Example	: $("#div3").waitable({waiting: true});
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
05/02/2015 CFB Initially created script, adapted from usw.seneschal.waitable.js
21/04/2015 CFB Using font-awesome for spinner element. Resize when window resizes
===============================================================================
*/
(function($) { //start of main jquery closure
	"use strict"; // strict	mode pragma

	$.widget("usw.waitable", { // start of widget code

		// stateful	defaults
		options: {
			waiting: false
		},

		// initialization code (runs once only)
		_create: function(options) {
			var	self = this;
			
		    // override	default	options	with any passed	in
			self.options = $.extend(self.options, options);

            // set up the overlay element
			self.divWaiting = $("<div><i/></div>")
	            .css({
	                position: "absolute",
				    margin: 0,
				    padding: 0,
				    border: 0,
				    background: "lightgray",
				    opacity: 0.9,
                    display: "none"
	            })
                .prependTo(self.element);

            // set up the spinner element
			$("i:first", self.element)
                .css({
                    position: "absolute",
                    margin: 0,
                    padding: 0,
                    border: 0,
                    background: "lightgray"                           
                })
                .addClass("fa fa-spinner fa-pulse");

		    // resize/reposition things when window resizes
			$(window).resize(function () {
			    self._refresh();
			});

			self._refresh();
		},

		// set an option after control has loaded
		_setOption: function (key, value) {
		    var self = this;
		    // change the option value 
		    self.options[key] = value;
		    self._refresh();
		},

		// redraw the control
		_refresh: function() {
		    var self = this;		    

		    // show or hide based on options.waiting
		    if (self.options.waiting === true) {

                // position and size the container
		        self.divWaiting.css({		        
		            left: self.element.position.left,
		            top: self.element.position.top,
		            width: self.element.width(),
		            height: self.element.height()
		        });

                // position and size the spinner
		        $("i:first", self.element).css({
		            left: (self.element.width() - 16) / 2,
		            top: (self.element.height() - 16) / 2,
		            width: 16,
		            height: 16
		        });
		        self.divWaiting.fadeIn("fast");
		    }
		    else {
		        self.divWaiting.fadeOut("fast");
		    }
		}

	});	// end of widget code

    // any elements of class usw-waitable automatically become one...
	$(window).load(function () {
	    $(".usw-waitable").waitable();
	});
}(jQuery));	//end of main jquery closure
