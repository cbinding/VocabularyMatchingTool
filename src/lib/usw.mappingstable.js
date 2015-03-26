/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.mappingstable
Version	: 20150316
Summary	: Main table holding alignment mappings
Require	: jquery, jquery-ui, 
    //cdn.datatables.net/1.10.5/js/jquery.dataTables.min.js           
Example	:<div class="usw-mappingstable"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
16/03/2015	CFB	Initially created script
===============================================================================
*/
(function($) { //start of main jquery closure
    "use strict"; // strict	mode pragma
    $.support.cors = true;

    $.widget("usw.mappingstable", {	//start	of widget code
        		
        // default options
        options: {            
        },
        
        // initialization code (runs once only)
        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            var table = $("<table class='display' cellspacing='0' width='100%'></table>").appendTo(self.element);

            // set up the data table columns
            table.dataTable({
                // extension for data export (PDF, Excel etc.) functionality
                // (note - uses flash, so not Apple compatible...)
               /* dom: 'T<"clear">lfrtip',
                tableTools: {
                    "sSwfPath": "//cdn.datatables.net/tabletools/2.2.3/swf/copy_csv_xls_pdf.swf"
                },*/
                //"ajax": "./tableLayoutTestData.txt", // to get data from a local file...
                "data": {},
                "columns": [
                    {
                        "title": "Source Concept",
                        "visible": true,
                        // "data": "source",
                        "defaultContent": "",
                        "render": function (data, type, row) {
                            return "<a href='" + row['sourceURI'] + "'>" + row['sourceLabel'] + "</a>";
                        }
                    },
                    {
                        "title": "Match",
                        "visible": true,
                        //"data": "match", 
                        "defaultContent": "",
                        "render": function (data, type, row) {
                            return "<a href='" + row['matchURI'] + "'>" + row['matchLabel'] + "</a>";
                        }
                    },
                    {
                        "title": "Target Concept",
                        "visible": true,
                        //"data": "target", 
                        "defaultContent": "",
                        "render": function (data, type, row) {
                            return "<a href='" + row['targetURI'] + "'>" + row['targetLabel'] + "</a>";
                        }
                    },
                    {
                        "title": "Creator",
                        "visible": false,
                        "data": "creator",
                        "defaultContent": "anonymous"
                    },
                    {
                        "title": "Created",
                        "visible": true,
                        "data": "created",
                        "defaultContent": ""
                    },
                     {
                         "title": "Notes",
                         "visible": false,
                         "data": "notes",
                         "defaultContent": ""
                     },

                    {
                        "title": "",
                        "visible": true,
                        "defaultContent": "<a href='#' class='delete fa fa-minus-circle' title='delete'></a>"
                    }
                ]
            });

            // fire a notification event when any table link is clicked, instead of following the link
            $(table).on("click", "a", function (e) {
                e.preventDefault();

                var uri = $(this).attr("href"), label = $(this).text();

                $(self.element).trigger("selected", { "uri": uri, "label": label });
                //alert("clicked: '" + label + "'"); // for testing that events are fired
                // don't follow URI links
                return false;
            });

            // fire a notification event when any table link is clicked, instead of following the link
            $(table).on("click", "a.delete", function (e) {
                e.preventDefault();
                //todo: dialog: are you sure???

                $(this).closest("tr").addClass("selected");
                $(table).DataTable().row(".selected:first").remove(); //.draw(false);
                
                self._refresh();
                // don't follow URI links
                return false;
            });

            self.load();

        },

        /* Add a new row. expecting the following fields:            
            {
                sourceURI: "",
                sourceLabel: "",
                matchURI: "",
                matchLabel: "",
                targetURI: "",
                targetLabel: "",
                notes: "",
                creator: "" (?)
            };*/
        add: function (obj) {
            var self = this;
            var data = $.extend({ created: new Date().toISOString() }, obj);           

            // add the new row data object and redraw the table
            $("table:first", self.element).DataTable().row.add(data); //.draw();
            self._refresh();
        },
       
        clear: function () {
            var self = this;
            // clear existing table
            $("table:first", self.element).DataTable().clear(); //.draw();
            self._refresh();
        },

        load: function () {
            var self = this;
            // clear existing table before loading new data
            $("table:first", self.element).DataTable().clear();

            // get locally stored table data
            //var data = $('#mappings').data();

            // populate the table and redraw
            //table.rows.add(data).draw();

            // is there any locally stored table data?
            if (localStorage.getItem("mappings")) {
                // get locally stored table data
                var data = JSON.parse(localStorage.getItem("mappings"));
                //alert(localStorage.getItem("mappings"));
                //  add it and redraw the table
                $("table:first", self.element).DataTable().rows.add(data); 
                self._refresh();
            }
        },

        // locally storing the table data
        save: function () {
            var self = this;
            
            // save the table data as JSON string to local storage
            var json = self.toJSON();
            localStorage.setItem("mappings", json);
        },

        import: function (data) {
            var self = this;
            // does not clear table first...
            var json = JSON.parse(data);
            $("table:first", self.element).DataTable().rows.add(json); 
            self._refresh();
        },

        data: function () {
            var self = this;
            //alert("clicked data");
            var raw = $("table:first", self.element).DataTable().rows().data();
            // remove extraneous table presentation metadata (was preventing save on Chrome)
            var items = $.map(raw, function (item) { return item; });
            return items;
        },    

       toJSON: function () {
           var self = this;
           var data = self.data();
           return (JSON.stringify(data, null, 2));           
       },

       toTRIG: function() {
           var self = this;
           var data = self.data();
           
           //build the TRIG data as a string
           var s = "@prefix data: <http://data/> .\n"
           + "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n";

           $(data).each(function () {
               var item = this;

               var graphName = "g" + new Date(item.created).getTime().toString();

               var graph = "\ndata:" + graphName + " {\n"
               + "<" + item.sourceURI + "> <" + item.matchURI + "> <" + item.targetURI + "> .\n"
               + "data:" + graphName + " <" + usw.uri.DCTERMS.CREATED + "> \"" + item.created + "\"^^xsd:dateTime .\n"
               + "}\n";
               s += graph;
           });

           return (s);
       },

       toCSV: function () {
           var self = this;
           var data = self.data();           
           var csv = Papa.unparse(data, {});          

           return (csv);
       },

        // put this.element	back to	how	it was
        destroy: function () {
            //self.element.removeClass("usw-aatbase");
            //$.Widget.prototype.destroy.call(this);
        },

        // get count of rows currently displayed
        count: function () {
            //todo
            //return ($("li", this.element).length);
        },

        // redraw the control
        _refresh: function () {
            var self = this;
            $("table:first", self.element).DataTable().draw();
            self.save();
        }

    });	// end of widget code

    // element of class usw-mappingstable automatically becomes one...
    $(window).load(function () {
        $(".usw-mappingstable").mappingstable();
    });

}(jQuery));	//end of main jquery closure
