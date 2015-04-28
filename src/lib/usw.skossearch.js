/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skossearch
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js, usw.searchform.js, usw.skossearchresult.js
Example	: <div class="usw-skossearch"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015 CFB created script
28/04/2015 CFB Converted to composite (as searchform and skossearchresult) 
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma

    $.widget("usw.skossearch", {	// start of widget code 

        // default options
        options: {
            schemeURI: "http://purl.org/heritagedata/schemes/mda_obj", // example
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
                "border": "0px",
                //"height": "150px",
                width: self.element.parent().width()
            });

            // build the composite control
            var searchForm = $("<div class='usw-searchform'/>")
                .appendTo(self.element)
                .searchform(self.options);
            var searchResult = $("<div class='usw-skossearchresult'/>")
                .appendTo(self.element)
                .skossearchresult(self.options);

            // set up the individual controls
            //$(searchForm).searchform(self.options);
            //$(searchResult).skossearchresult(self.options);

            // what to do if a search is submitted
            $(searchForm).on("submit", function (e, data) {
                e.preventDefault(); // don't redirect on form submission
                $(searchResult).skossearchresult({ searchfor: data.searchfor });
                return false;
            });

            // pass on the 'selected' event 
            $(searchResult).on("selected", function (e, data) {
                //e.preventDefault(); // don't redirect 
                $(this.element).trigger("selected", data);
                //return false;
            });

            // resize internal controls if window resizes
            $(window).resize(function () {
                $("usw-searchform:first", self.element).css({ "width": "100%" });
                $("usw-skossearchresult:first", self.element).css({ "width": "100%" });
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
            $(".usw-skossearchresult:first", self.element).skossearchresult(self.options);
        }

    });	// end of widget code

    // any elements of class usw-skossearch2 automatically become one...
    $(window).load(function () {
        $(".usw-skossearch").skossearch();
    });

}(jQuery));	//end of main jquery closure
