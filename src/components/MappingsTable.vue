<template>
    <div id="mappings-table"></div>
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted, onUnmounted } from "vue"
    import { TabulatorFull as Tabulator, type CellComponent, type RowComponent } from "tabulator-tables"
    import { useI18n } from "vue-i18n" 
    import { useModal } from '@/composables/useModal'
    import dayjs from "dayjs"
    import emitter from "@/composables/useEventBus"
    import i18n_mappingsTable from "@/../i18n_mappingsTable.json"
    import { URI_SKOS } from "@/composables/Constants"

    
    const { t, locale } = useI18n()
    
    const selectedRowIndex = ref(-1)
    const modal = useModal()

    // get list of all languages (from local JSON file)
    //import { useFetchJSON } from "@/composables/useFetchJSON"
    
    type i18n_Language = {
        id: string,
        label: string,
        labelEN: string,
        title: string
    }    
     
    //const { data: languages } = useFetchJSON("/i18n_languages.json")
    import languages from "@/../i18n_languages.json"
  
    const sortedLangs = computed(() => (languages || [])
        .map((item: i18n_Language) => {
            return { id: item.id, label: item.label || item.labelEN || item.id }
        })
        .sort((a, b) => a.label.toLocaleLowerCase().localeCompare(b.label.toLocaleLowerCase())
    ))      
    
    
    const matchTypes = ref({
        "": "[not defined]",
        [URI_SKOS.EXACTMATCH]: t("skos-exact-match"),
        [URI_SKOS.CLOSEMATCH]: t("skos-close-match"),
        [URI_SKOS.BROADMATCH]: t("skos-broad-match"),
        [URI_SKOS.NARROWMATCH]: t("skos-narrow-match"),
        [URI_SKOS.RELATEDMATCH]: t("skos-related-match") 
    })

    // custom mutator to remove any surrounding single or double quotes from text values
    const unquoteMutator = (value: string) => (value || "").replaceAll(/^["']|["']$/gu, "")

    // custom mutator to generate a unique identifier (temp row IDs used in table to identify rows during editing)
    const uniqueIdMutator = () => crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2)
    

    // apply namespace alias to URI fields, and display as a navigable link
    const uriFormatter = (cell: CellComponent) => {
        const value = cell.getValue()
        const uri = typeof value === "string" ? value : String(value ?? "")

        const aliases = [
            { ns: "skos", namespace: "http://www.w3.org/2004/02/skos/core#" },
            { ns: "aat", namespace: "http://vocab.getty.edu/aat/" }
        ]

        let html = "";
        if (uri) {
            const alias = aliases.find(element => uri.startsWith(element.namespace))
            if (alias) {
                html = `<a target='_blank' href='${ uri }'><i class='fas fa-key'></i>&nbsp;${ uri.replace(alias.namespace, alias.ns + ":") }</a>`
            } else if (uri.startsWith("http")) {
                html = `<a target='_blank' href='${ uri }'><i class='fas fa-key'></i>&nbsp;${ uri }</a>`
            }
            else {
                html = `<i class='fas fa-key'></i>&nbsp;${ uri }`
            }
        }
        return html
    }


    // display label preceded by FontAwesome 'tag' icon
    const lblFormatter = (cell: CellComponent) => {
        let value = cell.getValue()
        return (value ? `<i class='fas fa-tag'></i>&nbsp;${ value }` : "")
	}


    // AAT as link, instead of targetURI and targetLabel columns
    const aatFormatter = (cell: CellComponent) => {
        let row = cell.getRow()
        let data = row.getData()
        let html = ""
        if(data.targetURI) {
            html = `<a target='aat' href='${ data.targetURI }'><i class='fas fa-tag'></i>&nbsp;${ data.targetLabel }</a>`
        }
        else {
            html = ""
        }
        return html;
    }


    // display language code with FontAwesome language icon, titled as language name in that language
    const langFormatter = (cell: CellComponent) => {
        let title = ""
        let value = String(cell.getValue() ?? "").trim().toLowerCase()

        const lang: i18n_Language | undefined = (languages || []).find((item: i18n_Language) => item.id === value)        
        if(lang !== undefined) 
            title = lang["label"] ?? lang["labelEN"] ?? lang["id"] ?? ""
        return `<span title='${ title }'><i class='fas fa-language'></i>&nbsp;${ value }</span>` 

        //if (Object.hasOwn(languages, value)) {
            //title = languages[value as keyof typeof languages]  
            //title = languages.fir
            //return `<span title='${ title }'><i class='fas fa-language'></i>&nbsp;${ value }</span>`     
        //}
        //return ""
    }

    const matchTypeFormatter = (cell: CellComponent) => {
        const value = cell?.getValue()?.toString()?.trim() || ""

        let cssClass = ""
        let i18Index = ""

        switch(value) {
			case URI_SKOS.EXACTMATCH: 
				cssClass="fas fa-equals"
                i18Index = "skos-exact-match"
                break
            case URI_SKOS.CLOSEMATCH: 
                cssClass = "fas fa-wave-square"
                i18Index = "skos-close-match"
                break
            case URI_SKOS.BROADMATCH: 
                cssClass="far fa-hand-point-up"
                i18Index = "skos-broad-match"
                break
            case URI_SKOS.NARROWMATCH: 
                cssClass="far fa-hand-point-down"
                i18Index = "skos-narrow-match"
                break
            case  URI_SKOS.RELATEDMATCH: 
                cssClass="far fa-hand-point-right"
                i18Index = "skos-related-match"
                break
            default:
                cssClass=""
                i18Index = ""
                break
        }

        const i18Title = t(i18Index)
        if(i18Title === value) 
            return `<span><i class='${ cssClass }'></i>&nbsp;${ value }</span>` 
        return `<span}'><i class='${ cssClass }'></i>&nbsp;${ i18Title }</span>`
    }


    // custom column formatter definition - suggest button for rows
    const suggestFormatter = (cell: CellComponent) => "<i class='fas fa-search' title='suggest'></i>"
     

    const matchEditor = (cell: CellComponent, onRendered: Function, success: Function, cancel: Function, editorParams: any) => {
        const editor = document.createElement("select")
        editor.setAttribute("name", "matchTypes")
        
        for (const [key, value] of Object.entries(matchTypes.value)) {
            const option = document.createElement("option")
            option.setAttribute("value", key)
            option.innerHTML = value
            editor.append(option)
        }
        //Set value of editor to the current value of the cell
        editor.value = cell.getValue()

        //set focus on the select box when the editor is selected
        onRendered(() => editor.focus())

        //when the value has been set, trigger the cell to update
        const successFunc = () => success(editor.value)
        editor.addEventListener("change", successFunc)
        editor.addEventListener("blur", successFunc)

        //return the editor element
        return editor
    }


    const langEditor = (cell: CellComponent, onRendered: Function, success: Function, cancel: Function, editorParams: any) => {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass the successfuly updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell
        //editorParams - params object passed into the editorParams column definition property      

        //create and style editor
        const editor = document.createElement("select");
        editor.setAttribute("name", "languages");

        /*for (const lang of Object.keys(languages) as Array<keyof typeof languages>) {
            const option = document.createElement("option")
            option.setAttribute("value", lang)
            option.innerHTML = languages[lang] 
            editor.appendChild(option)
        }*/

        (sortedLangs.value || []).forEach(item => {
            const option = document.createElement("option")
            option.setAttribute("value", item.id)
            option.innerHTML = item.label
            editor.append(option)

        })
        
        //Set value of editor to the current value of the cell
        editor.value = cell.getValue()
                       
        //set focus on the select box when the editor is selected
        onRendered(() => editor.focus())

        //when the value has been set, trigger the cell to update
        const successFunc = () => success(editor.value)
        editor.addEventListener("change", successFunc)
        editor.addEventListener("blur", successFunc)

        //return the editor element
        return editor;
    };
               
    
    // ensure localStorage data item exists before we use it..
    const tabulatorData = ref([])
    const CACHENAME = "tabulatordata"
    const local = localStorage.getItem(CACHENAME)
    
    try {
        tabulatorData.value = JSON.parse(local || "[]")
    } 
    catch(e) {
        tabulatorData.value = []
        localStorage.removeItem(CACHENAME)
    }

    

    

        
    onMounted(() => {    

    // Build Tabulator
    const table = new Tabulator("#mappings-table", {
        index: "id",                // identifies column providing unique row index values
        height: "750px",
        layout:"fitColumns",
        pagination: true,
        paginationMode: "local",
        persistenceMode: "local",   // table setup persisted to local storage
        reactiveData: true,         // turn on data reactivity
        data: tabulatorData.value,  // load data into table
        placeholder: "No Data",     // display message on empty table
        clipboard:true,             // Allow copy/paste into table
        clipboardCopyConfig:{
            columnHeaders:false,    // do not include column headers in clipboard output
            rowGroups:false,        // do not include row groups in clipboard output
            columnCalcs:false,      // do not include column calculation rows in clipboard output
        },
        columnHeaderVertAlign: "top",
        footerElement: "<div class='tabulator-footer'><span id='table-row-count'>0</span>&nbsp;<span id='table-row-count-label'>rows</span></div>",
        downloadConfig: {
            columnGroups: false // don't include column groups in column headers for download
        },
        locale: locale.value,  // set initial locale for table
        langs: i18n_mappingsTable,
        // selectable: true,     // highlights rows when clicked
        // reactiveData: true,     // turn on data reactivity
        history: true,          // track changes for undo/redo functionality
        // data: tabledata,        // load (reactive) data into table
        columns: [
            {
                //create source group
                field: "sourceConcept", 
                title:  t('col-source-concept-text'),
                columns: [
                    {
                        title: "Source identifier",
                        field: "sourceURI",
                        editor: "input",
                        editorParams: { 
                            selectContents: true,
                            elementAttributes:{
                                maxlength:"100", //set the maximum character length of the input element to 100 characters
                            } 
                        },
                        formatter: uriFormatter,
                    },
                    {
                        title: "Source label",
                        field: "sourceLabel",
                        //width: 250,
                        editor: "input",
                        editorParams: { 
                            selectContents: true,
                            elementAttributes:{
                                maxlength:"100", //set the maximum character length of the input element to 100 characters
                            } 
                        },
                        formatter: lblFormatter,
                        mutator: unquoteMutator,
                        headerFilter: true
                    },
                    {
                        title: "Language",
                        field: "sourceLabelLanguage",
                        width: 60,
                        headerSort: true,
                        formatter: langFormatter,
                        editor: langEditor,
                    },
                ]
            },
            {
                title: "Match type",
                width: 120,
                field: "matchURI",
                formatter: matchTypeFormatter,
                editor: matchEditor,
            },
            {
                title: "Target identifier",
                field: "targetURI",
                //width: 175,
                visible: false,
                download: true
            },
            {
                title: "Target label",
                field: "targetLabel",
                //width: 250,
                mutator: unquoteMutator,
                formatter: aatFormatter,
                headerFilter: true,
                headerFilterPlaceholder:"filter column...",
                headerFilterFunc: function(headerValue, rowValue, rowData, filterParams) {
                    let label = (rowData.targetLabel || "").toLowerCase();
                    return label.includes(headerValue.toLowerCase());
                },
                visible: true,
                download: true
            },
            {
                title: "created",
                field: "created",
                visible: false,
                download: true // force hidden field to show in download
            },
            {
                title: "updated",
                field: "updated",
                visible: false,
                download: true // force hidden field to show in download
            },
            {
                field: "suggest",
                title: "Suggest",
                headerSort: false,
                headerVertical: "flip",
                download: false, // don't want this field in download
                formatter: suggestFormatter,
                width: 30,
                hozAlign: "center",
                cellClick: function (e, cell) {
                    selectedRowIndex.value = cell.getRow().getIndex()
                    //console.log("selectedRowIndex.value = ", selectedRowIndex.value)
                    modal.showModal()
                }
            },
            {
                field: "delete",
                title: "Delete",
                headerSort: false,
                hozAlign: "center",
                headerVertical: "flip",
                formatter: "buttonCross", // deleteIcon,
                download: false, // don't want this field in download
                width: 40,
                cellClick: function (e, cell) {
                    var row = cell.getRow()
                    table.selectRow(row)
                    var result = confirm(t("table-delete-row-confirm")) // "Delete the selected row - are you sure?"
                    if (result) { row.delete() }
                    else { table.deselectRow(row) }
                }
            },             
            {
                field: "id",
                title: "hiddenID",
                visible: false,
                download: false,
                mutator: uniqueIdMutator
            },
        ]        
        
    }) // end of table definition

    

    table.on("dataLoading", function (data: any[]) {
        // data - the data loading into the table
        const timestamp = dayjs().toISOString()
        // ensure 'created' and 'updated' dates are present
        if(data && data.forEach) {
            data.forEach(function (item) {
                if (!item.created)
                    item.created = timestamp
                if (!item.updated)
                    item.updated = item.created
            })
        }        
    })

    
    table.on("dataLoaded", function (data: any[]) {        
        localStorage.tabulatordata = JSON.stringify(data);
        // update the table row count
        const el = document.getElementById('table-row-count')
        if(el)
            el.textContent = data.length.toString()
    })


    table.on("dataChanged", function (data: any[]) {
        localStorage.tabulatordata = JSON.stringify(data);
        // update the table row count
        const el = document.getElementById('table-row-count')
        if(el)
            el.textContent = data.length.toString()
        //updateTableRowCount()
    })


    table.on("cellEdited", function (cell: CellComponent) {
        // change colour of edited cell
        // cell.getElement().style.backgroundColor = "pink";

        // update timestamp whenever any cell is edited
        let row = cell.getRow();
        table.updateRow(row, { updated: dayjs().toISOString() });
    })


    table.on("rowUpdated", function (row: RowComponent) {
        // change colour of any updated cells
        row.getCells().forEach(cell => {
            const oldValue = cell.getOldValue();
            if(oldValue !== null && oldValue !== cell.getValue()) {
                cell.getElement().style.backgroundColor = "pink";
            }
        })
    })


    emitter.on("importJSON", (e: any) => {  
        table.import("json", ".json") 
    })


    emitter.on("addNewRow", (e: any) => {        
        let timestamp = dayjs().toISOString()        
        table.addData([
            {
                sourceURI: "",
                sourceLabel: "",
                sourceLabelLanguage: "en",
                matchURI: URI_SKOS.CLOSEMATCH,
                targetURI: "",
                targetLabel: "",
                created: timestamp,
                updated: timestamp
            }], true);        
    })
    

    emitter.on("exportJSON", (e: any) => { 
        if (table.getDataCount() > 0) {
            const fileName = `vmt-${ dayjs().format("YYYYMMDDHHmmss") }.json`;
            table.download("json", fileName);
        }
    })


    emitter.on("exportCSV", (e: any) => { 
        if (table.getDataCount() > 0) {
            const fileName = `vmt-${ dayjs().format("YYYYMMDDHHmmss") }.csv`;
            table.download("csv", fileName, { bom: true }); //include BOM in output
        }
    })

    emitter.on("updateTable", (e: any) => {
        //console.log(`MappingsTable.vue: updateTable: { uri: ${ e.uri }, label: ${ e.label }}`)
        table.updateData([{
            id: selectedRowIndex.value,
            targetURI: e.uri,
            targetLabel: e.label,
            updated: dayjs().toISOString()
        }]);
    })


    /*$("#btn-export-pdf").click(function () {
         if (table.getDataCount() > 0) {
            var fileName = "vmt-" + dayjs().format('YYYYMMDDHHmmss') + ".pdf";
            table.download("pdf", fileName);
        }
    });


    $("#btn-export-rdf").click(function () {
        if (table.getDataCount() > 0) {
            var fileName = "vmt-" + dayjs().format('YYYYMMDDHHmmss') + ".ttl";
            table.download(ttlFileFormatter, fileName); // using custom formatter - ttlFileFormatter
        }
    }); */


    // undo button
    /* $("#btn-undo-action").on("click", function () {
        table.undo();
    });


    // redo button
    $("#btn-redo-action").on("click", function () {
        table.redo();
     });*/


    emitter.on("clearAll", (e) => { 
        if (table.getDataCount() > 0) {
            var result = confirm(t("btn-clear-all-confirm"))
            if (result) {
                table.clearData()
                localStorage.tabulatordata = JSON.stringify([])
                // update the table row count
                const el = document.getElementById('table-row-count')
                if(el)
                    el.textContent = "0"
            }          
        }        
    })

    watch(locale, (newValue) => {
        if (table.setLocale) 
            table.setLocale(newValue)
    }, { immediate: true })


    }) // end of onMounted

    onUnmounted(() => {
        emitter.off("importJSON")
        emitter.off("exportJSON")
        emitter.off("exportCSV")
        emitter.off("addNewRow")
        emitter.off("clearAll")
        emitter.off("updateTable")
        //table.off("dataLoading"       
    })
   
</script>