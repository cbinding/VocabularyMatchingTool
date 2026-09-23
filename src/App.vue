<template>
  <!-- .container is main centered wrapper -->
    <div class="container u-max-fullwidth" id="vuecontainer">
        <!--u-max-fullwidth-->
        <section class="row header">
            <div class="two-thirds column">
                <h3 id="app-title">{{ $t('app-title-text') }}</h3>
            </div>
            <div class="four u-pull-right">
                <LocaleSelect 
                    subset="de,en,es,fr,it,nl" 
                    :display="ld.LOCALE_ONLY" />          
                    <!--@change="changeLanguage($event)" />-->   
            </div>
        </section>
        <div class="row">
            <div class="column">
                <!--<button id="show-modal" @click="showModal = true">Show Modal</button>-->
                <!--<UswModal v-if="modal.show" @close="aatSearchCancel">-->
                    <!--<h4 slot="header">AAT lookup</h4>-->
                    <!--<AatSearch slot="body" @select="aatSearchSelect" @cancel="aatSearchCancel"></AatSearch>
                    <div slot="footer">&nbsp;</div>
                </UswModal>-->
                <Teleport to="#modal">
                    <!-- Dynamic Vue Component based on useModal component value -->
                    <component :is="modal.component.value" v-if="modal.show.value" @select="aatSearchSelect" @cancel="aatSearchCancel"/>
                </Teleport>
           </div>
        </div>

        <div class="row">
            <MappingsTable></MappingsTable>
        </div>

        <div class="row">
            <VmtMenuButtons></VmtMenuButtons>
        </div>

        <section class="row footer">
            <!--<hr />-->
            <div class="one-third column">
                <a target="_blank" href="//ariadne-infrastructure.eu/"><img alt="ARIADNEplus" src="/ariadne_plus_logo_500.png" width="250" /></a>
                <small><p id="footer-app-project">{{ $t("app-project-text") }}</p></small>
            </div>
            <div class="two-thirds">
                <small>
                    <p>Created by <a id="footer-app-author" target="_blank" href="//research.southwales.ac.uk/">{{ $t("app-author-text") }}</a></p>
                    <p>This application retrieves some information originating from Getty Art &amp; Architecture Thesaurus (AAT)&reg; which is made available under the <a target="aat" href="//opendatacommons.org/licenses/by/1.0/">ODC Attribution License</a>. See <a target="aat" href="//vocab.getty.edu/">//vocab.getty.edu/</a> for further details.</p>
                </small>
            </div>
        </section>
        <br>
        <VmtHelp></VmtHelp>     
    </div>
</template>


<script setup lang="ts">
    import { ref, markRaw, onMounted, onBeforeUnmount } from "vue"
    import { LocaleDisplay as ld } from "@/composables/Constants"
    import { useI18n } from "vue-i18n" 
    import { useModal } from "@/composables/useModal"
    import emitter from "@/composables/useEventBus"
    import LocaleSelect from "@/components/LocaleSelect.vue"
    import MappingsTable from "@/components/MappingsTable.vue"
    import AatSearchModal from "@/components/AatSearchModal.vue"
    import VmtMenuButtons from "@/components/VmtMenuButtons.vue"
    import VmtHelp from "@/components/VmtHelp.vue"
          
    const { t, locale, fallbackLocale } = useI18n()
    const selectedRowIndex = ref(-1)

    const modal = useModal()
    
   
    onMounted(() => { 

        modal.component.value = markRaw(AatSearchModal)

        // get cached settings from previous sessions 
        // first remove legacy (deprecated) cache settings
        try {
            localStorage?.removeItem("vmt-uilanguage")  
            localStorage?.removeItem("vmt-lastgeneratedrowid")              
            locale.value = localStorage?.getItem("locale") || "en" 
        } catch {}
    })

    onBeforeUnmount(() => {
        // save cached settings for future sessions
        localStorage?.setItem("locale", locale.value) 
    })

                    
    const aatSearchSelect = (evt: any) => {
        //console.log(`aatSearchSelect: { uri: "${ evt.uri }", label: "${ evt.label }"}`)
        if (selectedRowIndex.value) {
            emitter.emit("updateTable", evt)     
        }
        selectedRowIndex.value = -1;
        modal.hideModal()
    }
                
    const aatSearchCancel = (evt: any) => {
        selectedRowIndex.value = -1;
        modal.hideModal()
    }

</script>


<
