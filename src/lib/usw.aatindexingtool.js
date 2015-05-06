/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatindexingtool
Version	: 20150422
Summary	: Allow search/browse selection of AAT concepts for use in ARIADNE
Require	: jquery, jquery-ui, usw.aatsearchform.js, usw.aatsearchresult.js etc.
Example	:<input class="usw-aatindexingtool" />
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
22/04/2015 CFB initially created script
29/04/2015 CFB Singleton pattern - only one aatindexingtool in document body
===============================================================================
*/
(function ($) { //start of main jquery closure
    "use strict"; // strict	mode pragma
    $.support.cors = true;

    $.widget("usw.aatindexingtool", { // start of widget code

        // default options
        options: {
            endpointURI: "http://vocab.getty.edu/sparql",   //sparql endpoint URI
            language: "en", // values: "en" (default), "es", "de", "nl" etc.
            fallback: "en", // fallback language if chosen language label is not present
            limit: 100, // for restricting number of results (0 = no limit)
            offset: 0, // for future implementation of paging (0 = no offset)	
            searchfor: "" // what to search for...
        },        

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            // singleton - if one already exists don't create another one
            if ($("div#aatindexingtool", document.body).length) { return; }

            // container for the composite controls
            var container = $("<div/>")
                .attr({ id: "aatindexingtool" })
                .appendTo(document.body)
                .css({
                    position: "absolute",
                    border: "1px solid gray",
                    background: "white",
                    padding: "2px",
                    width: "400px",
                    height: "400px",
                    display: "none" // initially hidden
                });

            // add all controls to the container
            $("<div class='usw-aatsearch'/>")
                .appendTo(container)
                .css({ "width": "400px" })
                .aatsearch(self.options);

            $("<div class='usw-aatconceptdetails'/>")
                .appendTo(container)
                .aatconceptdetails(self.options);

            $("<div><label>Selected:</label><span class='usw-aatindexingtool-selected'>&nbsp;</span></div>")
                .css({ margin: 5 })
                .appendTo(container);

            var controls = $("<div></div>")
                .css({ margin: "5px", float: "right" })
                .appendTo(container);

            $("<input type='button' class='usw-aatindexingtool-save' value='Save'/>")
                .appendTo(controls);

            $("<input type='button' class='usw-aatindexingtool-close' value='Close'/>")
                .css({ margin: 2 })
                .appendTo(controls);
            
          // refresh displayed concept if a concept is selected from search results
          // $(".usw-aatsearchresult:first", container).on("selected", function (e, data) {
          $(".usw-aatsearch:first", container).on("selected", function (e, data) {
                $(".usw-aatconceptdetails:first", container).aatconceptdetails({ conceptURI: data.uri });

                // build and display element based on currently selected concept
                var element = $("<a></a>")
                    .attr({ href: data.uri, target: "_blank" })
                    .css({display: "inline"})
                    .text(data.label)
                    .on("click", function(e) {
                        e.preventDefault();
                        return false;
                    });
                $(".usw-aatindexingtool-selected:first", container).html(element);
            });

            $(".usw-aatconceptdetails:first", container).on("selected", function (e, data) {
            
                // build and display element based on currently selected concept
                var element = $("<a></a>")
                    .attr({ href: data.uri, target: "_blank" })
                    .css({ display: "inline" })
                    .text(data.label)
                    .on("click", function (e) {
                        e.preventDefault();
                        return false;
                    });
                $(".usw-aatindexingtool-selected:first", container).html(element);
            });


            // what to do when 'Save' is clicked
            $(".usw-aatindexingtool-save:first", container).on("click", function (e, data) {
                var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
                $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });

                // what type is original element? if its an input, set 'val'. if its a  div or span, set 'html'
                if ($(self.element).is("input")) { $(self.element).val($(".usw-aatindexingtool-selected:first", container).text()); }
                else if ($(self.element).is("div") || $(self.element).is("span")) { $(self.element).html($(".usw-aatindexingtool-selected:first", container).html()); }
                else { $(self.element).text($(".usw-aatindexingtool-selected:first", container).text()); }

                container.fadeOut("fast");
            });

            // what to do when 'Close' is clicked
            $(".usw-aatindexingtool-close:first", container).on("click", function (e, data) {
                container.fadeOut("fast");
            });

            // display the control in approriate position when matching element is clicked
            $(".usw-aatindexingtool", document.body).on("click", function (e, data) {
                self.element = this; // set current element to be the one that was clicked
                container.css({
                    left: $(this).offset().left,
                    top: parseInt($(this).offset().top) + $(this).outerHeight()
                }).fadeIn("fast");
            });

            // reposition if necessary when window resizes
            $(window).resize(function () {                
                container.css({
                    left: $(self.element).offset().left,
                    top: parseInt($(self.element).offset().top) + $(self.element).outerHeight()
                });
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

        // refresh the controls
        _refresh: function () {
            $(this).aatindexingtool(this.options);
        },

    });	// end of widget code

    // any elements of class usw-aatindexingtool automatically become one...
    $(window).load(function () {
        $(".usw-aatindexingtool").aatindexingtool();
    });

}(jQuery));	// end of main jquery closure