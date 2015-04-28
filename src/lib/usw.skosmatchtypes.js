/*jslint browser: true, nomen: true, white: true, unparam: true  */
/*global $, jQuery, alert, usw*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales
Project	: ARIADNE
Classes	: usw.skosmatchtypes
Version	: 20150313
Summary	: List of SKOS mapping relationships
Require	: jquery, jquery.ui.widget.min.js, usw.uri.js
Example	: <div class="usw-skosmatchtypes"/>
License	: http://creativecommons.org/licenses/by/3.0/
===============================================================================
History
13/03/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma	
    
    $.widget("usw.skosmatchtypes", {	// start of widget code
        
        options: {
            value: usw.uri.SKOS.CLOSEMATCH,
            label: "close match"
        },

        // initialization
        _create: function (options) {
            var self = this;
            var matchTypes = $("<select class='matchTypes'>"
                + "<option value='" + usw.uri.SKOS.EXACTMATCH + "'>exact match</option>"
                + "<option value='" + usw.uri.SKOS.CLOSEMATCH + "' selected>close match</option>"
                + "<option value='" + usw.uri.SKOS.BROADMATCH + "'>broad match</option>"
                + "<option value='" + usw.uri.SKOS.NARROWMATCH + "'>narrow match</option>"
                + "<option value='" + usw.uri.SKOS.RELATEDMATCH + "'>related match</option>"
                + "</select>")
                .css({
                    border: "1px solid gray",
                    cursor: "pointer"
                }).appendTo(self.element);

            // store values when a new selection is made
            matchTypes.on("change", function () {
                self.options.value = $(this).val();
                self.options.label = $("option:selected", this).text();
                // notify interested controls that a new selection has been made
                $(self.element).trigger("selected", { "uri": self.options.value, "label": self.options.label });
            });
        }
    }); // end widget usw.skosmatchtypes
    
    // elements of class usw-skosmatchtypes become a widget
    $(window).load(function () {
        $(".usw-skosmatchtypes").skosmatchtypes();
    });

})(jQuery);	//end of main jquery closure
