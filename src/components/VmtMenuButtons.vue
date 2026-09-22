<template>
    <div>
        <!-- control buttons -->
        <button 
            id="btn-import-json" 
            class='button button-primary' 
            :lang="locale" 
            :disabled="disabled"
            :title="`${t('btn-import-json-title')}`"
            :alt="`${t('btn-import-json-title')}`"
            @click="menuItemSelected">
            <i class="fas fa-file-import"></i>&nbsp;<span>{{ $t("btn-import-json-text") }}</span>
        </button>

        <button 
            id="btn-export-json" 
            class="button button-primary" 
            :lang="locale" 
            :disabled="disabled"
            :title="`${t('btn-export-json-title')}`"
            :alt="`${t('btn-export-json-title')}`"
            @click="menuItemSelected">
            <i class="fas fa-file-export"></i>&nbsp;<span>{{ $t("btn-export-json-text") }}</span>
        </button>

        <button 
            id="btn-export-csv" 
            class='button button-primary' 
            :lang="locale" 
            :disabled="disabled"
            :title="`${t('btn-export-csv-title')}`"
            :alt="`${t('btn-export-csv-title')}`"
            @click="menuItemSelected">
            <i class="fas fa-file-csv"></i>&nbsp;<span>{{ $t("btn-export-csv-text") }}</span>
        </button>

        <!--<button id="btn-export-rdf" class='button-primary' :title="`${t('btn-export-rdf-title')}`">
            <i class="fas fa-file"></i>&nbsp;<span>{{ $t("btn-export-rdf-text") }}</span>
        </button>-->

        <!--<button id="btn-export-pdf" class='button-primary' :title="`${t('btn-export-pdf-title')}`">
            <i class="fas fa-file-pdf"></i>&nbsp;<span>{{ $t("btn-export-pdf-text") }}</span>
         </button>-->

        <button 
            id="btn-add-new-row" 
            class='button button-primary' 
            :lang="locale" 
            :disabled="disabled"
            :title="`${t('btn-add-new-row-title')}`"
            :alt="`${t('btn-add-new-row-title')}`"
            @click="menuItemSelected">
            <i class="fas fa-plus"></i>&nbsp;<span>{{ $t("btn-add-new-row-text") }}</span>
        </button>

         <!--<button id="btn-undo-action" class='button-primary' :title="`${t('btn-undo-action-title')}`">
            <i class="fas fa-undo"></i>&nbsp;<span>{{ $t("btn-undo-action-text") }}</span>
        </button>

        <button id="btn-redo-action" class='button-primary' :title="`${t('btn-redo-action-title')}`">
             <i class="fas fa-redo"></i>&nbsp;<span>{{ $t("btn-redo-action-text") }}</span>
        </button>-->

        <button 
            id="btn-clear-all" 
            class='button button-primary' 
            :lang="locale" 
            :disabled="disabled"
            :title="`${t('btn-clear-all-title')}`"
            :alt="`${t('btn-clear-all-title')}`"
            @click="menuItemSelected">
            <i class="fas fa-trash-alt"></i>&nbsp;<span>{{ $t("btn-clear-all-text") }}</span>
         </button>

        <a  id="btn-show-help" 
            class="button button-primary" 
            :lang="locale"
            :disabled="disabled"
            :title="`${t('btn-show-help-title')}`" 
            :alt="`${t('btn-clear-all-title')}`"
            target="vmt-help" 
            href="/vmt-help.html">
            <i class="fas fa-info"></i>&nbsp;<span>{{ $t("btn-show-help-text") }}</span>
        </a>

    </div>
</template>

<script setup lang="ts">
    import { useI18n } from "vue-i18n" 
    const { t, locale } = useI18n()

    import emitter from "@/composables/useEventBus"
    
    const props = defineProps({
        disabled: { type: Boolean, default: false }
    })

    
    const menuItemSelected = (e: Event) => {
        console.log(`clicked ${(e.currentTarget as HTMLElement).id}`)
        switch ((e.currentTarget as HTMLElement)?.id.toLowerCase()) {            
            case "btn-import-json": emitter.emit("importJSON", {}); break;
            case "btn-export-json": emitter.emit("exportJSON", {}); break;
            case "btn-export-csv": emitter.emit("exportCSV", {}); break;
            case "btn-export-rdf": emitter.emit("exportRDF", {}); break;
            case "btn-export-pdf": emitter.emit("exportPDF", {}); break;
            case "btn-add-new-row": emitter.emit("addNewRow", {}); break;
            case "btn-undo-action": emitter.emit("undoAction", {}); break;
            case "btn-redo-action": emitter.emit("redoAction", {}); break;
            case "btn-clear-all": emitter.emit("clearAll", {}); break;
            //case "btn-show-help": emit("itemSelected", "showHelp"); break;
            default: break;
        } 
    }
</script>

<style scoped>
    .button { margin-right: 4px; }
</style>