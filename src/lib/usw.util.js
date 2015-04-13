/*
===============================================================================
Creator	: Ceri Binding, University of South	Wales
Project	: ANY
Classes	: usw.util
Summary	: General static utility functions
Example	: var degrees =	usw.util.radians2degrees(3);
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History	:
15/01/2014	CFB	Adapted from usw.seneschal.uti.js
===============================================================================
*/

// set up base namespace
var usw	= this.usw || {};

(function () {	// start of	main javascript	closure
	"use strict"; // strict	mode pragma

	// general static utility functions
	usw.util = {

		// Convert radians into	degrees.
		// Usage: degrees =	usw.seneschal.util.radians2degrees(3);
		radians2degrees: function (radians)	{
			return (parseFloat(radians || 0) * (180	/ Math.PI));
		},	// end function 'radianstodegrees'

		// Convert degrees into	radians.
		// Usage: radians =	usw.seneschal.degrees2radians(33);
		degrees2radians: function (degrees)	{
			return (parseFloat(degrees || 0) * (Math.PI	/ 180));
		},	// end function 'degreestoradians'

		// Confine value to	within a specified range (like 'clamp')
		// Usage: val =	usw.seneschal.confine(val, 1, 100);
		confine: function (val,	min, max) {
			if (val	< min) { return	min; }
			if (val	> max) { return	max; }
			return val;
		},	// end function 'confine'

		// from	"Javascript: The Good Parts" (Douglas Crockford)
		// allows functions to handle single values OR arrays of values
		isarray: function(value) {
			return value &&
				typeof value === 'object' &&
				typeof value.length	===	'number' &&
				typeof value.splice	===	'function' &&
				!(value.propertyIsEnumerable('length'));
		},	// end function 'isarray'

		// include css or js into web page.	Function obtained from web, origin uncertain
		// Ensure prerequisites will be present. Usage: usw.util.include(myscript.js);
		include: function (url) {
			var element, head;

			switch(url.split(".").pop()) {
				case "css":
					element = document.createElement("link");
					element.setAttribute("rel", "stylesheet");
					element.setAttribute("type", "text/css");
					element.setAttribute("href", url);
					break;
				case "js":
					element = document.createElement("script");
					element.setAttribute("language", "javascript");
					element.setAttribute("src", url);
					break;
				default:
					if (window.console) {
						window.console.error("could not identify", url, "skip include");
					}
					return;
			}
			head = document.querySelector("head");
			if (head.innerHTML.indexOf(element.outerHTML )!== -1) {
				if (window.console) {
					 window.console.warn("Duplicate include, skipping: ", url);
				}
			}
			else {
				head.appendChild(element);
			}
		},	// end function 'include'

		// Generate	positive random	integer	up to specified	range
		// Usage: var x = usw.seneschal.util.random(50);
		random:	function (range) {
			return Math.floor(Math.random()	* parseInt(range, 10));
		},	// end function 'random'

		// Create log element and append text for display
		// Usage: usw.seneschal.util.log("hello	world");
		log: function (txt)	{
			var element = document.getElementById('usw-util-log'),
				msg	= document.createElement('div');

			if(!element) {
				// create div#usw-seneschal-util-log if it didn't already exist
				element	= document.createElement('div');
				element.setAttribute('id', 'usw-util-log');
				element.style.border='thin solid gray';
				element.style.margin='3px';
				element.style.height='200px';
				element.style.background='lightyellow';
				element.style.overflow='scroll';
				element.appendChild(document.createTextNode('Log'));
				document.body.appendChild(element);
			}
			// append new timestamped message to div#usw-seneschal-util-log
			msg.style.borderTop='thin solid lightgray';
			msg.appendChild(document.createTextNode(new	Date().toLocaleString()	+ '	' +	txt));
			element.appendChild(msg);
		},	// end function 'log'

		// http://stackoverflow.com/questions/5396560/how-do-i-convert-special-utf-8-chars-to-their-iso-8859-1-equivalent-using-javasc
		// convert ISO8859-1 to UTF-8 string (but works other way round??)
		iso2utf: function(iso) {
			var utf=iso;
			try{
				utf=decodeURIComponent(escape(iso));
			} catch(e){ }

			return utf;
		},

		// convert UTF-8 to ISO-8859-1 string
		utf2iso: function(utf) {
			var iso=utf;
			try{
				iso = unescape(encodeURIComponent(utf));
			} catch(e){ }

			return iso;
		},

	    // convert a javascript date to an xsd:dateTime value
        // deprecated - use instead: new Date().toISOString()
		xsdDateTime: function(date)
        {
            function pad(n) {
                var s = n.toString();
                return s.length < 2 ? '0'+s : s;
            }

            var yyyy = date.getFullYear();
            var mm1  = pad(date.getMonth()+1);
            var dd   = pad(date.getDate());
            var hh   = pad(date.getHours());
            var mm2  = pad(date.getMinutes());
            var ss   = pad(date.getSeconds());

            return yyyy +'-' +mm1 +'-' +dd +'T' +hh +':' +mm2 +':' +ss;
        },

		// strings from json may contain characters that can corrupt html display
		// so ensure escaping of any problem characters before attempting display
		// usage: s = usw.util.htmlEscape(s);
		htmlEscape: function(str) {
			return String(str)
					.replace(/&/g, '&amp;')
					.replace(/\"/g, '&quot;')
					.replace(/\'/g, '&#39;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
		}

	}; // end usw.seneschal.util

	// add trim, ltrim and rtrim functionality to String class
	// (but if using JQuery could just use $.trim(s) instead)
	String.prototype.trim = function ()	{
		return (this.replace(/^\s+|\s+$/g, ""));
	};
	String.prototype.ltrim = function () {
		return (this.replace(/^\s+/, ""));
	};
	String.prototype.rtrim = function () {
		return (this.replace(/\s+$/, ""));
	};

	// Add max and min functionality to	Array class
	// get the maximum value from an array
	Array.prototype.max	= function () {
		return Math.max.apply(Math,	this);
	};
	// get the minimum value from an array
	Array.prototype.min	= function () {
		return Math.min.apply(Math,	this);
	};

}()); // end of	main javascript	closure
