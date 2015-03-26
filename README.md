# Vocabulary Matching Tool  

The Vocabulary Matching Tool is intended to aid in the creation of mappings from a number of (SKOS) Linked Open Data vocabularies to the Getty Art & Architecture Thesaurus (AAT). The application presents source and target concepts side by side along with associated contextual metadata to make more informed mapping decisions. The set of mappings developed may then be exported to TriG (RDF) or delimited text (CSV) format for use in other applications.

The application is (currently) deployed to http://heritagedata.org/vocabularyMatchingTool/ but you can deploy it to your own web server by simply copying the contents of the /src directory to a directory on your server. There are no server side components, no configuration or database required - all data is obtained via AJAX calls to existing Linked Open Data (LOD) sources.

All source code used in the deployed application is included, and is made available under a Creative Commons zero (CC0) license.

