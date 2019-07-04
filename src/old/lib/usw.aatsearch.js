/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatsearch
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js, usw.searchform.js, usw.aatsearchresult.js
Example	: <div class="usw-aatsearch2"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015 CFB created script
28/04/2015 CFB Converted to composite (as aatsearchform and aatsearchresult) 
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma

    $.widget("usw.aatsearch", {	// start of widget code 

        // default options
        options: {
            searchfor: ""
        },

        // override default key
        getLocalStorageKey: function () {
            if (this.options.searchfor.trim() !== "") {
                return this.options.searchfor + "@" + this.options.language;
            }
            return null;
        },

        _create: function (options) {
            var self = this;

            // override	default	options	with any passed	in
            self.options = $.extend(self.options, options);

            // style the widget
            $(self.element).css({
                "margin": "0px",
                "padding": "0px",
                "border": "0px"               
            });

            // build the composite control
            var searchForm = $("<div class='usw-searchform'/>")
                .appendTo(self.element)
                .css({ "margin-bottom": "2px"})
                .searchform(self.options);

            var searchResult = $("<div class='usw-aatsearchresult'/>")
                .appendTo(self.element)
                .aatsearchresult(self.options);
                        
            // what to do if a search is submitted
            $(searchForm).on("submit", function (e, data) {
                e.preventDefault(); // don't redirect on form submission
                $(searchResult).aatsearchresult({ searchfor: data.searchfor });
                return false;
            });

            // pass on the 'selected' event 
            $(searchResult).on("selected", function (e, data) {
                $(this.element).trigger("selected", data);               
            });           

            // overridden base "create" function, so call that now
            this._super(options);
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
        _refresh: function () {
            var self = this;
            
            $(".usw-searchform:first", self.element).searchform(self.options);
            $(".usw-aatsearchresult:first", self.element).aatsearchresult(self.options);            
        }

    });	// end of widget code

    // any elements of class usw-aatsearch2 automatically become one...
    $(window).load(function () {
        $(".usw-aatsearch").aatsearch();
    });

}(jQuery));	//end of main jquery closure
