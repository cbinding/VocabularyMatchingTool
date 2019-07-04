/*jslint browser: true, nomen: true, white: true, unparam: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales
Project	: Any
Classes	: usw.footer.js
Summary	: Adds a text footer onto an element
Require	: jquery-2.1.3.min.js, jquery.ui.widget.min.js, jquery.event.resize.js
Example	:$('.tmp1').footer({text: 'my footer'});
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

06/06/2013	CFB	adapted from usw.seneschal.footer.js
===============================================================================
*/
(function($) { //start of main jQuery closure
	"use strict"; // strict	mode pragma

	 $.widget('usw.footer', {

			// stateful	defaults
			options: {
				text: "footer"				
			},

			// initialization code (runs once only)
			_create: function(options) {
				var	self = this;
				self.options = $.extend(self.options, options);

				// create and style	footer element
				self.footer	= $("<div></div>")
					.addClass("usw-footer")
					.insertAfter(self.element)
					.css({
						"width"	: $(self.element).width(),
						"margin-top" : "0px",
						"margin-left" :	$(self.element).css("margin-left"),
						"margin-right" : $(self.element).css("margin-right"),
						"margin-bottom"	: $(self.element).css("margin-bottom"),
						"font" : $(self.element).css("font"),
						"padding" :	"0px",
						"border-top" : "0px",
						"height" : "25px",
						"cursor" : "default"
					});
				$(self.element)
					.css({
					"margin-bottom": "0px"
					//"border-bottom": "0px"
				});


				$("<span class='usw-footer-text'>" + self.options.text + "</span>")
					.appendTo(self.footer)
					.css({
						"margin" : "3px",
						"float"	: "left"
					});

				$(self.element).resize(function() {
					self._refresh();
				});

				self._refresh();
			},	// end function '_create'


			// set an option after control has loaded
			_setOption:	function(key, value) {
				var	self = this;

				//clean	up input
				key	= $.trim(key ||	'');
				value =	$.trim(value ||	'');

				// do nothing if same value	is passed
				if(value === self.options[key])	{
					return;
				}

				// change the option value and refresh the widget
				self.options[key] =	value;
				self._refresh();
			},	// end function '_setOption'

			_refresh: function() {
				var	self = this;
				$(self.footer).width($(self.element).width());

				$(".usw-footer-text:first", self.footer).html(self.options.text);

				if(self.options.visible) {
					$(self.footer).show();
				}
				else {
					$(self.footer).hide();
				}
			},	// end function '_refresh'

			destroy: function()	{
				var	self = this;
				self.element.removeClass("usw-footer");
			}
		});	// end widget usw.footer

}(jQuery));	//end of main jQuery closure
