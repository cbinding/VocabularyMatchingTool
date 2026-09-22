"use strict"

// how to display LocaleSelect dropdown options
export const LocaleDisplay = Object.freeze({
  LOCALE_FIRST: "LOCALE_FIRST",
  ENGLISH_FIRST: "ENGLISH_FIRST",
  LOCALE_ONLY: "LOCALE_ONLY",
  ENGLISH_ONLY: "ENGLISH_ONLY",
})


// usage: console.log(NS.SKOS)
// "http://www.w3.org/2004/02/skos/core#"
export const NS = Object.freeze({
  RDF: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  RDFS: "http://www.w3.org/2000/01/rdf-schema#",
  DC: "http://purl.org/dc/elements/1.1/",
  DCTERMS: "http://purl.org/dc/terms/",
  OWL: "http://www.w3.org/2002/07/owl#",
  XML: "http://www.w3.org/XML/1998/namespace",
  SKOS: "http://www.w3.org/2004/02/skos/core#",
  XL: "http://www.w3.org/2008/05/skos-xl#", 
  GVP: "http://vocab.getty.edu/ontology#",
  LUC: "http://www.ontotext.com/owlim/lucene#",
  AAT: "http://vocab.getty.edu/aat/"
})


// usage: console.log(URI_SKOS.CONCEPT)
// "http://www.w3.org/2004/02/skos/core#Concept"
export const URI_SKOS = Object.freeze({
  // entities
  COLLECTABLEPROPERTY: `${NS.SKOS}CollectableProperty`,
  COLLECTION: `${NS.SKOS}Collection`,
  CONCEPT: `${NS.SKOS}Concept`,
  CONCEPTSCHEME: `${NS.SKOS}ConceptScheme`,
  ORDEREDCOLLECTION: `${NS.SKOS}OrderedCollection`,
  // properties
  ALTLABEL: `${NS.SKOS}altLabel`,
  ALTSYMBOL: `${NS.SKOS}altSymbol`,
  BROADER: `${NS.SKOS}broader`,
  CHANGENOTE: `${NS.SKOS}changeNote`,
  DEFINITION: `${NS.SKOS}definition`,
  EDITORIALNOTE: `${NS.SKOS}editorialNote`,
  EXAMPLE: `${NS.SKOS}example`,
  HASTOPCONCEPT: `${NS.SKOS}hasTopConcept`,
  HIDDENLABEL: `${NS.SKOS}hiddenLabel`,
  HISTORYNOTE: `${NS.SKOS}historyNote`,
  INSCHEME: `${NS.SKOS}inScheme`,
  ISPRIMARYSUBJECTOF: `${NS.SKOS}isPrimarySubjectOf`,
  ISSUBJECTOF: `${NS.SKOS}isSubjectOf`,
  MEMBER: `${NS.SKOS}member`,
  MEMBERLIST: `${NS.SKOS}memberList`,
  NARROWER: `${NS.SKOS}narrower`,
  NOTE: `${NS.SKOS}note`,
  PREFLABEL: `${NS.SKOS}prefLabel`,
  PREFSYMBOL: `${NS.SKOS}prefSymbol`,
  PRIMARYSUBJECT: `${NS.SKOS}primarySubject`,
  RELATED: `${NS.SKOS}related`,
  SCOPENOTE: `${NS.SKOS}scopeNote`,
  SEMANTICRELATION: `${NS.SKOS}semanticRelation`,
  SUBJECT: `${NS.SKOS}subject`,
  SUBJECTINDICATOR: `${NS.SKOS}subjectIndicator`,
  SYMBOL: `${NS.SKOS}symbol`,
  // mapping properties
  BROADMATCH: `${NS.SKOS}broadMatch`,
  CLOSEMATCH: `${NS.SKOS}closeMatch`,
  EXACTMATCH: `${NS.SKOS}exactMatch`,
  NARROWMATCH: `${NS.SKOS}narrowMatch`,
  RELATEDMATCH: `${NS.SKOS}relatedMatch`,
})