/*
===============================================================================
Creator : Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: Any
Classes	: usw.usw.uri.RDF, usw.uri.RDFS, usw.uri.SKOS,  usw.uri.SKOSXL, 
          usw.uri.CRM, usw.uri.CRMEH, usw.uri.DC, usw.uri.DCTERMS, usw.uri.OWL
Summary	: Global constants of common namespace, entity and property URIs 
Example	: alert(usw.usw.uri.RDF.BAG) | alert(usw.usw.uri.RDF["BAG"])
		  either call returns "http://www.w3.org/1999/02/22-rdf-syntax-ns#Bag"
License : http://creativecommons.org/publicdomain/zero/1.0/ 
===============================================================================
History	:
003 CFB 11/03/2015	Adapted from old STAR script. Added SKOS mapping properties
===============================================================================
*/
var usw = this.usw || {};
usw.uri = usw.uri || {};

// usw.uri.RDF
// usage: alert(usw.uri.RDF.BAG) | alert(usw.uri.RDF["BAG"])
// either call returns "http://www.w3.org/1999/02/22-rdf-syntax-ns#Bag"
usw.uri.RDF = { NS: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" };
usw.uri.RDF = {
    // entities
    XMLLITERAL: usw.uri.RDF.NS + "XMLLiteral",
    PROPERTY: usw.uri.RDF.NS + "Property",
    STATEMENT: usw.uri.RDF.NS + "Statement",
    BAG: usw.uri.RDF.NS + "Bag",
    SEQ: usw.uri.RDF.NS + "Seq",
    ALT: usw.uri.RDF.NS + "Alt",
    LIST: usw.uri.RDF.NS + "List",
    // properties
    TYPE: usw.uri.RDF.NS + "type",
    FIRST: usw.uri.RDF.NS + "first",
    REST: usw.uri.RDF.NS + "rest",
    VALUE: usw.uri.RDF.NS + "value",
    SUBJECT: usw.uri.RDF.NS + "subject",
    PREDICATE: usw.uri.RDF.NS + "predicate",
    OBJECT: usw.uri.RDF.NS + "object",
    ID: usw.uri.RDF.NS + "ID"
};

// usw.uri.RDFS
// usage: alert(usw.uri.RDFS.LITERAL) | alert(usw.uri.RDFS["LITERAL"])
// either call returns "http://www.w3.org/2000/01/rdf-schema#Literal"
usw.uri.RDFS = { NS: "http://www.w3.org/2000/01/rdf-schema#" };
usw.uri.RDFS = {
    // entities
    RESOURCE: usw.uri.RDFS.NS + "Resource",
    LITERAL: usw.uri.RDFS.NS + "Literal",
    CLASS: usw.uri.RDFS.NS + "Class",
    DATATYPE: usw.uri.RDFS.NS + "Datatype",
    CONTAINER: usw.uri.RDFS.NS + "Container",
    CONTAINERMEMBERSHIPPROPERTY: usw.uri.RDFS.NS + "ContainerMembershipProperty",
    // properties
    SUBCLASSOF: usw.uri.RDFS.NS + "subClassOf",
    SUBPROPERTYOF: usw.uri.RDFS.NS + "subPropertyOf",
    DOMAIN: usw.uri.RDFS.NS + "domain",
    RANGE: usw.uri.RDFS.NS + "range",
    LABEL: usw.uri.RDFS.NS + "label",
    COMMENT: usw.uri.RDFS.NS + "comment",
    MEMBER: usw.uri.RDFS.NS + "member",
    SEEALSO: usw.uri.RDFS.NS + "seeAlso",
    ISDEFINEDBY: usw.uri.RDFS.NS + "isDefinedBy"
};

// usw.uri.SKOS
// usage: alert(usw.uri.SKOS.CONCEPT)OR alert(usw.uri.SKOS["CONCEPT"])
// either call returns "http://www.w3.org/2004/02/skos/core#Concept"		
usw.uri.SKOS = { NS: "http://www.w3.org/2004/02/skos/core#" };
usw.uri.SKOS = {
    // entities
    COLLECTABLEPROPERTY: usw.uri.SKOS.NS + "CollectableProperty",
    COLLECTION: usw.uri.SKOS.NS + "Collection",
    CONCEPT: usw.uri.SKOS.NS + "Concept",
    CONCEPTSCHEME: usw.uri.SKOS.NS + "ConceptScheme",
    ORDEREDCOLLECTION: usw.uri.SKOS.NS + "OrderedCollection",
    // properties
    ALTLABEL: usw.uri.SKOS.NS + "altLabel",
    ALTSYMBOL: usw.uri.SKOS.NS + "altSymbol",
    BROADER: usw.uri.SKOS.NS + "broader",
    CHANGENOTE: usw.uri.SKOS.NS + "changeNote",
    DEFINITION: usw.uri.SKOS.NS + "definition",
    EDITORIALNOTE: usw.uri.SKOS.NS + "editorialNote",
    EXAMPLE: usw.uri.SKOS.NS + "example",
    HASTOPCONCEPT: usw.uri.SKOS.NS + "hasTopConcept",
    HIDDENLABEL: usw.uri.SKOS.NS + "hiddenLabel",
    HISTORYNOTE: usw.uri.SKOS.NS + "historyNote",
    INSCHEME: usw.uri.SKOS.NS + "inScheme",
    ISPRIMARYSUBJECTOF: usw.uri.SKOS.NS + "isPrimarySubjectOf",
    ISSUBJECTOF: usw.uri.SKOS.NS + "isSubjectOf",
    MEMBER: usw.uri.SKOS.NS + "member",
    MEMBERLIST: usw.uri.SKOS.NS + "memberList",
    NARROWER: usw.uri.SKOS.NS + "narrower",
    NOTE: usw.uri.SKOS.NS + "note",
    PREFLABEL: usw.uri.SKOS.NS + "prefLabel",
    PREFSYMBOL: usw.uri.SKOS.NS + "prefSymbol",
    PRIMARYSUBJECT: usw.uri.SKOS.NS + "primarySubject",
    RELATED: usw.uri.SKOS.NS + "related",
    SCOPENOTE: usw.uri.SKOS.NS + "scopeNote",
    SEMANTICRELATION: usw.uri.SKOS.NS + "semanticRelation",
    SUBJECT: usw.uri.SKOS.NS + "subject",
    SUBJECTINDICATOR: usw.uri.SKOS.NS + "subjectIndicator",
    SYMBOL: usw.uri.SKOS.NS + "symbol",
    // mapping properties
    EXACTMATCH: usw.uri.SKOS.NS + "exactMatch",
    CLOSEMATCH: usw.uri.SKOS.NS + "closeMatch",
    BROADMATCH: usw.uri.SKOS.NS + "broadMatch",
    NARROWMATCH: usw.uri.SKOS.NS + "narrowMatch",
    RELATEDMATCH: usw.uri.SKOS.NS + "relatedMatch"
};

// usw.uri.SKOSXL
// usage: alert(usw.uri.SKOSXL.PREFLABEL)OR alert(usw.uri.SKOSXL["PREFLABEL"])
// either call returns "http://www.w3.org/2008/05/skos-xl#Label"		
usw.uri.SKOSXL = { NS: "http://www.w3.org/2008/05/skos-xl#" };
usw.uri.SKOSXL = {
    // entities
    LABEL: usw.uri.SKOSXL.NS + "Label",
    // properties
    PREFLABEL: usw.uri.SKOSXL.NS + "prefLabel",
    ALTLABEL: usw.uri.SKOSXL.NS + "altLabel",
    HIDDENLABEL: usw.uri.SKOSXL.NS + "hiddenLabel",
    LABELRELATION: usw.uri.SKOSXL.NS + "labelRelation",
    LITERALFORM: usw.uri.SKOSXL.NS + "literalForm"
};

// usw.uri.CRMEH
// usage: alert(usw.uri.CRMEH.EHE0001) | alert(usw.uri.CRMEH["EHE0001"])
// either call returns "http://purl.org/crmeh#EHE0001_EHProject"	
usw.uri.CRMEH = { NS: "http://purl.org/crmeh#" };
usw.uri.CRMEH = {
    // entities
    EHE0001: usw.uri.CRMEH.NS + "EHE0001_EHProject",
    EHE0002: usw.uri.CRMEH.NS + "EHE0002_ArchaeologicalSite",
    EHE0003: usw.uri.CRMEH.NS + "EHE0003_AreaOfInvestigation",
    EHE0004: usw.uri.CRMEH.NS + "EHE0004_SiteSubDivision",
    EHE0005: usw.uri.CRMEH.NS + "EHE0005_Group",
    EHE0006: usw.uri.CRMEH.NS + "EHE0006_GroupStuff",
    EHE0007: usw.uri.CRMEH.NS + "EHE0007_Context",
    EHE0008: usw.uri.CRMEH.NS + "EHE0008_ContextStuff",
    EHE0009: usw.uri.CRMEH.NS + "EHE0009_ContextFind",
    EHE0010: usw.uri.CRMEH.NS + "EHE0010_BulkFind",
    EHE0011: usw.uri.CRMEH.NS + "EHE0011_GroupEventRecord",
    EHE0012: usw.uri.CRMEH.NS + "EHE0012_ContextEventRecord",
    EHE0013: usw.uri.CRMEH.NS + "EHE0013_ContextSheet",
    EHE0014: usw.uri.CRMEH.NS + "EHE0014_ContextFindProductionEventRecord",
    EHE0015: usw.uri.CRMEH.NS + "EHE0015_ContextFindUseEventRecord",
    EHE0016: usw.uri.CRMEH.NS + "EHE0016_RecordDrawing",
    EHE0017: usw.uri.CRMEH.NS + "EHE0017_RecordPhotograph",
    EHE0018: usw.uri.CRMEH.NS + "EHE0018_ContextSample",
    EHE0019: usw.uri.CRMEH.NS + "EHE0019_AreaOfInvestigationDepiction",
    EHE0020: usw.uri.CRMEH.NS + "EHE0020_BulkFindComponentCount",
    EHE0021: usw.uri.CRMEH.NS + "EHE0021_EHProjectTimespan",
    EHE0022: usw.uri.CRMEH.NS + "EHE0022_ContextDepiction",
    EHE0023: usw.uri.CRMEH.NS + "EHE0023_ContextEventRecordNote",
    EHE0024: usw.uri.CRMEH.NS + "EHE0024_ContextEventRecordNoteType",
    EHE0025: usw.uri.CRMEH.NS + "EHE0025_ContextEventTimespan",
    EHE0026: usw.uri.CRMEH.NS + "EHE0026_ContextEventTimespanAppellation",
    EHE0027: usw.uri.CRMEH.NS + "EHE0027_ContextFindConditionAssessmentEventTimespan",
    EHE0028: usw.uri.CRMEH.NS + "EHE0028_ContextFindConditionAssessmentEventType",
    EHE0029: usw.uri.CRMEH.NS + "EHE0029_ContextFindConditionState",
    EHE0030: usw.uri.CRMEH.NS + "EHE0030_ContextFindMaterial",
    EHE0031: usw.uri.CRMEH.NS + "EHE0031_ContextFindMeasurement",
    EHE0032: usw.uri.CRMEH.NS + "EHE0032_ContextFindMeasurementEventTimespan",
    EHE0033: usw.uri.CRMEH.NS + "EHE0033_ContextFindMeasurementEventType",
    EHE0034: usw.uri.CRMEH.NS + "EHE0034_ContextFindMeasurementUnit",
    EHE0035: usw.uri.CRMEH.NS + "EHE0035_ContextFindMeasurementValue",
    EHE0036: usw.uri.CRMEH.NS + "EHE0036_ContextFindProductionEventRecordNote",
    EHE0037: usw.uri.CRMEH.NS + "EHE0037_ContextFindProductionEventRecordNoteType",
    EHE0038: usw.uri.CRMEH.NS + "EHE0038_ContextFindProductionEventTimespan",
    EHE0039: usw.uri.CRMEH.NS + "EHE0039_ContextFindProductionEventTimespanAppellation",
    EHE0040: usw.uri.CRMEH.NS + "EHE0040_ContextFindTreatmentLocation",
    EHE0041: usw.uri.CRMEH.NS + "EHE0041_ContextFindTreatmentProcedure",
    EHE0042: usw.uri.CRMEH.NS + "EHE0042_ContextFindTreatmentType",
    EHE0043: usw.uri.CRMEH.NS + "EHE0043_ContextFindUID",
    EHE0044: usw.uri.CRMEH.NS + "EHE0044_ContextFindUseEventRecordNote",
    EHE0045: usw.uri.CRMEH.NS + "EHE0045_ContextFindUseEventRecordNoteType",
    EHE0046: usw.uri.CRMEH.NS + "EHE0046_ContextNote",
    EHE0047: usw.uri.CRMEH.NS + "EHE0047_ContextNoteType",
    EHE0048: usw.uri.CRMEH.NS + "EHE0048_ContextRecord",
    EHE0049: usw.uri.CRMEH.NS + "EHE0049_ContextSampleMeasurement",
    EHE0050: usw.uri.CRMEH.NS + "EHE0050_ContextSampleMeasurementType",
    EHE0051: usw.uri.CRMEH.NS + "EHE0051_ContextSampleMeasurementUnit",
    EHE0052: usw.uri.CRMEH.NS + "EHE0052_ContextSampleMeasurementValue",
    EHE0053: usw.uri.CRMEH.NS + "EHE0053_ContextSampleType",
    EHE0054: usw.uri.CRMEH.NS + "EHE0054_ContextStuffMeasurement",
    EHE0055: usw.uri.CRMEH.NS + "EHE0055_ContextStuffMeasurementEventTimespan",
    EHE0056: usw.uri.CRMEH.NS + "EHE0056_ContextStuffMeasurementEventType",
    EHE0057: usw.uri.CRMEH.NS + "EHE0057_ContextStuffMeasurementUnit",
    EHE0058: usw.uri.CRMEH.NS + "EHE0058_ContextStuffMeasurementValue",
    EHE0059: usw.uri.CRMEH.NS + "EHE0059_ContextStuffNote",
    EHE0060: usw.uri.CRMEH.NS + "EHE0060_ContextStuffNoteType",
    EHE0061: usw.uri.CRMEH.NS + "EHE0061_ContextUID",
    EHE0062: usw.uri.CRMEH.NS + "EHE0062_FlotationSample",
    EHE0063: usw.uri.CRMEH.NS + "EHE0063_FlotationSampleResidue",
    EHE0064: usw.uri.CRMEH.NS + "EHE0064_FlotationSampleResidueMeasurement",
    EHE0065: usw.uri.CRMEH.NS + "EHE0065_FlotationSampleResidueMeasurementUnit",
    EHE0066: usw.uri.CRMEH.NS + "EHE0066_FlotationSampleResidueMeasurementValue",
    EHE0067: usw.uri.CRMEH.NS + "EHE0067.FlotationSampleResidueType",
    EHE0068: usw.uri.CRMEH.NS + "EHE0068_GroupEventRecordNote",
    EHE0069: usw.uri.CRMEH.NS + "EHE0069_GroupEventRecordNoteType",
    EHE0070: usw.uri.CRMEH.NS + "EHE0070_GroupEventTimespan",
    EHE0071: usw.uri.CRMEH.NS + "EHE0071_GroupEventTimespanAppellation",
    EHE0072: usw.uri.CRMEH.NS + "EHE0072_GroupEventType",
    EHE0073: usw.uri.CRMEH.NS + "EHE0073_GroupingPhasingProcedure",
    EHE0074: usw.uri.CRMEH.NS + "EHE0074_IdentifiedFeature",
    EHE0075: usw.uri.CRMEH.NS + "EHE0075_IdentifiedFeatureDepiction",
    EHE0076: usw.uri.CRMEH.NS + "EHE0076_ProjectDesign",
    EHE0077: usw.uri.CRMEH.NS + "EHE0077_ProjectTeamMember",
    EHE0078: usw.uri.CRMEH.NS + "EHE0078_ProjectTeamMemberRole",
    EHE0079: usw.uri.CRMEH.NS + "EHE0079_RecordDrawingNote",
    EHE0080: usw.uri.CRMEH.NS + "EHE0080_RecordDrawingNoteType",
    EHE0081: usw.uri.CRMEH.NS + "EHE0081_RecordDrawingReferenceType",
    EHE0082: usw.uri.CRMEH.NS + "EHE0082_RecordDrawingSheet",
    EHE0083: usw.uri.CRMEH.NS + "EHE0083_RecordPhotographNote",
    EHE0084: usw.uri.CRMEH.NS + "EHE0084_RecordPhotographNoteType",
    EHE0085: usw.uri.CRMEH.NS + "EHE0085_RecordPhotographReferenceType",
    EHE0086: usw.uri.CRMEH.NS + "EHE0086_ResponsibleAgent",
    EHE0087: usw.uri.CRMEH.NS + "EHE0087_SiteSubDivisionAppellation",
    EHE0088: usw.uri.CRMEH.NS + "EHE0088_SiteSubDivisionDepiction",
    EHE0089: usw.uri.CRMEH.NS + "EHE0089_StorageLocation",
    EHE0090: usw.uri.CRMEH.NS + "EHE0090_SurveyDataset",
    EHE0091: usw.uri.CRMEH.NS + "EHE0091_Timestamp",
    EHE0092: usw.uri.CRMEH.NS + "EHE0092_GroupUID",
    EHE0093: usw.uri.CRMEH.NS + "EHE0093_GroupDepiction",
    EHE0094: usw.uri.CRMEH.NS + "EHE0094_FlotationSampleResidueMeasurementType",
    EHE0095: usw.uri.CRMEH.NS + "EHE0095_ContextFindProductionEventLocation",
    EHE0096: usw.uri.CRMEH.NS + "EHE0096_ContextFindGeneralUse",
    EHE0097: usw.uri.CRMEH.NS + "EHE0097_ContextFindIntendedUse",
    EHE0098: usw.uri.CRMEH.NS + "EHE0098_ContextFindExcavationEventTimespan",
    EHE0099: usw.uri.CRMEH.NS + "EHE0099_ContextFindUseEventTimespan",
    EHE1001: usw.uri.CRMEH.NS + "EHE1001_ContextEvent",
    EHE1002: usw.uri.CRMEH.NS + "EHE1002_ContextFindProductionEvent",
    EHE1003: usw.uri.CRMEH.NS + "EHE1003_GroupEvent",
    EHE1004: usw.uri.CRMEH.NS + "EHE1004_ContextFindDepositionEvent",
    EHE1005: usw.uri.CRMEH.NS + "EHE1005_ContextFindUseEvent",
    EHE2001: usw.uri.CRMEH.NS + "EHE2001_ContextExcavationEvent",
    EHE2002: usw.uri.CRMEH.NS + "EHE2002_ContextFindClassificationEvent",
    EHE2003: usw.uri.CRMEH.NS + "EHE2003_ContextFindTreatmentEvent",
    EHE2004: usw.uri.CRMEH.NS + "EHE2004_GroupingPhasingEvent",
    EHE2005: usw.uri.CRMEH.NS + "EHE2005_ContextFindDatingEvent",
    EHE2006: usw.uri.CRMEH.NS + "EHE2006_ContextSamplingEvent",
    EHE2007: usw.uri.CRMEH.NS + "EHE2007_SurveyEvent",
    EHE2008: usw.uri.CRMEH.NS + "EHE2008_ProcessSurveyDatasetEvent",
    EHE2009: usw.uri.CRMEH.NS + "EHE2009_TransferObjectEvent",
    EHE2010: usw.uri.CRMEH.NS + "EHE2010_DepictionEvent",
    EHE2011: usw.uri.CRMEH.NS + "EHE2011_BulkFindItemRemovalEvent",
    EHE2012: usw.uri.CRMEH.NS + "EHE2012_ContextFindConditionAssessmentEvent",
    EHE2013: usw.uri.CRMEH.NS + "EHE2013_ContextFindIdentifierAssignmentEvent",
    EHE2014: usw.uri.CRMEH.NS + "EHE2014_ContextFindUseAssessmentEvent",
    EHE2015: usw.uri.CRMEH.NS + "EHE2015_ContextSampleProcessingEvent",
    EHE2016: usw.uri.CRMEH.NS + "EHE2016_ContextStuffMeasurementEvent",
    EHE2017: usw.uri.CRMEH.NS + "EHE2017_FlotationSampleProcessingEvent",
    EHE2018: usw.uri.CRMEH.NS + "EHE2018_FlotationSampleResidueProcessingEvent",
    EHE2019: usw.uri.CRMEH.NS + "EHE2019_SimpleNameAssignmentEvent",
    EHE2020: usw.uri.CRMEH.NS + "EHE2020_ContextFindMeasurementEvent",
    EHE2021: usw.uri.CRMEH.NS + "EHE2021_BulkFindAssessment",
    // properties
    EHP1F: usw.uri.CRMEH.NS + "EHP1F_is_trace_of",
    EHP2F: usw.uri.CRMEH.NS + "EHP2F_is_trace_of_type",
    EHP3B: usw.uri.CRMEH.NS + "EHP3B_was_occupied_by",
    EHP3F: usw.uri.CRMEH.NS + "EHP3F_occupied",
    EHP4B: usw.uri.CRMEH.NS + "EHP4B_is_depicted_by",
    EHP4F: usw.uri.CRMEH.NS + "EHP4F_depicts",
    EHP5F: usw.uri.CRMEH.NS + "EHP5F_is_thesaurus_concept",
    EHP1003B: usw.uri.CRMEH.NS + "EHP1003B_is_note_of",
    EXP1F: usw.uri.CRMEH.NS + "EXP1F_year_min",
    EXP2F: usw.uri.CRMEH.NS + "EXP2F_.year_max",
    EXP3F: usw.uri.CRMEH.NS + "EXP3F_spatial_x",
    EXP4F: usw.uri.CRMEH.NS + "EXP4F_spatial_y",
    EXP5F: usw.uri.CRMEH.NS + "EXP5F_spatial_z",
    EXP10F: usw.uri.CRMEH.NS + "EXP10F_is_represented_by"
};

// Dublin Core
// usage: alert(usw.uri.DC.PROPERTY.TITLE) | alert(usw.uri.DC.PROPERTY["TITLE"])
// either call returns "http://purl.org/dc/elements/1.1/title"	
usw.uri.DC = { NS: "http://purl.org/dc/elements/1.1/" };
usw.uri.DC.PROPERTY = {
    // properties
    TITLE: usw.uri.DC.NS + "title",
    CREATOR: usw.uri.DC.NS + "creator",
    SUBJECT: usw.uri.DC.NS + "subject",
    DESCRIPTION: usw.uri.DC.NS + "description",
    PUBLISHER: usw.uri.DC.NS + "publisher",
    CONTRIBUTOR: usw.uri.DC.NS + "contributor",
    DATE: usw.uri.DC.NS + "date",
    TYPE: usw.uri.DC.NS + "type",
    FORMAT: usw.uri.DC.NS + "format",
    IDENTIFIER: usw.uri.DC.NS + "identifier",
    SOURCE: usw.uri.DC.NS + "source",
    LANGUAGE: usw.uri.DC.NS + "language",
    RELATION: usw.uri.DC.NS + "relation",
    COVERAGE: usw.uri.DC.NS + "coverage",
    RIGHTS: usw.uri.DC.NS + "rights"
};

// usw.uri.DCTERMS
// usage: alert(usw.uri.DCTERMS.SUBJECTSCHEME) | alert(usw.uri.DCTERMS["SUBJECTSCHEME"])
// either call returns "http://purl.org/dc/terms/SubjectScheme"		
usw.uri.DCTERMS = { NS: "http://purl.org/dc/terms/" };
usw.uri.DCTERMS = {
    // entities
    SUBJECTSCHEME: usw.uri.DCTERMS.NS + "SubjectScheme",
    DATESCHEME: usw.uri.DCTERMS.NS + "DateScheme",
    FORMATSCHEME: usw.uri.DCTERMS.NS + "FormatScheme",
    LANGUAGESCHEME: usw.uri.DCTERMS.NS + "LanguageScheme",
    SPATIALSCHEME: usw.uri.DCTERMS.NS + "SpatialScheme",
    TEMPORALSCHEME: usw.uri.DCTERMS.NS + "TemporalScheme",
    TYPESCHEME: usw.uri.DCTERMS.NS + "TypeScheme",
    IDENTIFIERSCHEME: usw.uri.DCTERMS.NS + "IdentifierScheme",
    RELATIONSCHEME: usw.uri.DCTERMS.NS + "RelationScheme",
    SOURCESCHEME: usw.uri.DCTERMS.NS + "SourceScheme",
    // properties 
    AUDIENCE: usw.uri.DCTERMS.NS + "audience",
    ALTERNATIVE: usw.uri.DCTERMS.NS + "alternative",
    TABLEOFCONTENTS: usw.uri.DCTERMS.NS + "tableOfContents",
    ABSTRACT: usw.uri.DCTERMS.NS + "abstract",
    CREATED: usw.uri.DCTERMS.NS + "created",
    VALID: usw.uri.DCTERMS.NS + "valid",
    AVAILABLE: usw.uri.DCTERMS.NS + "available",
    ISSUED: usw.uri.DCTERMS.NS + "issued",
    MODIFIED: usw.uri.DCTERMS.NS + "modified",
    EXTENT: usw.uri.DCTERMS.NS + "extent",
    MEDIUM: usw.uri.DCTERMS.NS + "medium",
    ISVERSIONOF: usw.uri.DCTERMS.NS + "isVersionOf",
    HASVERSION: usw.uri.DCTERMS.NS + "hasVersion",
    ISREPLACEDBY: usw.uri.DCTERMS.NS + "isReplacedBy",
    REPLACES: usw.uri.DCTERMS.NS + "replaces",
    ISREQUIREDBY: usw.uri.DCTERMS.NS + "isRequiredBy",
    REQUIRES: usw.uri.DCTERMS.NS + "requires",
    ISPARTOF: usw.uri.DCTERMS.NS + "isPartOf",
    HASPART: usw.uri.DCTERMS.NS + "hasPart",
    ISREFERENCEDBY: usw.uri.DCTERMS.NS + "isReferencedBy",
    REFERENCES: usw.uri.DCTERMS.NS + "references",
    ISFORMATOF: usw.uri.DCTERMS.NS + "isFormatOf",
    HASFORMAT: usw.uri.DCTERMS.NS + "hasFormat",
    CONFORMSTO: usw.uri.DCTERMS.NS + "conformsTo",
    SPATIAL: usw.uri.DCTERMS.NS + "spatial",
    TEMPORAL: usw.uri.DCTERMS.NS + "temporal",
    MEDIATOR: usw.uri.DCTERMS.NS + "mediator",
    DATEACCEPTED: usw.uri.DCTERMS.NS + "dateAccepted",
    DATECOPYRIGHTED: usw.uri.DCTERMS.NS + "dateCopyrighted",
    DATESUBMITTED: usw.uri.DCTERMS.NS + "dateSubmitted",
    EDUCATIONLEVEL: usw.uri.DCTERMS.NS + "educationLevel",
    ACCESSRIGHTS: usw.uri.DCTERMS.NS + "accessRights",
    BIBLIOGRAPHICCITATION: usw.uri.DCTERMS.NS + "bibliographicCitation",
    LICENSE: usw.uri.DCTERMS.NS + "license",
    RIGHTSHOLDER: usw.uri.DCTERMS.NS + "rightsHolder",
    PROVENANCE: usw.uri.DCTERMS.NS + "provenance",
    INSTRUCTIONALMETHOD: usw.uri.DCTERMS.NS + "instructionalMethod",
    ACCRUALMETHOD: usw.uri.DCTERMS.NS + "accrualMethod",
    ACCRUALPERIODICITY: usw.uri.DCTERMS.NS + "accrualPeriodicity",
    ACCRUALPOLICY: usw.uri.DCTERMS.NS + "accrualPolicy"
};

// usw.uri.OWL
// usage: alert(usw.uri.OWL.ALLDIFFERENT) | alert(usw.uri.OWL["ALLDIFFERENT"])
// either call returns "http://www.w3.org/2002/07/owl#AllDifferent"	
usw.uri.OWL = { NS: "http://www.w3.org/2002/07/owl#" };
usw.uri.OWL = {
    // entities
    ALLDIFFERENT: usw.uri.OWL.NS + "AllDifferent",
    ANNOTATIONPROPERTY: usw.uri.OWL.NS + "AnnotationProperty",
    CLASS: usw.uri.OWL.NS + "Class",
    DATARANGE: usw.uri.OWL.NS + "DataRange",
    DATATYPEPROPERTY: usw.uri.OWL.NS + "DatatypeProperty",
    DEPRECATEDCLASS: usw.uri.OWL.NS + "DeprecatedClass",
    DEPRECATEDPROPERTY: usw.uri.OWL.NS + "DeprecatedProperty",
    FUNCTIONALPROPERTY: usw.uri.OWL.NS + "FunctionalProperty",
    INVERSEFUNCTIONALPROPERTY: usw.uri.OWL.NS + "InverseFunctionalProperty",
    NOTHING: usw.uri.OWL.NS + "Nothing",
    OBJECTPROPERTY: usw.uri.OWL.NS + "ObjectProperty",
    ONTOLOGY: usw.uri.OWL.NS + "Ontology",
    ONTOLOGYPROPERTY: usw.uri.OWL.NS + "OntologyProperty",
    RESTRICTION: usw.uri.OWL.NS + "Restriction",
    SYMMETRICPROPERTY: usw.uri.OWL.NS + "SymmetricProperty",
    THING: usw.uri.OWL.NS + "Thing",
    TRANSITIVEPROPERTY: usw.uri.OWL.NS + "TransitiveProperty",
    // properties
    ALLVALUESFROM: usw.uri.OWL.NS + "allValuesFrom",
    BACKWARDCOMPATIBLEWITH: usw.uri.OWL.NS + "backwardCompatibleWith",
    CARDINALITY: usw.uri.OWL.NS + "cardinality",
    COMPLEMENTOF: usw.uri.OWL.NS + "complementOf",
    DIFFERENTFROM: usw.uri.OWL.NS + "differentFrom",
    DISJOINTWITH: usw.uri.OWL.NS + "disjointWith",
    DISTINCTMEMBERS: usw.uri.OWL.NS + "distinctMembers",
    EQUIVALENTCLASS: usw.uri.OWL.NS + "equivalentClass",
    EQUIVALENTPROPERTY: usw.uri.OWL.NS + "equivalentProperty",
    HASVALUE: usw.uri.OWL.NS + "hasValue",
    IMPORTS: usw.uri.OWL.NS + "imports",
    INCOMPATIBLEWITH: usw.uri.OWL.NS + "incompatibleWith",
    INTERSECTIONOF: usw.uri.OWL.NS + "intersectionOf",
    INVERSEOF: usw.uri.OWL.NS + "inverseOf",
    MAXCARDINALITY: usw.uri.OWL.NS + "maxCardinality",
    MINCARDINALITY: usw.uri.OWL.NS + "minCardinality",
    ONEOF: usw.uri.OWL.NS + "oneOf",
    ONPROPERTY: usw.uri.OWL.NS + "onProperty",
    PRIORVERSION: usw.uri.OWL.NS + "priorVersion",
    SAMEAS: usw.uri.OWL.NS + "sameAs",
    SOMEVALUESFROM: usw.uri.OWL.NS + "someValuesFrom",
    UNIONOF: usw.uri.OWL.NS + "unionOf",
    VERSIONINFO: usw.uri.OWL.NS + "versionInfo"
};

// usw.uri.CRM - represents version 5.0.4 of CIDOC CRM
usw.uri.CRM = { NS: "http://www.cidoc-crm.org/cidoc-crm/" };
usw.uri.CRM = {
    // entities
    E1: usw.uri.CRM.NS + "E1_CRM_Entity",
    E2: usw.uri.CRM.NS + "E2_Temporal_Entity",
    E3: usw.uri.CRM.NS + "E3_Condition_State",
    E4: usw.uri.CRM.NS + "E4_Period",
    E5: usw.uri.CRM.NS + "E5_Event",
    E6: usw.uri.CRM.NS + "E6_Destruction",
    E7: usw.uri.CRM.NS + "E7_Activity",
    E8: usw.uri.CRM.NS + "E8_Acquisition",
    E9: usw.uri.CRM.NS + "E9_Move",
    E10: usw.uri.CRM.NS + "E10_Transfer_of_Custody",
    E11: usw.uri.CRM.NS + "E11_Modification",
    E12: usw.uri.CRM.NS + "E12_Production",
    E13: usw.uri.CRM.NS + "E13_Attribute_Assignment",
    E14: usw.uri.CRM.NS + "E14_Condition_Assessment",
    E15: usw.uri.CRM.NS + "E15_Identifier_Assignment",
    E16: usw.uri.CRM.NS + "E16_Measurement",
    E17: usw.uri.CRM.NS + "E17_Type_Assignment",
    E18: usw.uri.CRM.NS + "E18_Physical_Thing",
    E19: usw.uri.CRM.NS + "E19_Physical_Object",
    E20: usw.uri.CRM.NS + "E20_Biological_Object",
    E21: usw.uri.CRM.NS + "E21_Person",
    E22: usw.uri.CRM.NS + "E22_Man-Made_Object",
    E24: usw.uri.CRM.NS + "E24_Physical_Man-Made_Thing",
    E25: usw.uri.CRM.NS + "E25_Man-Made_Feature",
    E26: usw.uri.CRM.NS + "E26_Physical_Feature",
    E27: usw.uri.CRM.NS + "E27_Site",
    E28: usw.uri.CRM.NS + "E28_Conceptual_Object",
    E29: usw.uri.CRM.NS + "E29_Design_or_Procedure",
    E30: usw.uri.CRM.NS + "E30_Right",
    E31: usw.uri.CRM.NS + "E31_Document",
    E32: usw.uri.CRM.NS + "E32_Authority_Document",
    E33: usw.uri.CRM.NS + "E33_Linguistic_Object",
    E34: usw.uri.CRM.NS + "E34_Inscription",
    E35: usw.uri.CRM.NS + "E35_Title",
    E36: usw.uri.CRM.NS + "E36_Visual_Item",
    E37: usw.uri.CRM.NS + "E37_Mark",
    E38: usw.uri.CRM.NS + "E38_Image",
    E39: usw.uri.CRM.NS + "E39_Actor",
    E40: usw.uri.CRM.NS + "E40_Legal_Body",
    E41: usw.uri.CRM.NS + "E41_Appellation",
    E42: usw.uri.CRM.NS + "E42_Identifier",
    E44: usw.uri.CRM.NS + "E44_Place_Appellation",
    E45: usw.uri.CRM.NS + "E45_Address",
    E46: usw.uri.CRM.NS + "E46_Section_Definition",
    E47: usw.uri.CRM.NS + "E47_Spatial_Coordinates",
    E48: usw.uri.CRM.NS + "E48_Place_Name",
    E49: usw.uri.CRM.NS + "E49_Time_Appellation",
    E50: usw.uri.CRM.NS + "E50_Date",
    E51: usw.uri.CRM.NS + "E51_Contact_Point",
    E52: usw.uri.CRM.NS + "E52_Time-Span",
    E53: usw.uri.CRM.NS + "E53_Place",
    E54: usw.uri.CRM.NS + "E54_Dimension",
    E55: usw.uri.CRM.NS + "E55_Type",
    E56: usw.uri.CRM.NS + "E56_Language",
    E57: usw.uri.CRM.NS + "E57_Material",
    E58: usw.uri.CRM.NS + "E58_Measurement_Unit",
    E59: usw.uri.CRM.NS + "E59_PrimitiveValue",
    E60: usw.uri.CRM.NS + "E60_Number",
    E61: usw.uri.CRM.NS + "E61_Time_Primitive",
    E62: usw.uri.CRM.NS + "E62_String",
    E63: usw.uri.CRM.NS + "E63_Beginning_of_Existence",
    E64: usw.uri.CRM.NS + "E64_End_of_Existence",
    E65: usw.uri.CRM.NS + "E65_Creation",
    E66: usw.uri.CRM.NS + "E66_Formation",
    E67: usw.uri.CRM.NS + "E67_Birth",
    E68: usw.uri.CRM.NS + "E68_Dissolution",
    E69: usw.uri.CRM.NS + "E69_Death",
    E70: usw.uri.CRM.NS + "E70_Thing",
    E71: usw.uri.CRM.NS + "E71_Man-Made_Thing",
    E72: usw.uri.CRM.NS + "E72_Legal_Object",
    E73: usw.uri.CRM.NS + "E73_Information_Object",
    E74: usw.uri.CRM.NS + "E74_Group",
    E75: usw.uri.CRM.NS + "E75_Conceptual_Object_Appellation",
    E77: usw.uri.CRM.NS + "E77_Persistent_Item",
    E78: usw.uri.CRM.NS + "E78_Collection",
    E79: usw.uri.CRM.NS + "E79_Part_Addition",
    E80: usw.uri.CRM.NS + "E80_Part_Removal",
    E81: usw.uri.CRM.NS + "E81_Transformation",
    E82: usw.uri.CRM.NS + "E82_Actor_Appellation",
    E83: usw.uri.CRM.NS + "E83_Type_Creation",
    E84: usw.uri.CRM.NS + "E84_Information_Carrier",
    E85: usw.uri.CRM.NS + "E85_Joining",
    E86: usw.uri.CRM.NS + "E86_Leaving",
    E87: usw.uri.CRM.NS + "E87_Curation_Activity",
    E89: usw.uri.CRM.NS + "E89_Propositional_Object",
    E90: usw.uri.CRM.NS + "E90_Symbolic_Object",
    // properties
    P1: usw.uri.CRM.NS + "P1_is_identified_by",
    P1i: usw.uri.CRM.NS + "P1i_identifies",
    P2: usw.uri.CRM.NS + "P2_has_type",
    P2i: usw.uri.CRM.NS + "P2i_is_type_of",
    P3: usw.uri.CRM.NS + "P3_has_note",
    P4: usw.uri.CRM.NS + "P4_has_time-span",
    P4i: usw.uri.CRM.NS + "P4i_is_time-span_of",
    P5: usw.uri.CRM.NS + "P5_consists_of",
    P5i: usw.uri.CRM.NS + "P5i_forms_part_of",
    P7: usw.uri.CRM.NS + "P7_took_place_at",
    P7i: usw.uri.CRM.NS + "P7i_witnessed",
    P8: usw.uri.CRM.NS + "P8_took_place_on_or_within",
    P8i: usw.uri.CRM.NS + "P8i_witnessed",
    P9: usw.uri.CRM.NS + "P9_consists_of",
    P9i: usw.uri.CRM.NS + "P9i_forms_part_of",
    P10: usw.uri.CRM.NS + "P10_falls_within",
    P10i: usw.uri.CRM.NS + "P10i_contains",
    P11: usw.uri.CRM.NS + "P11_had_participant",
    P11i: usw.uri.CRM.NS + "P11i_participated_in",
    P12: usw.uri.CRM.NS + "P12_occurred_in_the_presence_of",
    P12i: usw.uri.CRM.NS + "P12i_was_present_at",
    P13: usw.uri.CRM.NS + "P13_destroyed",
    P13i: usw.uri.CRM.NS + "P13i_was_destroyed_by",
    P14: usw.uri.CRM.NS + "P14_carried_out_by",
    P14i: usw.uri.CRM.NS + "P14i_performed",
    P15: usw.uri.CRM.NS + "P15_was_influenced_by",
    P15i: usw.uri.CRM.NS + "P15i_influenced",
    P16: usw.uri.CRM.NS + "P16_used_specific_object",
    P16i: usw.uri.CRM.NS + "P16i_was_used_for",
    P17: usw.uri.CRM.NS + "P17_was_motivated_by",
    P17i: usw.uri.CRM.NS + "P17i_motivated",
    P19: usw.uri.CRM.NS + "P19_was_intended_use_of",
    P19i: usw.uri.CRM.NS + "P19i_was_made_for",
    P20: usw.uri.CRM.NS + "P20_had_specific_purpose",
    P20i: usw.uri.CRM.NS + "P20i_was_purpose_of",
    P21: usw.uri.CRM.NS + "P21_had_general_purpose",
    P21i: usw.uri.CRM.NS + "P21i_was_purpose_of",
    P22: usw.uri.CRM.NS + "P22_transferred_title_to",
    P22i: usw.uri.CRM.NS + "P22i_acquired_title_through",
    P23: usw.uri.CRM.NS + "P23_transferred_title_from",
    P23i: usw.uri.CRM.NS + "P23i_surrendered_title_through",
    P24: usw.uri.CRM.NS + "P24_transferred_title_of",
    P24i: usw.uri.CRM.NS + "P24i_changed_ownership_through",
    P25: usw.uri.CRM.NS + "P25_moved",
    P25i: usw.uri.CRM.NS + "P25i_moved_by",
    P26: usw.uri.CRM.NS + "P26_moved_to",
    P26i: usw.uri.CRM.NS + "P26i_was_destination_of",
    P27: usw.uri.CRM.NS + "P27_moved_from",
    P27i: usw.uri.CRM.NS + "P27i_was_origin_of",
    P28: usw.uri.CRM.NS + "P28_custody_surrendered_by",
    P28i: usw.uri.CRM.NS + "P28i_surrendered_custody_through",
    P29: usw.uri.CRM.NS + "P29_custody_received_by",
    P29i: usw.uri.CRM.NS + "P29i_received_custody_through",
    P30: usw.uri.CRM.NS + "P30_transferred_custody_of",
    P30i: usw.uri.CRM.NS + "P30i_custody_transferred_through",
    P31: usw.uri.CRM.NS + "P31_has_modified",
    P31i: usw.uri.CRM.NS + "P31i_was_modified_by",
    P32: usw.uri.CRM.NS + "P32_used_general_technique",
    P32i: usw.uri.CRM.NS + "P32i_was_technique_of",
    P33: usw.uri.CRM.NS + "P33_used_specific_technique",
    P33i: usw.uri.CRM.NS + "P33i_was_used_by",
    P34: usw.uri.CRM.NS + "P34_concerned",
    P34i: usw.uri.CRM.NS + "P34i_was_assessed_by",
    P35: usw.uri.CRM.NS + "P35_has_identified",
    P35i: usw.uri.CRM.NS + "P35i_was_identified_by",
    P37: usw.uri.CRM.NS + "P37_assigned",
    P37i: usw.uri.CRM.NS + "P37i_was_assigned_by",
    P38: usw.uri.CRM.NS + "P38_deassigned",
    P38i: usw.uri.CRM.NS + "P38i_was_deassigned_by",
    P39: usw.uri.CRM.NS + "P39_measured",
    P39i: usw.uri.CRM.NS + "P39i_was_measured_by",
    P40: usw.uri.CRM.NS + "P40_observed_dimension",
    P40i: usw.uri.CRM.NS + "P40i_was_observed_in",
    P41: usw.uri.CRM.NS + "P41_classified",
    P41i: usw.uri.CRM.NS + "P41i_was_classified_by",
    P42: usw.uri.CRM.NS + "P42_assigned",
    P42i: usw.uri.CRM.NS + "P42i_was_assigned_by",
    P43: usw.uri.CRM.NS + "P43_has_dimension",
    P43i: usw.uri.CRM.NS + "P43i_is_dimension_of",
    P44: usw.uri.CRM.NS + "P44_has_condition",
    P44i: usw.uri.CRM.NS + "P44i_condition_of",
    P45: usw.uri.CRM.NS + "P45_consists_of",
    P45i: usw.uri.CRM.NS + "P45i_is_incorporated_in",
    P46: usw.uri.CRM.NS + "P46_is_composed_of",
    P46i: usw.uri.CRM.NS + "P46i_forms_part_of",
    P48: usw.uri.CRM.NS + "P48_has_preferred_identifier",
    P48i: usw.uri.CRM.NS + "P48i_is_preferred_identifier_of",
    P49: usw.uri.CRM.NS + "P49_has_former_or_current_keeper",
    P49i: usw.uri.CRM.NS + "P49i_is_former_or_current_keeper_of",
    P50: usw.uri.CRM.NS + "P50_has_current_keeper",
    P50i: usw.uri.CRM.NS + "P50i_is_current_keeper_of",
    P51: usw.uri.CRM.NS + "P51_has_former_or_current_owner",
    P51i: usw.uri.CRM.NS + "P51i_is_former_or_current_owner_of",
    P52: usw.uri.CRM.NS + "P52_has_current_owner",
    P52i: usw.uri.CRM.NS + "P52i_is_current_owner_of",
    P53: usw.uri.CRM.NS + "P53_has_former_or_current_location",
    P53i: usw.uri.CRM.NS + "P53i_is_former_or_current_location_of",
    P54: usw.uri.CRM.NS + "P54_has_current_permanent_location",
    P54i: usw.uri.CRM.NS + "P54i_is_current_permanent_location_of",
    P55: usw.uri.CRM.NS + "P55_has_current_location",
    P55i: usw.uri.CRM.NS + "P55i_currently_holds",
    P56: usw.uri.CRM.NS + "P56_bears_feature",
    P56i: usw.uri.CRM.NS + "P56i_is_found_on",
    P57: usw.uri.CRM.NS + "P57_has_number_of_parts",
    P58: usw.uri.CRM.NS + "P58_has_section_definition",
    P58i: usw.uri.CRM.NS + "P58i_defines_section",
    P59: usw.uri.CRM.NS + "P59_has_section",
    P59i: usw.uri.CRM.NS + "P59i_is_located_on_or_within",
    P62: usw.uri.CRM.NS + "P62_depicts",
    P62i: usw.uri.CRM.NS + "P62i_is_depicted_by",
    P65: usw.uri.CRM.NS + "P65_shows_visual_item",
    P65i: usw.uri.CRM.NS + "P65i_is_shown_by",
    P67: usw.uri.CRM.NS + "P67_refers_to",
    P67i: usw.uri.CRM.NS + "P67i_is_referred_to_by",
    P68: usw.uri.CRM.NS + "P68_foresees_use_of",
    P68i: usw.uri.CRM.NS + "P68i_use_foreseen_by",
    P69: usw.uri.CRM.NS + "P69_is_associated_with",
    P70: usw.uri.CRM.NS + "P70_documents",
    P70i: usw.uri.CRM.NS + "P70i_is_documented_in",
    P71: usw.uri.CRM.NS + "P71_lists",
    P71i: usw.uri.CRM.NS + "P71i_is_listed_in",
    P72: usw.uri.CRM.NS + "P72_has_language",
    P72i: usw.uri.CRM.NS + "P72i_is_language_of",
    P73: usw.uri.CRM.NS + "P73_has_translation",
    P73i: usw.uri.CRM.NS + "P73i_is_translation_of",
    P74: usw.uri.CRM.NS + "P74_has_current_or_former_residence",
    P74i: usw.uri.CRM.NS + "P74i_is_current_or_former_residence_of",
    P75: usw.uri.CRM.NS + "P75_possesses",
    P75i: usw.uri.CRM.NS + "P75i_is_possessed_by",
    P76: usw.uri.CRM.NS + "P76_has_contact_point",
    P76i: usw.uri.CRM.NS + "P76i_provides_access_to",
    P78: usw.uri.CRM.NS + "P78_is_identified_by",
    P78i: usw.uri.CRM.NS + "P78i_identifies",
    P79: usw.uri.CRM.NS + "P79_beginning_is_qualified_by",
    P80: usw.uri.CRM.NS + "P80_end_is_qualified_by",
    P81: usw.uri.CRM.NS + "P81_ongoing_throughout",
    P82: usw.uri.CRM.NS + "P82_at_some_time_within",
    P83: usw.uri.CRM.NS + "P83_had_at_least_duration",
    P83i: usw.uri.CRM.NS + "P83i_was_minimum_duration_of",
    P84: usw.uri.CRM.NS + "P84_had_at_most_duration",
    P84i: usw.uri.CRM.NS + "P84i_was_maximum_duration_of",
    P86: usw.uri.CRM.NS + "P86_falls_within",
    P86i: usw.uri.CRM.NS + "P86i_contains",
    P87: usw.uri.CRM.NS + "P87_is_identified_by",
    P87i: usw.uri.CRM.NS + "P87i_identifies",
    P88: usw.uri.CRM.NS + "P88_consists_of",
    P88i: usw.uri.CRM.NS + "P88i_forms_part_of",
    P89: usw.uri.CRM.NS + "P89_falls_within",
    P89i: usw.uri.CRM.NS + "P89i_contains",
    P90: usw.uri.CRM.NS + "P90_has_value",
    P91: usw.uri.CRM.NS + "P91_has_unit",
    P91i: usw.uri.CRM.NS + "P91i_is_unit_of",
    P92: usw.uri.CRM.NS + "P92_brought_into_existence",
    P92i: usw.uri.CRM.NS + "P92i_was_brought_into_existence_by",
    P93: usw.uri.CRM.NS + "P93_took_out_of_existence",
    P93i: usw.uri.CRM.NS + "P93i_was_taken_out_of_existence_by",
    P94: usw.uri.CRM.NS + "P94_has_created",
    P94i: usw.uri.CRM.NS + "P94i_was_created_by",
    P95: usw.uri.CRM.NS + "P95_has_formed",
    P95i: usw.uri.CRM.NS + "P95i_was_formed_by",
    P96: usw.uri.CRM.NS + "P96_by_mother",
    P96i: usw.uri.CRM.NS + "P96i_gave_birth",
    P97: usw.uri.CRM.NS + "P97_from_father",
    P97i: usw.uri.CRM.NS + "P97i_was_father_for",
    P98: usw.uri.CRM.NS + "P98_brought_into_life",
    P98i: usw.uri.CRM.NS + "P98i_was_born",
    P99: usw.uri.CRM.NS + "P99_dissolved",
    P99i: usw.uri.CRM.NS + "P99i_was_dissolved_by",
    P100: usw.uri.CRM.NS + "P100_was_death_of",
    P100i: usw.uri.CRM.NS + "P100i_died_in",
    P101: usw.uri.CRM.NS + "P101_had_as_general_use",
    P101i: usw.uri.CRM.NS + "P101i_was_use_of",
    P102: usw.uri.CRM.NS + "P102_has_title",
    P102i: usw.uri.CRM.NS + "P102i_is_title_of",
    P103: usw.uri.CRM.NS + "P103_was_intended_for",
    P103i: usw.uri.CRM.NS + "P103i_was_intention_of",
    P104: usw.uri.CRM.NS + "P104_is_subject_to",
    P104i: usw.uri.CRM.NS + "P104i_applies_to",
    P105: usw.uri.CRM.NS + "P105_right_held_by",
    P105i: usw.uri.CRM.NS + "P105i_has_right_on",
    P106: usw.uri.CRM.NS + "P106_is_composed_of",
    P106i: usw.uri.CRM.NS + "P106i_forms_part_of",
    P107: usw.uri.CRM.NS + "P107_has_current_or_former_member",
    P107i: usw.uri.CRM.NS + "P107i_is_current_or_former_member_of",
    P108: usw.uri.CRM.NS + "P108_has_produced",
    P108i: usw.uri.CRM.NS + "P108i_was_produced_by",
    P109: usw.uri.CRM.NS + "P109_has_current_or_former_curator",
    P109i: usw.uri.CRM.NS + "P109i_is_current_or_former_curator_of",
    P110: usw.uri.CRM.NS + "P110_augmented",
    P110i: usw.uri.CRM.NS + "P110i_was_augmented_by",
    P111: usw.uri.CRM.NS + "P111_added",
    P111i: usw.uri.CRM.NS + "P111i_was_added_by",
    P112: usw.uri.CRM.NS + "P112_diminished",
    P112i: usw.uri.CRM.NS + "P112i_was_diminished_by",
    P113: usw.uri.CRM.NS + "P113_removed",
    P113i: usw.uri.CRM.NS + "P113i_was_removed_by",
    P114: usw.uri.CRM.NS + "P114_is_equal_in_time_to",
    P115: usw.uri.CRM.NS + "P115_finishes",
    P115i: usw.uri.CRM.NS + "P115i_is_finished_by",
    P116: usw.uri.CRM.NS + "P116_starts",
    P116i: usw.uri.CRM.NS + "P116i_is_started_by",
    P117: usw.uri.CRM.NS + "P117_occurs_during",
    P117i: usw.uri.CRM.NS + "P117i_includes",
    P118: usw.uri.CRM.NS + "P118_overlaps_in_time_with",
    P118i: usw.uri.CRM.NS + "P118i_is_overlapped_in_time_by",
    P119: usw.uri.CRM.NS + "P119_meets_in_time_with",
    P119i: usw.uri.CRM.NS + "P119i_is_met_in_time_by",
    P120: usw.uri.CRM.NS + "P120_occurs_before",
    P120i: usw.uri.CRM.NS + "P120i_occurs_after",
    P121: usw.uri.CRM.NS + "P121_overlaps_with",
    P122: usw.uri.CRM.NS + "P122_borders_with",
    P123: usw.uri.CRM.NS + "P123_resulted_in",
    P123i: usw.uri.CRM.NS + "P123i_resulted_from",
    P124: usw.uri.CRM.NS + "P124_transformed",
    P124i: usw.uri.CRM.NS + "P124i_was_transformed_by",
    P125: usw.uri.CRM.NS + "P125_used_object_of_type",
    P125i: usw.uri.CRM.NS + "P125i_was_type_of_object_used_in",
    P126: usw.uri.CRM.NS + "P126_employed",
    P126i: usw.uri.CRM.NS + "P126i_was_employed_in",
    P127: usw.uri.CRM.NS + "P127_has_broader_term",
    P127i: usw.uri.CRM.NS + "P127i_has_narrower_term",
    P128: usw.uri.CRM.NS + "P128_carries",
    P128i: usw.uri.CRM.NS + "P128i_is_carried_by",
    P129: usw.uri.CRM.NS + "P129_is_about",
    P129i: usw.uri.CRM.NS + "P129i_is_subject_of",
    P130: usw.uri.CRM.NS + "P130_shows_features_of",
    P130i: usw.uri.CRM.NS + "P130i_features_are_also_found_on",
    P131: usw.uri.CRM.NS + "P131_is_identified_by",
    P131i: usw.uri.CRM.NS + "P131i_identifies",
    P132: usw.uri.CRM.NS + "P132_overlaps_with",
    P133: usw.uri.CRM.NS + "P133_is_separated_from",
    P134: usw.uri.CRM.NS + "P134_continued",
    P134i: usw.uri.CRM.NS + "P134i_was_continued_by",
    P135: usw.uri.CRM.NS + "P135_created_type",
    P135i: usw.uri.CRM.NS + "P135i_was_created_by",
    P136: usw.uri.CRM.NS + "P136_was_based_on",
    P136i: usw.uri.CRM.NS + "P136i_supported_type_creation",
    P137: usw.uri.CRM.NS + "P137_exemplifies",
    P137i: usw.uri.CRM.NS + "P137i_is_exemplified_by",
    P138: usw.uri.CRM.NS + "P138_represents",
    P138i: usw.uri.CRM.NS + "P138i_has_representation",
    P139: usw.uri.CRM.NS + "P139_has_alternative_form",
    P140: usw.uri.CRM.NS + "P140_assigned_attribute_to",
    P140i: usw.uri.CRM.NS + "P140i_was_attributed_by",
    P141: usw.uri.CRM.NS + "P141_assigned",
    P141i: usw.uri.CRM.NS + "P141i_was_assigned_by",
    P142: usw.uri.CRM.NS + "P142_used_constituent",
    P142i: usw.uri.CRM.NS + "P142i_was_used_in",
    P143: usw.uri.CRM.NS + "P143_joined",
    P143i: usw.uri.CRM.NS + "P143i_was_joined_by",
    P144: usw.uri.CRM.NS + "P144_joined_with",
    P144i: usw.uri.CRM.NS + "P144i_gained_member_by",
    P145: usw.uri.CRM.NS + "P145_separated",
    P145i: usw.uri.CRM.NS + "P145i_left_by",
    P146: usw.uri.CRM.NS + "P146_separated_from",
    P146i: usw.uri.CRM.NS + "P146i_lost_member_by",
    P147: usw.uri.CRM.NS + "P147_curated",
    P147i: usw.uri.CRM.NS + "P147i_was_curated_by",
    P148: usw.uri.CRM.NS + "P148_has_component",
    P148i: usw.uri.CRM.NS + "P148i_is_component_of",
    P149: usw.uri.CRM.NS + "P149_is_identified_by",
    P149i: usw.uri.CRM.NS + "P149i_identifies"
};
/*
===============================================================================
Creator	: Ceri Binding, University of South	Wales
Project	: ANY
Classes	: usw.util
Summary	: General static utility functions
Example	: var degrees =	usw.util.radians2degrees(3);
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History	:
15/01/2014	CFB	Adapted from usw.seneschal.uti.js
===============================================================================
*/

// set up base namespace
var usw	= this.usw || {};

(function () {	// start of	main javascript	closure
	"use strict"; // strict	mode pragma

	// general static utility functions
	usw.util = {

		// Convert radians into	degrees.
		// Usage: degrees =	usw.seneschal.util.radians2degrees(3);
		radians2degrees: function (radians)	{
			return (parseFloat(radians || 0) * (180	/ Math.PI));
		},	// end function 'radianstodegrees'

		// Convert degrees into	radians.
		// Usage: radians =	usw.seneschal.degrees2radians(33);
		degrees2radians: function (degrees)	{
			return (parseFloat(degrees || 0) * (Math.PI	/ 180));
		},	// end function 'degreestoradians'

		// Confine value to	within a specified range (like 'clamp')
		// Usage: val =	usw.seneschal.confine(val, 1, 100);
		confine: function (val,	min, max) {
			if (val	< min) { return	min; }
			if (val	> max) { return	max; }
			return val;
		},	// end function 'confine'

		// from	"Javascript: The Good Parts" (Douglas Crockford)
		// allows functions to handle single values OR arrays of values
		isarray: function(value) {
			return value &&
				typeof value === 'object' &&
				typeof value.length	===	'number' &&
				typeof value.splice	===	'function' &&
				!(value.propertyIsEnumerable('length'));
		},	// end function 'isarray'

		// include css or js into web page.	Function obtained from web, origin uncertain
		// Ensure prerequisites will be present. Usage: usw.util.include(myscript.js);
		include: function (url) {
			var element, head;

			switch(url.split(".").pop()) {
				case "css":
					element = document.createElement("link");
					element.setAttribute("rel", "stylesheet");
					element.setAttribute("type", "text/css");
					element.setAttribute("href", url);
					break;
				case "js":
					element = document.createElement("script");
					element.setAttribute("language", "javascript");
					element.setAttribute("src", url);
					break;
				default:
					if (window.console) {
						window.console.error("could not identify", url, "skip include");
					}
					return;
			}
			head = document.querySelector("head");
			if (head.innerHTML.indexOf(element.outerHTML )!== -1) {
				if (window.console) {
					 window.console.warn("Duplicate include, skipping: ", url);
				}
			}
			else {
				head.appendChild(element);
			}
		},	// end function 'include'

		// Generate	positive random	integer	up to specified	range
		// Usage: var x = usw.seneschal.util.random(50);
		random:	function (range) {
			return Math.floor(Math.random()	* parseInt(range, 10));
		},	// end function 'random'

		// Create log element and append text for display
		// Usage: usw.seneschal.util.log("hello	world");
		log: function (txt)	{
			var element = document.getElementById('usw-util-log'),
				msg	= document.createElement('div');

			if(!element) {
				// create div#usw-seneschal-util-log if it didn't already exist
				element	= document.createElement('div');
				element.setAttribute('id', 'usw-util-log');
				element.style.border='thin solid gray';
				element.style.margin='3px';
				element.style.height='200px';
				element.style.background='lightyellow';
				element.style.overflow='scroll';
				element.appendChild(document.createTextNode('Log'));
				document.body.appendChild(element);
			}
			// append new timestamped message to div#usw-seneschal-util-log
			msg.style.borderTop='thin solid lightgray';
			msg.appendChild(document.createTextNode(new	Date().toLocaleString()	+ '	' +	txt));
			element.appendChild(msg);
		},	// end function 'log'

		// http://stackoverflow.com/questions/5396560/how-do-i-convert-special-utf-8-chars-to-their-iso-8859-1-equivalent-using-javasc
		// convert ISO8859-1 to UTF-8 string (but works other way round??)
		iso2utf: function(iso) {
			var utf=iso;
			try{
				utf=decodeURIComponent(escape(iso));
			} catch(e){ }

			return utf;
		},

		// convert UTF-8 to ISO-8859-1 string
		utf2iso: function(utf) {
			var iso=utf;
			try{
				iso = unescape(encodeURIComponent(utf));
			} catch(e){ }

			return iso;
		},

	    // convert a javascript date to an xsd:dateTime value
        // deprecated - use instead: new Date().toISOString()
		xsdDateTime: function(date)
        {
            function pad(n) {
                var s = n.toString();
                return s.length < 2 ? '0'+s : s;
            };

            var yyyy = date.getFullYear();
            var mm1  = pad(date.getMonth()+1);
            var dd   = pad(date.getDate());
            var hh   = pad(date.getHours());
            var mm2  = pad(date.getMinutes());
            var ss   = pad(date.getSeconds());

            return yyyy +'-' +mm1 +'-' +dd +'T' +hh +':' +mm2 +':' +ss;
        },

		// strings from json may contain characters that can corrupt html display
		// so ensure escaping of any problem characters before attempting display
		// usage: s = usw.util.htmlEscape(s);
		htmlEscape: function(str) {
			return String(str)
					.replace(/&/g, '&amp;')
					.replace(/\"/g, '&quot;')
					.replace(/\'/g, '&#39;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
		}

	}; // end usw.seneschal.util

	// add trim, ltrim and rtrim functionality to String class
	// (but if using JQuery could just use $.trim(s) instead)
	String.prototype.trim = function ()	{
		return (this.replace(/^\s+|\s+$/g, ""));
	};
	String.prototype.ltrim = function () {
		return (this.replace(/^\s+/, ""));
	};
	String.prototype.rtrim = function () {
		return (this.replace(/\s+$/, ""));
	};

	// Add max and min functionality to	Array class
	// get the maximum value from an array
	Array.prototype.max	= function () {
		return Math.max.apply(Math,	this);
	};
	// get the minimum value from an array
	Array.prototype.min	= function () {
		return Math.min.apply(Math,	this);
	};

}()); // end of	main javascript	closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatlist
Version	: 20150205
Summary	: List of AAT concepts - base widget for many others...
Require	: jquery, jquery-ui
Example	: <div class="usw-aatlist"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.aatlist", {	// start of widget code 
		
	    // default options
	    options: {
	        endpointURI: "http://vocab.getty.edu/sparql",   //sparql endpoint URI
            useCache: true, // cache responses to prevent repeated requests (not working...)
	        language: "en", // values: "en" (default), "es", "de", "nl" etc.
	        fallback: "en", // fallback language if chosen language label is not present
	        limit: 100, // for restricting number of results (0 = no limit)
	        offset: 0 // for implementation of paging (0 = no offset)	 
	    },

	    // initialization code (runs once only)
	    _create: function (options) {
	        var self = this;
	        self.options = $.extend({}, self.options, options);

	        self.element.addClass("usw-aatlist");
	        
	        //create the list element to hold the results
	        $("<ul/>").appendTo(self.element);               

	        // fire	an event when any results link is clicked
	        $(self.element).on("click", "a", function (e) {	            
	            var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
	            $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
	            e.preventDefault();  // don't follow links
	        });
	        
	        self._refresh();
	    },		

	    // put this.element	back to	how	it was
	    destroy: function () {
	        self.element.removeClass("usw-aatlist");
	        //$.Widget.prototype.destroy.call(this);
	    },

	    // set an option after control has loaded
	    _setOption:	function(key, value) {
	        var	self = this;

	        // clean up input
	        key	= $.trim(key ||	'');
	        value =	$.trim(value ||	'');

	        // do nothing if same value	is passed for key
	        if (value === self.options[key]) {
	            return;
	        }

	        // change the option value 
	        self.options[key] = value;
	        self._refresh();
	    },

	    // expecting sparql query to get: uri, label
	    _getData: function(sparql) {
	        var	self = this;    	   

	        // make the call
	        $.support.cors = true;
	        $.ajax({
	            method: "GET",
	            crossDomain: true,
	            url: self.options.endpointURI,
	            data: { format: "json", query: sparql },
	            context: self,
	            cache: self.options.useCache,             
	            success: self.ajaxSuccess, 
	            error: self.ajaxError, 
	            complete: self.ajaxComplete,
	        }); // end ajax call		    
	    },       

		// override _refresh() in widgets 
	    _refresh: function () { },

	    // default, may be overriden in inherited widgets
	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.conceptURI + "@" + self.options.language; //default
	        return key;
	    },

        // expecting data to contain uri, label, language
		ajaxSuccess: function (data, textStatus, jqXHR) {
		    var self = this;
		    
		    // cache the retrieved data for next time...
		    var key = self.options.conceptURI + "@" + self.options.language;
		    $.data(self.element, key, data);

		    // items may already be sorted, but ensure (case insensitive) sorting prior to display
		    data.results.bindings.sort(function (a, b) {
		        return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
		    });

            // get reference to the results list and clear it
		    var list = $("ul:first", self.element).html("");

		    // add each item to the list as a listitem
		    $(data.results.bindings).each(function (index, item) {		         
		        // GVP server returns iso-8859-1 strings even if we ask for utf-8: so converting here to utf-8
		        var value = usw.util.iso2utf(item.label.value);
		        // if uri is blank it's a literal value, otherwise create a link
		        if (item.uri.value === "") {
		            $("<li xml:lang='" + item.label["xml:lang"] + "'>" + usw.util.htmlEscape(value) + "</li>")
                        .appendTo(list); //.css({ "display": "inline", "margin": "0px 3px" });
		        }
		        else {
		            $("<li><a href='" + item.uri.value + "' xml:lang='" + item.label["xml:lang"] + "'>" + usw.util.htmlEscape(value) + "</a></li>")
		                .appendTo(list);
                        /*.css({
                            "display": "inline",
                            "margin": "0px 3px",
                            "background": "whitesmoke"
                        });*/
		        }
		    });
		} ,     

		ajaxError: function (jqXHR, textStatus, errorThrown) {
		    var self = this;
		    //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
            //log errorThrown?
		},

		ajaxComplete: function (jqXHR, textStatus) {
	        var	self = this;
	        //$(self.element).waitable({ "waiting": false });
	        //$(self.element).unblock();
	    }

	});	// end of widget code

	// any elements of class usw-aatlist automatically become one...
	$(window).load(function () {
	    $(".usw-aatlist").aatlist(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatnarrower
Version	: 20150205
Summary	: List of narrower concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatnarrower"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatnarrower", $.usw.aatlist, {	// start of widget code 
		
		// default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015" // for example	         
		},			

	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;
	        
	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)	       
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	       var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri gvp:broaderPreferred <" + self.options.conceptURI + "> ."
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?preferredLanguageLabel]"
                + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
                + " }"
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?fallbackLanguageLabel]"
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
                + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	       self._getData(sparql);
	    }

	});	// end of widget code

	// elements of class usw-aatnarrower become a widget
	$(window).load(function () {
	    $(".usw-aatnarrower").aatnarrower(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatbroader
Version	: 20150205
Summary	: List of broader concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatbroader"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatbroader", $.usw.aatlist, {	// start of widget code 
		
		// default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015" // for example	        
	    },	    

	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }	        

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

            var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " <" + self.options.conceptURI + ">  gvp:broaderPreferred ?uri ."
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?preferredLanguageLabel]"
                + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
                + " }"
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?fallbackLanguageLabel]"
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
                + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

                self._getData(sparql);	        
	    }

	});	// end of widget code

	// elements of class usw-aatbroader become a widget
	$(window).load(function () {
	    $(".usw-aatbroader").aatbroader(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatrelated
Version	: 20150205
Summary	: List of related concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatrelated"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatrelated", $.usw.aatlist, {	// start of widget code 
		
		// default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015" // for example	         
		},			

	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); 
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " <" + self.options.conceptURI + ">  skos:related ?uri ."
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?preferredLanguageLabel]"
                + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
                + " }"
                + " OPTIONAL {"
                + " ?uri skosxl:prefLabel [skosxl:literalForm ?fallbackLanguageLabel]"
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
                + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }   
			
	});	// end of widget code

	// elements of class usw-aatrelated become a widget
	$(window).load(function () {
	    $(".usw-aatrelated").aatrelated(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatpreflabels
Version	: 20150223
Summary	: Preferred labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatpreflabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History

13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatpreflabels", $.usw.aatlist, {	// start of widget code 
		
		// default options
        options: {
            conceptURI: "http://vocab.getty.edu/aat/300193015", // for example
        },

        // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;
	        
	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }        

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);
	        
	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
             + " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
             + " OPTIONAL {"
             + " <" + self.options.conceptURI + "> skos:prefLabel ?preferredLanguageLabel ."
             + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
             + " }"
             + " OPTIONAL {"
             + " <" + self.options.conceptURI + "> skos:prefLabel ?fallbackLanguageLabel ."
             + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
             + " }"
             + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
	         //+ " BIND('" + self.options.conceptURI + "' AS ?uri)"
             + " }";
	         + " ORDER BY ASC(str(?label))"
	         + (offset > 0 ? " OFFSET " + offset : "")
             + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    },        

	});	// end of widget code

	// elements of class usw-aatpreflabels become widgets
	$(window).load(function () {
	    $(".usw-aatpreflabels").aatpreflabels(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aataltlabels
Version	: 20150223
Summary	: Alternate labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aataltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aataltlabels", $.usw.aatlist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015", // for example
	    },

	    // default, may be overriden in inherited widgets
	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.conceptURI + "@" + self.options.language; //default
	        return key;
	    },

	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
			+ " SELECT DISTINCT (\"\" AS ?uri) ?label WHERE {"
			 + " OPTIONAL {"
			+ " <" + self.options.conceptURI + "> skos:altLabel ?preferredLanguageLabel ."
			+ " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
            + " }"
		    + " OPTIONAL {"
            + " <" + self.options.conceptURI + "> skos:altLabel ?fallbackLanguageLabel ."
            + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
            + " }"
            + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
            + " }";
	        + " ORDER BY ASC(str(?label))"
	        + (offset > 0 ? " OFFSET " + offset : "")
            + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    },

	});	// end of widget code

	// elements of class usw-aataltlabelss become a widget
	$(window).load(function () {
	    $(".usw-aataltlabels").aataltlabels(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatscopenotes
Version	: 20150205
Summary	: Scope notes for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatscopenotes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	$.support.cors = true;

	$.widget("usw.aatscopenotes", $.usw.aatlist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://vocab.getty.edu/aat/300193015", // for example
	    },
        	  
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;
	        
	        // if we have cached data use that instead; don't do the ajax call 
	        // (the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
	            + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT (\"\" AS ?uri) ?label WHERE {" // record with blank uri can be handled as a literal value
                + " OPTIONAL {"
                + " <" + self.options.conceptURI + "> skos:scopeNote [rdf:value ?preferredLanguageLabel] ."
	            + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
	            + " }"
                + " OPTIONAL {"
                + " <" + self.options.conceptURI + "> skos:scopeNote [rdf:value ?fallbackLanguageLabel] ."
                + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
	            + " }"
                + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
                + " }"
	            + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    },

	});	// end of widget code

	// elements of class usw-aatscopenotes become a widget
	$(window).load(function () {
	    $(".usw-aatscopenotes").aatscopenotes(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatconceptdetails
Version	: 20150223
Summary	: display details of a single concept based	on conceptURI
Require	: jquery, jquery-ui
Example	: <div class='usw-aatconceptdetails'/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History
23/02/2015	CFB Script adapted from usw.seneschal.conceptdetails.js
===============================================================================
*/
(function ($) {	// start of	main jQuery	closure
	"use strict"; // strict	mode pragma
	$.support.cors = true;

	$.widget('usw.aatconceptdetails', {

		//Default options
		options: {
		    //conceptURI: "http://vocab.getty.edu/aat/300193015", //example	
		    conceptURI: "",
            language: "en"
		},

		// Called on initialization
		_create: function (options)	{
		    var self = this;
		    
			// override	default	options	with any passed	in
			self.options = $.extend(self.options, options);

            // style the widget
			$(self.element).css({
			    border: "1px solid gray",
			    "overflow-y": "scroll",
			    "padding": "3px",
                "height": "150px"
			});

            // build the composite control
			$("<span class='usw-aatbroader'/>").appendTo(self.element);
			$("<span class='fa fa-arrow-right'/>").appendTo(self.element).css({ "margin": "0px 3px" });                
		    $("<span class='usw-aatpreflabels'/>").appendTo(self.element).css({ "font-weight": "bold" });
		    $("<span class='usw-aataltlabels'/>").appendTo(self.element).css({ "font-style": "italic", "margin": "0px 3px" });
		    $("<div	class='usw-aatscopenotes'/>").appendTo(self.element).css({ "margin": "3px 0px" });
		    $("<span class='usw-aatnarrower'/>").appendTo(self.element);
			$("<span class='usw-aatrelated'/>").appendTo(self.element);

            // set up the individual controls
			$(".usw-aatpreflabels:first", self.element).aatpreflabels(self.options);
			$(".usw-aataltlabels:first", self.element).aataltlabels(self.options);
			$(".usw-aatscopenotes:first", self.element).aatscopenotes(self.options);
			$(".usw-aatbroader:first", self.element).aatbroader(self.options);
			$(".usw-aatnarrower:first", self.element).aatnarrower(self.options);
			$(".usw-aatrelated:first", self.element).aatrelated(self.options);

			// refresh controls if a concept is selected
			$(".usw-aatbroader, .usw-aatnarrower, .usw-aatrelated").on("click", "a", function (e) {
			    var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
			    self._setOption("conceptURI", uri);

			    // don't follow links
			    e.preventDefault();
			    return false;
			});           
		},

	    // set an option after control has loaded
		_setOption: function (key, value) {
		    var self = this;

		    // clean up input
		    key = $.trim(key || '');
		    value = $.trim(value || '');

		    if (value === self.options[key]) {
		        // do nothing if same value	is passed for key
		        return;
		    }
		    else {
		        // change the option value 
		        self.options[key] = value;
		        self._refresh();
		    }
		},

	    // redraw the control
		_refresh: function() {
		    var self = this;

		    if (self.options.conceptURI.trim() == "")
		        return;

		    $(".usw-aatpreflabels:first", self.element).aatpreflabels(self.options);
		    $(".usw-aataltlabels:first", self.element).aataltlabels(self.options);
		    $(".usw-aatscopenotes:first", self.element).aatscopenotes(self.options);
		    $(".usw-aatbroader:first", self.element).aatbroader(self.options);
		    $(".usw-aatnarrower:first", self.element).aatnarrower(self.options);
		    $(".usw-aatrelated:first", self.element).aatrelated(self.options);
		},
		
	});	//end of usw.aatconceptdetails

	// any elements with class usw-aatconceptdetails automatically become one
	$(window).load(function(){
		$(".usw-aatconceptdetails").aatconceptdetails();
	});

}(jQuery));	//end of main jQuery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.aatsearch
Version	: 20150205
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-aatsearch"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma
    
	$.widget("usw.aatsearch", $.usw.aatlist, {	// start of widget code 
		
		// default options
	    options: {
	        searchfor: ""           
	    },	    

	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);

	        $(self.element).css({
	            "overflow-y": "scroll",
	            "padding": "3px",
	            "height": "150px"
	        });
	       
	        // build the search	form and results box
	        $("<form><input type='search' placeholder='Search...' autocomplete='on' /></form>").appendTo(self.element).css({margin: "0px"});

            // style the search box
	        $("input[type='search']:first", self.element)
				.css({
				    padding: "2px",
				    width: "99%",
				    border: "1px solid lightgray"
				});
	       
	        // what	to do when form	is submitted
	        $("form:first", self.element).submit(function (e) {
	            e.preventDefault(); // don't redirect on form submission
	            var searchText = $("input[type='search']:first", self.element).val().trim();
	            if (searchText !== self.options.placeholder && searchText !== "") {
	                self._setOption("searchfor", searchText);	                
	                self._refresh();	                
	            }
	            return false;
	        });
	       
            // resize internal controls when window resizes
	        $(window).resize(function () {
	            $("form:first", self.element).css({ "width": "99%" });	            
	        });

	        // overridden base "create" function, so call that now
	        this._super(options);
	    },	   

		// redraw the control
		_refresh: function() {
		    var self = this;

            // if nothing to search for, don't proceed
		    if (self.options.searchfor.trim() == "")
		        return;

		    // if we have cached data use that; don't do the ajax call 
		    // (as the browser cache doesn't seem to work with AAT SPARQL calls)
		    if ($.data(self.element, self.options.searchfor)) {
		        self.ajaxSuccess($.data(self.element, self.options.searchfor), "from cache", {});
		        return;
		    }

		    //	build a sparql query to get the data, filtering by language,
		    // supplying a fallback if required language label is not present
		    var limit = parseInt(self.options.limit, 10);
		    var offset = parseInt(self.options.offset, 10);

		    /*var sparql = "PREFIX aat: <http://vocab.getty.edu/aat/>"
		        + " PREFIX luc: <http://www.ontotext.com/owlim/lucene#>"
                + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:inScheme aat: ; luc:term '" + self.options.searchfor + "'; skosxl:prefLabel [skosxl:literalForm ?label]"
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");*/

		    var sparql = "PREFIX aat: <http://vocab.getty.edu/aat/>"
               + " PREFIX luc: <http://www.ontotext.com/owlim/lucene#>"
               + " PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
               + " PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>"
               + " SELECT DISTINCT ?uri ?label WHERE {"
               + " ?uri skos:inScheme aat: ; luc:term '" + self.options.searchfor + "' ."
               + " OPTIONAL {"
               + " ?uri skosxl:prefLabel [skosxl:literalForm ?preferredLanguageLabel]"
               + " FILTER(langMatches(lang(?preferredLanguageLabel),'" + self.options.language + "'))"
               + " }"
		       + " OPTIONAL {"
               + " ?uri skosxl:prefLabel [skosxl:literalForm ?fallbackLanguageLabel]"
               + " FILTER(langMatches(lang(?fallbackLanguageLabel),'" + self.options.fallback + "'))"
               + " }"
               + " BIND(COALESCE(?preferredLanguageLabel, ?fallbackLanguageLabel, '') AS ?label)"
               + " }"
               + " ORDER BY ASC(str(?label))"
               + (offset > 0 ? " OFFSET " + offset : "")
               + (limit > 0 ? " LIMIT " + limit : "");
		    self._getData(sparql);
		}	// end _refresh		

	});	// end of widget code

	// any elements of class usw-aatsearch automatically become one...
	$(window).load(function () {
	    $(".usw-aatsearch").aatsearch(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skoslist
Version	: 20150205
Summary	: Base list widget - used by many others...
Require	: jquery, jquery-ui
Example	: <div class="usw-skoslist"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skoslist", {	// start of widget code 
		
	    // default options
	    options: {
	        endpointURI: "http://heritagedata.org/live/sparql",
	        useCache: true, // cache responses to prevent repeated requests (not working...)	        
	        language: "en", // values: "en" (default), "es", "de", "nl" etc.
	        fallback: "en", // fallback language if chosen language label is not present
	        limit: 100, // for restricting number of results (0 = no limit)
	        offset: 0, // for implementation of paging (0 = no offset)	            
	    },

	    // initialization code (runs once only)
	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);

	        self.element.addClass("usw-skoslist");

	        //create the list element to hold the results
	        $("<ul/>").appendTo(self.element);

	        // fire	an event when any results link is clicked
	        $(self.element).on("click", "a", function (e) {
	            var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
	            $(self.element).trigger("selected", { "uri": uri, "label": label, "language": language });
	            e.preventDefault();  // don't follow links
	            return false;
	        });

	        self._refresh();
	    },

	    // put this.element	back to	how	it was
	    destroy: function () {
	        self.element.removeClass("usw-aatlist");
	        //$.Widget.prototype.destroy.call(this);
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

	    // override _refresh() in widgets 
	    _refresh: function () { },
	        
	    // expecting sparql query to get: uri, label
	    _getData: function(sparql) {
	        var self = this;
	        
	        // make the call
	        $.support.cors = true;
	        $.ajax({
	            method: "GET",	            
	            url: self.options.endpointURI,
	            crossDomain: true,
                dataType: "jsonp",
	            data: { output: "json", query: sparql },
	            context: self,
	            cache: self.options.useCache,             
	            success: self.ajaxSuccess, 
	            error: self.ajaxError, 
	            complete: self.ajaxComplete,
	        }); // end ajax call		    
	    },

        // default, may be overriden in inherited widgets
	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.conceptURI + "@" + self.options.language; //default
	        return key;
	    },

	    // expecting data to contain uri, label, language
	    ajaxSuccess: function (data, textStatus, jqXHR) {
	        var self = this;
	
	        // cache the retrieved data for next time...
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        $.data(self.element, key, data);

	        // items may already be sorted, but ensure (case insensitive) sorting prior to display
	        data.results.bindings.sort(function (a, b) {
	            return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
	        });

	        var list = $("ul:first", self.element).html("");

	        // add each item to the list (as a listitem!)
	        $(data.results.bindings).each(function (index, item) {
	            var uri = item.uri ? item.uri.value : "";
	            var label = usw.util.htmlEscape(item.label.value);
	            var language = item.label["xml:lang"];

	            // if uri is blank it's a literal value, otherwise create a link
	            if (uri === "") {
	                $("<li xml:lang='" + language + "'>" + label + "</li>")
                        .appendTo(list); 
	            }
	            else {
	                $("<li><a href='" + uri + "' xml:lang='" + language + "'>" + label + "</a></li>")
		                .appendTo(list);	                
	            }
	        });
	    },     

	    ajaxError: function (jqXHR, textStatus, errorThrown) {
	        var self = this;
	        //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
	    },

	    ajaxComplete: function (jqXHR, textStatus) {
	        var	self = this;
	        //$(self.element).waitable({ "waiting": false });
	        //$(self.element).unblock();
	    }        

	});	// end of widget code

	// elements of class usw-skoslist become a widget
	$(window).load(function () {
	    $(".usw-skoslist").skoslist(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosconceptschemes
Version	: 20150205
Summary	: List of all concept schemes at the sparql endpoint in use
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosconceptschemes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosconceptschemes", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {},

	    getLocalStorageKey: function () {
	        var self = this;
	        var key = "schemes@" + self.options.language;
	        return key;
	    },
	      
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey();

	        //if ($.data(self.element, key)) {
	        if ($.data(document.body, key)) {
	            self.ajaxSuccess($.data(document.body, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " PREFIX dct: <http://purl.org/dc/terms/>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a skos:ConceptScheme; dct:title ?label . "
	            + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
	            + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosschemes become a widget
	$(window).load(function () {
	    $(".usw-skosconceptschemes").skosconceptschemes(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosnarrower
Version	: 20150205
Summary	: List of narrower concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosnarrower"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skosnarrower", $.usw.skosfile, {	
	$.widget("usw.skosnarrower", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;
	        
	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:broader <" + self.options.conceptURI + "> ; skos:prefLabel ?label . "
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosnarrower become a widget
	$(window).load(function () {
	    $(".usw-skosnarrower").skosnarrower(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosbroader
Version	: 20150205
Summary	: List of broader concepts
Require	: jquery, jquery-ui, usw.skoslist.js
Example	: <div class="usw-skosbroader"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosbroader", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:narrower <" + self.options.conceptURI + "> ; skos:prefLabel ?label . "
	            + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
	            + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosbroader become a widget
	$(window).load(function () {
	    $(".usw-skosbroader").skosbroader(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosrelated
Version	: 20150205
Summary	: List of related concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosrelated"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	$.widget("usw.skosrelated", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data, filtering by language,
	        // supplying a fallback if required language label is not present
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:related <" + self.options.conceptURI + "> ; skos:prefLabel ?label . "
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosrelated become a widget
	$(window).load(function () {
	    $(".usw-skosrelated").skosrelated(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skospreflabels
Version	: 20150205
Summary	: List of preferred labels
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skospreflabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skospreflabels", $.usw.skosfile, {	
	$.widget("usw.skospreflabels", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data
	       var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " SELECT DISTINCT ?label WHERE {"
                + " <" + self.options.conceptURI + "> skos:prefLabel ?label ."
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skospreflabels become a widget
	$(window).load(function () {
	    $(".usw-skospreflabels").skospreflabels(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosaltlabels
Version	: 20150205
Summary	: List of alternate labels
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosaltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skosaltlabels", $.usw.skosfile, {	
	$.widget("usw.skosaltlabels", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); // self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data
	       var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
               + " SELECT DISTINCT ?label WHERE {"
               + " <" + self.options.conceptURI + "> skos:altLabel ?label ."
	           + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
               + " }"
               + " ORDER BY ASC(str(?label))"
	           + (offset > 0 ? " OFFSET " + offset : "")
               + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosaltlabels become a widget
	$(window).load(function () {
	    $(".usw-skosaltlabels").skosaltlabels(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosscopenotes
Version	: 20150205
Summary	: List of scope notes
Require	: jquery, jquery-ui, usw.skoslist.js
Example	: <div class="usw-skosscopenotes"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skosscopenotes", $.usw.skosfile, {	
	$.widget("usw.skosscopenotes", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },	    
	   
	    // redraw the control
	    _refresh: function() {
	        var self = this;

	        if (self.options.conceptURI.trim() == "")
	            return;

	        // if we have cached data use that; don't do the ajax call 
	        // (as the browser cache doesn't seem to work with AAT SPARQL calls)
	        var key = self.getLocalStorageKey(); //var key = self.options.conceptURI + "@" + self.options.language;
	        if ($.data(self.element, key)) {
	            self.ajaxSuccess($.data(self.element, key), "from cache", {});
	            return;
	        }

	        //	build a sparql query to get the data
	       var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
               + " SELECT DISTINCT ?label WHERE {"
               + " <" + self.options.conceptURI + "> skos:scopeNote ?label ."
               + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
               + " }"
               + " ORDER BY ASC(str(?label))"
	           + (offset > 0 ? " OFFSET " + offset : "")
               + (limit > 0 ? " LIMIT " + limit : "");

	        self._getData(sparql);
	    }    

	});	// end of widget code

	// elements of class usw-skosscopenotes become a widget
	$(window).load(function () {
	    $(".usw-skosscopenotes").skosscopenotes(); 
	});

})(jQuery);	//end of main jquery closure
/*
===============================================================================
Creator	: Ceri Binding,	University of South	Wales
Project	: ARIADNE
Classes	: usw.skosconceptdetails
Version	: 20150223
Summary	: display details of a single concept based	on conceptURI
Require	: jquery, jquery-ui, usw.uri.js
Example	: <div class='usw-skosconceptdetails'></div>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
23/02/2015	CFB Script adapted from usw.seneschal.conceptdetails.js
===============================================================================
*/
(function ($) {	// start of	main jQuery	closure
	"use strict"; // strict	mode pragma
	$.support.cors = true;

	$.widget('usw.skosconceptdetails', {

		//Default options
		options: {
		    //conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131", //example
		    conceptURI: "", 
		},

		// Called on initialization
		_create: function (options)	{
		    var self = this;		    

			// override	default	options	with any passed	in
		    self.options = $.extend(self.options, options);		    

			$(self.element).css({
			    border: "1px solid gray",
			    "overflow-y": "scroll",
			    "padding": "3px",
                "height": "150px"
			});

            // build the composite control
			$("<span class='usw-skosbroader'/>").appendTo(self.element);
			$("<span class='fa fa-arrow-right'/>").appendTo(self.element).css({ "margin": "0px 3px" });                
		    $("<span class='usw-skospreflabels'/>").appendTo(self.element).css({ "font-weight": "bold" });
		    $("<span class='usw-skosaltlabels'/>").appendTo(self.element).css({ "font-style": "italic", "margin": "0px 3px" });
		    $("<div	class='usw-skosscopenotes'/>").appendTo(self.element).css({ "margin": "3px 0px" });
			$("<span class='usw-skosnarrower'/>").appendTo(self.element);
			$("<span class='usw-skosrelated'/>").appendTo(self.element);

            // set up the individual controls
			$(".usw-skospreflabels:first", self.element).skospreflabels(self.options);
			$(".usw-skosaltlabels:first", self.element).skosaltlabels(self.options);
			$(".usw-skosscopenotes:first", self.element).skosscopenotes(self.options);
			$(".usw-skosbroader:first", self.element).skosbroader(self.options);
			$(".usw-skosnarrower:first", self.element).skosnarrower(self.options);
			$(".usw-skosrelated:first", self.element).skosrelated(self.options);

			$(".usw-skosbroader, .usw-skosnarrower, .usw-skosrelated").on("click", "a", function (e) {
			    var uri = $(this).attr('href'), language = $(this).attr('xml:lang'), label = $(this).text();
			    self._setOption("conceptURI", uri);
			    // don't follow links
			    e.preventDefault();
			    return false;
			});            
		},

	    // set an option after control has loaded
		_setOption: function (key, value) {
		    var self = this;

		    // clean up input
		    key = $.trim(key || '');
		    value = $.trim(value || '');

		    if (value === self.options[key]) {
		        // do nothing if same value	is passed for key
		        return;
		    }
		    else {
		        // change the option value 
		        self.options[key] = value;
		        self._refresh();
		    }
		},

	    // redraw the control
		_refresh: function() {
		    var self = this;

		    if (self.options.conceptURI.trim() == "")
		        return;

		    $(".usw-skospreflabels:first", self.element).skospreflabels(self.options);
		    $(".usw-skosaltlabels:first", self.element).skosaltlabels(self.options);
		    $(".usw-skosscopenotes:first", self.element).skosscopenotes(self.options);
		    $(".usw-skosbroader:first", self.element).skosbroader(self.options);
		    $(".usw-skosnarrower:first", self.element).skosnarrower(self.options);
		    $(".usw-skosrelated:first", self.element).skosrelated(self.options);
		},
		
	});	//end of usw.skosconceptdetails

	// any elements with class usw-skosconceptdetails automatically become one
	$(window).load(function(){
		$(".usw-skosconceptdetails").skosconceptdetails();
	});

}(jQuery));	//end of main jQuery closure
/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skossearch
Version	: 20150205
Summary	: Search on AAT concepts
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skossearch"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/02/2015	CFB	created script
===============================================================================
*/
(function ($) { // start of main jquery closure
    "use strict"; // strict	mode pragma
    
	$.widget("usw.skossearch", $.usw.skoslist, {	// start of widget code 
		
		// default options
	    options: {
	        schemeURI: "", //example
	        searchfor: "", 
           
	    },	    

	    _create: function (options) {
	        var self = this;
	        self.options = $.extend(self.options, options);

	        $(self.element).css({
	            "overflow-y": "scroll",
	            "padding": "3px",
	            "height": "150px"
	        });
	       
	        // build and attach the search form
	        $("<form><input type='search' placeholder='Search...' autocomplete='on' /></form>")
                .css({ margin: "0px" })
                .appendTo(self.element); 
            
            // style the search box
	        $("input[type='search']:first", self.element)
				.css({
				    padding: "2px",
				    width: "99%",
				    border: "1px solid lightgray"
				});
	       
	        // what	to do when form	is submitted
	        $("form:first", self.element).submit(function (e) {
	            e.preventDefault(); // don't redirect on form submission
	            var searchText = $("input[type='search']:first", self.element).val().trim();
	            if (searchText !== self.options.placeholder && searchText !== "") {
	               
	                self._setOption("searchfor", searchText);	                
	                self._refresh();	                
	            }
	            return false;
	        });
	       
            // resize internal controls when window resizes
	        $(window).resize(function () {
	            $("form:first", self.element).css({ "width": "99%" });	            
	        });

	        // overridden base "create" function, so call that now
	        this._super(options);
	    },

	    getLocalStorageKey: function () {
	        var self = this;
	        var key = self.options.schemeURI + "@" + self.options.searchfor + "@" + self.options.language;
	        return key;
	    },
		// redraw the control
		_refresh: function() {
		    var	self = this;		   

		    $("ul:first", self.element).html(""); //clears any existing results

		    // if nothing to search for, don't proceed
		    if (self.options.searchfor.trim() == "")
		        return;

		    // if we have cached data use that; don't do the ajax call 
		    // (as the browser cache doesn't seem to work with AAT SPARQL calls)
		    var key = self.getLocalStorageKey(); 
		    if ($.data(self.element, key)) {
		        self.ajaxSuccess($.data(self.element, key), "from cache", {});
		        return;
		    }

		    //	build a sparql query to get the data, filtering by language,
		    // supplying a fallback if required language label is not present
		    var limit = parseInt(self.options.limit, 10);
		    var offset = parseInt(self.options.offset, 10);

		    var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
		        + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri skos:inScheme <" + self.options.schemeURI + ">"
                + " { ?uri skos:prefLabel ?label } UNION { ?uri skos:altLabel ?label }"					
				+ "	FILTER(REGEX(?label, '" + self.options.searchfor + "', 'i'))"
                + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
                + " }";	               
		        + " ORDER BY ASC(str(?label))"
                + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");
		    self._getData(sparql);
		}	// end _refresh		

	});	// end of widget code

	// any elements of class usw-skossearch automatically become one...
	$(window).load(function () {
	    $(".usw-skossearch").skossearch(); 
	});

})(jQuery);	//end of main jquery closure
﻿/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosmapping
Version	: 20150205
Summary	: Controls for submitting a mapping between 2 concepts
Require	: jquery, jquery-ui
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
﻿﻿/*
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
﻿/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.fileselect
Version	: 20150205
Summary	: <input type='file'> but styled as a button (hides the file path)
Require	: jquery, jquery-ui
Example	: <div class="usw-fileselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
05/03/2015	CFB	created script
===============================================================================
*/
(function ($) { //start of main jQuery closure
    "use strict"; // strict	mode pragma

    $.widget('usw.fileselect', {

        // stateful	defaults
        options: {},

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);

            var label = $(self.element).data("label") || "File";

            $(self.element).html("<label for='file-select' class='button button-primary'>" + label + "</label><input id='file-select' type='file'/>");
            // hide the file control and notify when a file is selected
            $("input[type='file']:first", self.element)
                .css({ "display": "none" })
                .bind('change', function () {
                    var fileName = "";
                    fileName = $(this).val();
                    $(self.element).trigger("selected", { "fileName": fileName });

                    //replace the input with a new clone to ensure the change event
                    // fires again if the same file is selected twice in succession
                    var control = $("input#file-select:first");
                    control.replaceWith(control = control.clone(true));                   
                });            
        },

    });	// end widget usw.fileselect

    // any elements of class usw-fileselect automatically become one...
    $(window).load(function () {
        $(".usw-fileselect").fileselect();
    });

}(jQuery));	//end of main jQuery closure
﻿/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.languageselect
Version	: 20150205
Summary	: List of languages
Require	: jquery, jquery-ui, fontawesome
Example	: <div class="usw-languageselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma	
	
    //$.widget("usw.skosaltlabels", $.usw.skosfile, {	
    $.widget("usw.languageselect", {	// start of widget code 
		
        // default options
        options: {
            language: "en"
        },

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);
	       
            var parent = self.element.parent();

            // buid and attach the language selector
            var cog = $("<div class='fa fa-cog' title='choose language'></div>")
                 .css({
                     position: "absolute",
                     left: parent.position().left + parent.width() - 14,
                     top: parent.position().top,
                     display: "inline",
                     width: "14px",
                     height: "14px",
                     margin: "0px",
                     padding: "0px",
                     border: "0px",
                     cursor: "pointer"
                 })
                .appendTo(self.element)
                .on("click", function () {
                    var element = $("select.language:first", self.element);
                    if (element.is(':hidden')) $(element).show(300);                   
                });

            $("<select class='language'>"
                + "<option value='de'>Deutch</option>"
                + "<option value='en' selected>English</option>"
                + "<option value='es'>Español</option>"
                + "<option value='fr'>Français</option>"
                + "<option value='nl'>Nederlands</option>"
                + "</select>").hide()
                .appendTo(cog)
                .change(function () {
                    self.options.language = $("option:selected", this).first().val();               
                    $(self.element).trigger("selected", { "language": self.options.language });
                    $.data(self.element, "language", self.options.language);
                    //alert(self.options.language);
                    //$("select.language:first", self.element).hide(300);
                    $(this).hide(300);
                });

            // resize/reposition things when window resizes
            $(window).resize(function () {
                $(cog).css({
                    left: parent.position().left + parent.width() - 14,
                    top: parent.position().top
                });
            });
        }       
    });	// end of widget code

    // any elements of class usw-languageselect automatically become one...
    $(window).load(function () {
        $(".usw-languageselect").languageselect();
    });

})(jQuery);	//end of main jquery closure
﻿/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.schemeselect
Version	: 20150205
Summary	: List of languages
Require	: jquery, jquery-ui, fontawesome
Example	: <div class="usw-schemeselect"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015	CFB	Initially created script
===============================================================================
*/
(function ($) { // start of main jquery closure    
    "use strict"; // strict	mode pragma	
	
    //$.widget("usw.skosaltlabels", $.usw.skosfile, {	
    $.widget("usw.schemeselect", {	// start of widget code 
		
    // default options
        options: {
            endpointURI: "http://heritagedata.org/live/sparql",
            schemeURI: "http://purl.org/heritagedata/schemes/mda_obj", // default; currently selected scheme
            useCache: true, // cache responses to prevent repeated requests (not working...)	        
            language: "en", // values: "en" (default), "es", "de", "nl" etc.
            fallback: "en", // fallback language if chosen language label is not present
            limit: 100, // for restricting number of results (0 = no limit)
            offset: 0, // for implementation of paging (0 = no offset)	            
        },            

        _create: function (options) {
            var self = this;
            self.options = $.extend(self.options, options);
	       
            var parent = self.element.parent();

            // buid and attach the language selector
            var cog = $("<div class='fa fa-cog' title='choose source vocabulary'></div>")
                 .css({
                     position: "absolute",
                     left: parent.position().left + parent.width() - 14,
                     top: parent.position().top,
                     display: "inline",
                     width: "14px",
                     height: "14px",
                     margin: "0px",
                     padding: "0px",
                     border: "0px",
                     cursor: "pointer"
                 })
                .appendTo(self.element)
                .on("click", function () {
                    var element = $("select:first", self.element);
                    if (element.is(':hidden')) $(element).show(300);                   
                });

            $("<select></select>").hide()
                .appendTo(cog)
                .change(function () {
                    self.options.schemeURI = $("option:selected", this).first().val();
                    var label = $("option:selected", this).first().text();
                    $(self.element).trigger("selected", { "uri": self.options.schemeURI, "label": label });
                    $(this).hide(300);
                });

            // resize/reposition things when window resizes
            $(window).resize(function () {
                $(cog).css({
                    left: parent.position().left + parent.width() - 14,
                    top: parent.position().top
                });
            });

            self._getData();
        },

        // redraw the control
        _getData: function () {
            var self = this;

            // if we have cached data use that; don't do the ajax call 
            // (as the browser cache doesn't seem to work with AAT SPARQL calls)            
            var key = self.options.endpointURI + "@schemes";
            if ($.data(self.element, key)) {
                self.ajaxSuccess($.data(self.element, key), "from cache", {});
                return;
            }

            //	build a sparql query to get the data, filtering by language,
            // supplying a fallback if required language label is not present
            var limit = parseInt(self.options.limit, 10);
            var offset = parseInt(self.options.offset, 10);

            var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
                + " PREFIX dct: <http://purl.org/dc/terms/>"
                + " SELECT DISTINCT ?uri ?label WHERE {"
                + " ?uri a skos:ConceptScheme; dct:title ?label . "
	            + " FILTER(langMatches(lang(?label), '" + self.options.language + "'))"
	            + " }"
                + " ORDER BY ASC(str(?label))"
	            + (offset > 0 ? " OFFSET " + offset : "")
                + (limit > 0 ? " LIMIT " + limit : "");

            // make the call
            $.support.cors = true;
            $.ajax({
                method: "GET",	            
                url: self.options.endpointURI,
                crossDomain: true,
                dataType: "jsonp",
                data: { output: "json", query: sparql },
                context: self,
                cache: self.options.useCache,             
                success: self.ajaxSuccess, 
                error: self.ajaxError, 
                complete: self.ajaxComplete,
            }); // end ajax call	            
        },        

        // expecting data to contain uri, label, language
        ajaxSuccess: function (data, textStatus, jqXHR) {
            var self = this;
	
            // cache the retrieved data for next time...
            var key = self.options.endpointURI + "@schemes";
            $.data(self.element, key, data);

            // items may already be sorted, but ensure (case insensitive) sorting prior to display
            data.results.bindings.sort(function (a, b) {
                return a.label.value.toLowerCase() < b.label.value.toLowerCase() ? -1 : 1;
            });

            var selectElement = $("select:first", self.element).html("");

            // add each item to the list (as a listitem!)
            $(data.results.bindings).each(function (index, item) {
                var uri = item.uri ? item.uri.value : "";
                var label = usw.util.htmlEscape(item.label.value);
                var language = item.label["xml:lang"];

                if (self.options.schemeURI == uri)
                    $("<option value='" + uri + "' selected>" + label + "</option>").appendTo(selectElement);
                else
                    $("<option value='" + uri + "'>" + label + "</option>").appendTo(selectElement);
                
            });
        },     

        ajaxError: function (jqXHR, textStatus, errorThrown) {
            var self = this;
            //$("<p>" + usw.util.htmlEscape(errorThrown) + "<p>").prependTo(self.element);
        },

        ajaxComplete: function (jqXHR, textStatus) {
            var	self = this;
            //$(self.element).waitable({ "waiting": false });
            //$(self.element).unblock();
        }        
    });	// end of widget code

    // any elements of class usw-schemeselect automatically become one...
    $(window).load(function () {
        $(".usw-schemeselect").schemeselect();
    });

})(jQuery);	//end of main jquery closure
