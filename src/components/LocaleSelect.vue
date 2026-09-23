<!--
================================================================================
Project : VMT
Module  : LocaleSelect.vue
Version : 0.0.1
Creator : Ceri Binding, University of South Wales / Prifysgol de Cymru
Contact : ceri.binding@southwales.ac.uk
Summary : Select a single item from a drop down list of languages/locales
Example : <LocaleSelect subset="en,fr" :display="LocaleDisplayOption.LOCALE_ONLY"/>
License : MIT
================================================================================
History :
0.0.1 02/04/2025 CFB Component ported from steleto-web application and improved
================================================================================
-->
<script setup lang="ts">
import { watch, computed } from "vue"
import { useI18n } from "vue-i18n"
const { locale } = useI18n()
import { LocaleDisplay as ld } from "@/composables/Constants"

// get list of all languages (from local JSON file)
//import { useFetchJSON } from "@/composables/useFetchJSON"
//const { data: languages } = useFetchJSON("/i18n_languages.json")
import languages from "@/../i18n_languages.json"

const props = defineProps({        
  disabled: {
    type: Boolean,
    default: false
  },
  display: {
    type: String,
    default: ld.LOCALE_ONLY,
    validator: (value: string) => Object.keys(ld).includes(value),
  },
  subset: {
    type: String,
    default: ""
  },
})

// filter to sorted subset of languages,
// based on subset (csv) property passed
const languageSubset = computed(() => {
  const subs = props.subset
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    

  return (languages || [])
    .filter((item) => subs.length === 0 || subs.includes(String(item["id"] || "").toLowerCase()))
    .map((item) => {
      return { id: item["id"], label: getDisplayLabel(item, props.display) }
    })
    .sort((a, b) => a.label.toLocaleLowerCase().localeCompare(b.label.toLocaleLowerCase()))
})


// label to be displayed for language/locale
const getDisplayLabel = (item: any, displayType: string) => {
  let label = ""
  switch (displayType) {
    // ENGLISH_ONLY - only display the English label for the language
    case ld.ENGLISH_ONLY:
      label = item.labelEN ? item.labelEN : item.id
      break
    // LOCALE_FIRST - display local label then English label in brackets
    case ld.LOCALE_FIRST:
      label = item.label ? `${item.label} (${item.labelEN})` : item.labelEN
      break
    // ENGLISH_FIRST - display English label then local label in brackets
    case ld.ENGLISH_FIRST:
      label = item.label ? `${item.labelEN} (${item.label})` : item.labelEN
      break
    default:
      // ld.LOCALE_ONLY - only display the local label for the language
      label = item.label || item.labelEN || item.id
      break
  }
  return label
}


// persist current locale selection if changed
watch(locale, (newValue) => {
  try {
    localStorage.setItem("locale", newValue)
  } catch(e) {
    console.error("Local storage access denied:", e)
  }
})

// get flag for display (where supported by browser)
// see https://dev.to/jorik/country-code-to-flag-emoji-a21
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + (char.codePointAt(0) ?? 0))
  return String.fromCodePoint(...codePoints)
}
</script>

<template>
  <span class="form-group locale-select">
    <i class="fas fa-language"></i>&nbsp;
    <select
      v-model="locale"
      id="localeSelector"
      class="form-control shadow-sm"
      :disabled="disabled"
      :lang="locale"
    >
      <option disabled value=''>{{ $t("language") }}:</option>
      <option
        v-for="item in languageSubset"
        :key="item.id"
        :value="item.id"
        :lang="locale"
        :title="item.label"
        :alt="item.label"
        :selected="item.id == locale"
      >{{ item.label }}</option>
    </select>
  </span>
</template>

<style scoped>
  .locale-select { margin: 10px; }
</style>