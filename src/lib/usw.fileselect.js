/*jslint nomen: true, vars: true, white: true */
/*global $, jQuery, alert*/
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.fileselect
Version	: 20150205
Summary	: <input type='file'> but styled as a button (hides the file path)
Require	: jquery, jquery-ui
Example	: <div class="usw-fileselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/03/2015	CFB	created script
===============================================================================
*/
(function ($) { //start of main jQuery closure
    "use strict"; // strict	mode pragma

    $.widget('usw.fileselect', {

        // stateful	defaults
        options: {},

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            var label = $(self.element).data("label") || "File";

            $(self.element).html("<label for='file-select' class='button button-primary'>" + label + "</label><input id='file-select' type='file'/>");
            // hide the file control and notify when a file is selected
            $("input[type='file']:first", self.element)
                .css({ "display": "none" })
                .bind('change', function () {
                    var fileName = "";
                    fileName = $(this).val();
                    $(self.element).trigger("selected", { "fileName": fileName });

                    //replace the input with a new clone to ensure the change event
                    // fires again if the same file is selected twice in succession
                    var control = $("input#file-select:first");
                    control.replaceWith(control = control.clone(true));                   
                });            
        }

    });	// end widget usw.fileselect

    // any elements of class usw-fileselect automatically become one...
    $(window).load(function () {
        $(".usw-fileselect").fileselect();
    });

}(jQuery));	//end of main jQuery closure
