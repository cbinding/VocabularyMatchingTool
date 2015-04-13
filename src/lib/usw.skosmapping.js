/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosmapping
Version	: 20150205
Summary	: Controls for submitting a mapping between 2 concepts
Require	: jquery, jquery-ui usw.uri.js
Example	: <div class="usw-skosmapping"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main closure (anonymous function)    
    "use strict"; // strict	mode pragma	
    
    $.widget("usw.skosmapping", {	// start of widget code 

        // default options
        options: {            
            sourceURI: "#",
            sourceLabel: "(none)",
            targetURI: "#",
            targetLabel: "(none)",
            matchType: usw.uri.SKOS.CLOSEMATCH,
            creator: "anonymous",
            created: "",
            notes: ""
        },
        
        // Called on initialization only
        _create: function (options) {
            var self = this;

            // override	default	options	with any passed	in
            self.options = $.extend(self.options, options); 
            
            var matchTypes = "<select class='matchTypes' title='Match type'>"
                + "<option value='" + usw.uri.SKOS.EXACTMATCH + "'>exact match</option>"
                + "<option value='" + usw.uri.SKOS.CLOSEMATCH + "' selected>close match</option>" 	// default			
                + "<option value='" + usw.uri.SKOS.BROADMATCH + "'>broad match</option>"
                + "<option value='" + usw.uri.SKOS.NARROWMATCH + "'>narrow match</option>"
                + "<option value='" + usw.uri.SKOS.RELATEDMATCH + "'>related match</option>"
                + "</select>";

            $(self.element).css({width: "98%", border: "0px solid gray", margin: "0 auto", padding: "3px"});

            var fields = $("<div></div>")
                 //.append("<label for='sourceConcept'>Source concept:</label>")
                 .append("<div id='sourceConcept' title='Source concept'><a href='#'>(none)</a></div>")
                 .append(matchTypes)
                 //.append("<label for='targetConcept'>Target concept:</label>")
                 .append("<div id='targetConcept' title='Target concept'><a href='#'>(none)</a></div>")
                 .append("<input type='button' class='button button-primary' value='Add Match' title='Add this match to the table' />")
                 .append("&nbsp;<a target='help' title='Whats this?' class='fa fa-question-circle' href='help.html#conceptMatch'></a>")
                 .appendTo(self.element);

            // todo: css layout for each element, + highlight on mouseover, image for delete button

            $("#sourceConcept a:first", fields)
                .css({
                    float: "left",            
                    border: "1px solid gray",
                    cursor: "pointer",
                    "width": "25%", //width: (self.element.innerWidth() /100) * 30,
                    height: "100%",
                    display: "inline",
                    background: "whitesmoke",
                    padding: "2px 5px",
                    margin: "0px 3px"
                });            

            $(".matchTypes:first", fields)
                .css({
                    float: "left",
                    border:"1px solid gray",
                    cursor: "pointer",
                    width: "25%", 
                    height: "100%",
                    margin: "0px 3px"                    
                });

            $("#targetConcept", fields)
                .css({
                    float: "left",
                    border: "1px solid gray",
                    cursor: "pointer",
                    width: "25%",
                    height: "100%",
                    //top: 0,
                    //left: 400,
                    display: "inline",
                    background: "whitesmoke",
                    padding: "2px 5px",
                    margin: "0px 3px"
                });           

            // fire	an event when a source link is clicked
            $("#sourceConcept",self.element).on("click", "a", function (e) {
                var uri = $(this).attr('href'), label = $(this).text();
                $(self.element).trigger("sourceSelected", { "uri": uri, "label": label });
                // don't follow links
                e.preventDefault();
                return false;
            });

            // fire	an event when a target link is clicked
            $("#targetConcept", self.element).on("click", "a", function (e) {
                var uri = $(this).attr('href'), label = $(this).text();
                $(self.element).trigger("targetSelected", { "uri": uri, "label": label });
                // don't follow links
                e.preventDefault();
                return false;
            });

            // fire	an event when the 'Add button is clicked
            $("input:first", self.element).on("click", function (e) {
                // don't fire if source or target are not filled in
                if (self.options.sourceURI == "#" || self.options.targetURI == "#") {
                    alert("You need to select both a source and target concept to add a match");
                    return false;
                }                   

                var data = self.toJSON();
                $(self.element).trigger("selected", data);
                // don't follow links
                e.preventDefault();
                return false;
            });           
            
            self._refresh();
        },

        // set an option after control has loaded
        _setOption: function (key, value) {
            var self = this;

            // clean up input
            key = $.trim(key || '');
            value = $.trim(value || '');

            // do nothing if same value	is passed for key
            if (value === self.options[key]) {
                return;
            }

            // change the option value 
            self.options[key] = value;
            self._refresh();
        },

        _refresh: function () {
            var self = this;
            $("#sourceConcept a:first", self.element)
                .attr('href', self.options.sourceURI)
                .text(self.options.sourceLabel);
            $("#targetConcept a:first", self.element)
                .attr('href', self.options.targetURI)
                .text(self.options.targetLabel);
            $(".matchTypes:first", self.element)
                .val(self.options.matchType);
        },

        // long winded - can we just return self.options??
        toJSON: function () {
            var self = this;

            return ({
                sourceURI: $("#sourceConcept a:first", self.element).attr("href"),
                sourceLabel: $("#sourceConcept a:first", self.element).text(),
                targetURI: $("#targetConcept a:first", self.element).attr("href"),
                targetLabel: $("#targetConcept a:first", self.element).text(),
                matchURI: $(".matchTypes:first", self.element).val(),
                matchLabel: $(".matchTypes:first option:selected", self.element).text(),
                notes: "", //not used yet...
                creator: self.options.creator,
                created: new Date().toISOString()
            });            
        }

    }); // end widget usw.skosmapping

    // elements of class usw-skosmapping become a widget
    $(window).load(function () {
        $(".usw-skosmapping").skosmapping();
    });     

})(jQuery);	//end of main jquery closure
 