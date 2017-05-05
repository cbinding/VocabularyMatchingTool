/*
===============================================================================
Creator	: Ceri Binding, University of South Wales
Project	: ARIADNE
Classes	: usw.skosconceptsfromfile
Version	: 20150218
Summary	: List of concepts from loaded SKOS file
Require	: jquery, jquery.ui.widget.min.js, jquery.rdfquery.core.min-1.0.js, usw.uri.js
Example	: <div class="usw-skosconceptsfromfile"/>
License	: http://creativecommons.org/licenses/by/3.0/
===============================================================================
History
18/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main closure
    "use strict"; // strict	mode pragma	
    //$.support.cors = true;   

    // TODO: this widget to be split out to separate file after testing
    $.widget("usw.skosconceptsfromfile", {	// start of widget code 

        // default options
        options: {
            language: "en"
        },

        _create: function (options) {
            var self = this;

            // merge locally passed in options with default options
            options = $.extend(self.options, options);

            // build the widget control fields
            $(self.element)
                .css({
                    "text-align": "left",
                    "height": "100%",
                    //"max-height": "300px",
                    //"min-height": "200px",
                    "min-width": "100px",
                    "border": "0px"
                })
                .append("<input type='file'/><ul class='content'/><div class='footer'/>");
                

            // style the file selection input field
            $("input:file", self.element)
                .css({
                    width: "100%"
                });

            // style the content div
            self.content = $("ul.content", self.element)
                .css({
                    "padding": "3px",
                    "margin": "0px",
                    "height": "250px", // TODO: calculate suitable height
                    "overflow-y": "scroll",
                    "overflow-x": "hidden",
                    //"background-color": "#EEE",
                    "border": "1px solid lightgray"
                });

            // fire a 'selected' event when any link is clicked, passing uri, label and language
            self.element.on("click", "a", function () {
                var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
                $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
                // don't follow links
                return false;
            });

            // read a file when the file selection is changed
            self.element.on("change", "input:file", function (evt) {
                //alert(evt.target.files[0].name); //filename minus path
                
                // input:file may return multiple selected files,
                // but we are only actually reading the first one
                var selectedFile = evt.target.files[0];
                // ... and only processing text/xml files
                if (!selectedFile.type.match('text/xml')) return;

                // read the selected file's contents
                var reader = new FileReader();
                reader.onload = function (e) {
                    //var self = this;
                    var parser = new DOMParser();
                    var items = [];

                    var data = parser.parseFromString(e.target.result, "text/xml");
                    var rdf = $.rdf().load(data, {});
                        rdf.prefix('skos', usw.uri.SKOS.NS)
                        .where('?uri a skos:Concept')
                        .where('?uri skos:prefLabel ?label')
                        .filter(function () {
                            return this.label.lang.toLowerCase() === self.options.language.toLowerCase();
                        })
                        /*.each(function () {
                            var uri = this.uri.value;
                            var label = this.label ? this.label.value : "";
                            label = label.replace(new RegExp('"', 'g'), '');
                            items.push({ uri: uri, label: label });
                        })
                        // this bit would add altLabels to the list
                        .end().end() // undo most recent filters (i.e. skos:prefLabel and language)
                        .where('?uri skos:altLabel ?label')
                        .filter(function () {
                            return this.label.lang.toLowerCase() === self.options.language.toLowerCase();
                        })*/
                        .each(function () {
                            var uri = this.uri.value;
                            var label = this.label ? this.label.value : "";
                            label = label.replace(new RegExp('"', 'g'), '');
                            items.push({ uri: uri, label: label });
                        });

                    // case insensitive sorting on label
                    items.sort(function (a, b) {
                        return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1;
                    });

                    // store data so _refresh function can then display it
                    $.data(self.element, "items", items);

                    self._refresh();
                };

                reader.readAsText(selectedFile);
                //reader.readAsDataURL(input.files[0]); //TODO: add as option to read from URL?                
            });

            self._refresh();
        },

        // set an option after control has loaded
        _setOption: function (key, value) {
            var self = this;

            //clean	up input
            key = $.trim(key || '');
            value = $.trim(value || '');

            // do nothing if same value	is passed
            if (value === self.options[key]) {
                return;
            }

            // change the option value and refresh the widget
            self.options[key] = value;
            self._refresh();
        },

        _refresh: function () {
            var self = this;
            
            // clear any currently displayed concepts and create a new list
            var list = $("ul.content:first", self.element).html("");            

            var items = $.data(self.element, "items") || {};
            $(items).each(function () {
                // create a link element
                var anchor = $("<a>")
                    .addClass("concept")
                    .attr("target", "_blank")
                    .attr("href", this.uri)
                    //.attr("title", this.scopeNote)
                    .text(this.label);

                // create listitem to hold link element
                var li = $("<li>").append(anchor);
                //var dd = $("<dd>");
                //$("<div class='uri'>").text(this.uri).appendTo(dd);
                //$("<div class='scopeNote'>").text(this.scopeNote).appendTo(dd);

                // add listitem to the list
                $(list).append(li);
                //$(list).append(dd);
                //$(list).append("<hr>");
            });

            // put the list into on screen element
            //$("fieldset div.content", self.element).html(list);
            $("div.footer", self.element).html("[" + (items.length || "0") + " concepts]");
            //var content = $("fieldset div.content", self.element);
            //content.html("<p>hi...</p>");

            //var footer = $("fieldset div.footer", self.element);
            //footer.html("[0 concepts]");
            //$(self.content).waitable({ "waiting": false });            

        }
    }); // end widget usw.skosconceptsfromfile 

    // elements of class usw-skosconceptsfromfile automatically become one...
    $(window).load(function () {
        $(".usw-skosconceptsfromfile").skosconceptsfromfile();   
    });

})(jQuery); // end of main closure