/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
(function ($) { //start of main jQuery closure
    "use strict"; // strict	mode pragma

    $.widget('usw.fileselect', {

        // stateful	defaults
        options: {
            buttonText: "Export"
        },

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            $(self.element).html("<label for='file-select' class='custom-file-select'>" + self.options.buttonText + "</label><input id='file-select' type='file'/>");
            // hide the file control
            $("input[type='file']:first", self.element).css({ "display": "none" });
            // style the label control
            $("label:first", self.element)
                .css({
                    border: "1px solid #ccc",
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer"
                });            
        }

    });	// end widget usw.mappingsexport

}(jQuery));	//end of main jQuery closure