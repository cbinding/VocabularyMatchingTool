"use strict"

// adapted from https://vuejs.org/guide/reusability/composables.html
// usage:
// import { useFetchJSON } from "@composables/useFetchJSON"
// const { data, error } = useFetchJSON("https://tempuri.com/mydata.json")
import { ref, unref, watchEffect } from "vue"

export function useFetchJSON(url: URL | string) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    fetch(unref(url), {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
      .finally(() => {})
  })

  return { data, error }
}