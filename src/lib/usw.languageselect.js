/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.languageselect
Version	: 20150205
Summary	: List of languages
Require	: jquery, jquery-ui, fontawesome
Example	: <div class="usw-languageselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma	
	
    //$.widget("usw.skosaltlabels", $.usw.skosfile, {	
    $.widget("usw.languageselect", {	// start of widget code 
		
        // default options
        options: {
            language: "en"
        },

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);
	       
            var parent = self.element.parent();

            // buid and attach the language selector
            var cog = $("<div class='fa fa-cog' title='choose language'></div>")
                 .css({
                     position: "absolute",
                     left: parent.position().left + parent.width() - 14,
                     top: parent.position().top,
                     display: "inline",
                     width: "14px",
                     height: "14px",
                     margin: "0px",
                     padding: "0px",
                     border: "0px",
                     cursor: "pointer"
                 })
                .appendTo(self.element)
                .on("click", function () {
                    var element = $("select.language:first", self.element);
                    if (element.is(':hidden')) $(element).show(300);                   
                });

            $("<select class='language'>"
                + "<option value='de'>Deutch</option>"
                + "<option value='en' selected>English</option>"
                + "<option value='es'>Español</option>"
                + "<option value='fr'>Français</option>"
                + "<option value='nl'>Nederlands</option>"
                + "</select>").hide()
                .appendTo(cog)
                .change(function () {
                    self.options.language = $("option:selected", this).first().val();               
                    $(self.element).trigger("selected", { "language": self.options.language });
                    $.data(self.element, "language", self.options.language);
                    //alert(self.options.language);
                    //$("select.language:first", self.element).hide(300);
                    $(this).hide(300);
                });

            // resize/reposition things when window resizes
            $(window).resize(function () {
                $(cog).css({
                    left: parent.position().left + parent.width() - 14,
                    top: parent.position().top
                });
            });
        }       
    });	// end of widget code

    // any elements of class usw-languageselect automatically become one...
    $(window).load(function () {
        $(".usw-languageselect").languageselect();
    });

})(jQuery);	//end of main jquery closure
