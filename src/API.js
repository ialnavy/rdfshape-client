/** This class contains global definitions */

import React from "react";
import environmentConfiguration from "./EnvironmentConfig";

class API {
  // Routes
  static rootApi = environmentConfiguration.apiHost + "/api/";
  static routes = {
    // Routes in server
    server: {
      root: this.rootApi,
      health: this.rootApi + "health",

      dataInfo: this.rootApi + "data/info",
      dataConvert: this.rootApi + "data/convert",
      dataQuery: this.rootApi + "data/query",
      dataExtract: this.rootApi + "data/extract",
      dataFormatsInput: this.rootApi + "data/formats/input",
      dataFormatsOutput: this.rootApi + "data/formats/output",
      dataVisualFormats: this.rootApi + "data/formats/visual",

      schemaInfo: this.rootApi + "schema/info",
      schemaConvert: this.rootApi + "schema/convert",
      schemaValidate: this.rootApi + "schema/validate",
      shExFormats: this.rootApi + "schema/formats?schemaEngine=shex",
      shaclFormats: this.rootApi + "schema/formats?schemaEngine=shaclex",
      schemaShaclEngines: this.rootApi + "schema/engines/shacl",

      shapeMapInfo: this.rootApi + "shapemap/info",
      shapeMapFormats: this.rootApi + "shapemap/formats",

      endpointInfo: this.rootApi + "endpoint/info",
      wikibaseQuery: this.rootApi + "wikibase/query",

      inferenceEngines: this.rootApi + "data/inferenceEngines",

      serverPermalinkEndpoint: this.rootApi + "permalink/generate",
      serverOriginalLinkEndpoint: this.rootApi + "permalink/get",
      fetchUrl: this.rootApi + "fetch",
    },
    // Routes in client
    client: {
      dataInfoRoute: "/dataInfo",
      dataConvertRoute: "/dataConvert",
      dataExtractRoute: "/dataExtract",
      dataMergeRoute: "/dataMerge",
      dataQueryRoute: "/dataQuery",

      endpointInfoRoute: "/endpointInfo",
      endpointExtractRoute: "/endpointExtract",
      endpointQueryRoute: "/endpointQuery",

      shexInfoRoute: "/shexInfo",
      shexConvertRoute: "/shexConvert",
      shexValidateRoute: "/shexValidate",
      shexValidateEndpointRoute: "/shexValidateEndpoint",
      xmi2ShexRoute: "/xmi2shex",
      shapeFormRoute: "/shapeForm",

      shaclInfoRoute: "/shaclInfo",
      shaclConvertRoute: "/shaclConvert",
      shaclValidateRoute: "/shaclValidate",

      shapeMapInfoRoute: "/shapeMapInfo",

      wikidataQueryRoute: "/wikidataQuery",
      wikidataValidateRoute: "/wikidataValidate",
      wikidataExtractRoute: "/wikidataExtract",

      visualizeRawRoute: "/visualize",

      permalinkRoute: "/link/:urlCode",

      aboutRoute: "/about",
    },
    // Other useful routes
    utils: {
      apiDocs: "https://app.swaggerhub.com/apis/weso/RDFShape",
      projectSite: "https://www.weso.es/rdfshape-api/",
      wikishape: "https://wikishape.weso.es",
      wikidataUrl: "https://query.wikidata.org/sparql",
      dbpediaUrl: "https://dbpedia.org/sparql",
      shapeFormHelpUrl:
        "https://github.com/weso/shapeForms#requirementslimitations",
      shumlexRepo: "https://github.com/weso/shumlex",
      shapeFormsRepo: "https://github.com/weso/shapeForms",
    },
  };

  // Dictionary with the names used for query parameters
  // Centralized point to change them and keep them in sync with what the server expects
  static queryParameters = {
    data: {
      data: "data",
      source: "dataSource",
      format: "dataFormat",
      targetFormat: "dataTargetFormat",
      inference: "dataInference",
      compound: "dataCompound",
      nodeSelector: "nodeSelector",
      layout: "dataLayout", // Client only
    },
    schema: {
      schema: "schema",
      source: "schemaSource",
      format: "schemaFormat",
      engine: "schemaEngine",
      inference: "schemaInference",
      targetFormat: "schemaTargetFormat",
      targetEngine: "schemaTargetEngine",
      triggerMode: "triggerMode",
    },
    shapeMap: {
      shapeMap: "shapeMap",
      source: "shapeMapSource",
      format: "shapeMapFormat",
    },
    query: {
      query: "query",
      source: "querySource",
    },
    extraction: {
      endpoint: "endpoint",
      nodeSelector: "nodeSelector",
    },
    endpoint: {
      endpoint: "endpoint",
    },
    uml: {
      uml: "uml",
      source: "umlSource",
      format: "umlFormat",

      targetFormat: "umlTargetFormat",
    },
    permalink: {
      code: "urlCode",
    },
    visualization: {
      type: "vType",
      target: "vTarget",

      types: {
        data: "data",
        shex: "shex",
        shacl: "shacl",
        uml: "uml",
      },
      targets: {
        svg: "svg",
        cyto: "cyto",
      },
    },

    wbQuery: {
      endpoint: "endpoint",
      payload: "payload",
    },
  };

  // Information sources / tabs
  static sources = {
    byText: "byText",
    byUrl: "byUrl",
    byFile: "byFile",
    bySchema: "bySchema",

    default: "byText",
  };

  static tabs = {
    none: "none",
    overview: "overview",
    result: "result",
    xmi: "XMI",
    html: "HTML",
    uml: "UML",
    shex: "ShEx",

    prefixMap: "prefixMap",

    visualization: "visualization",
    visualizations: "visualizations",
    visualizationDot: "dot",
    visualizationCyto: "cyto",

    render: "Render",

    shaclValidationReportText: "shaclReportText",
    shaclValidationReportNodes: "shaclReportNodes",
  };

  // Formats (most formats come from server but we need defaults for data initialization)
  static formats = {
    turtle: "turtle",
    triG: "TriG",
    compact: "Compact",
    shexc: "ShExC",
    shexj: "ShExJ",
    sparql: "SPARQL",
    xml: "XML",
    rdfXml: "RDF/XML",
    rdfJson: "RDF/JSON",
    svg: "SVG",
    png: "PNG",
    html: "HTML",
    htmlMicrodata: "html-microdata",
    htmlRdf: "html-rdfa11",
    htmlMixed: "htmlmixed",
    json: "JSON",
    jsonld: "JSON-LD",
    javascript: "javascript",
    dot: "DOT",
    ps: "PS",
    xmi: "UML/XMI",
    txt: "txt",
    htmlForm: "HTML form",

    defaultData: "turtle",
    defaultShex: "ShExC",
    defaultShacl: "turtle",
    defaultShapeMap: "Compact",
    defaultQuery: "SPARQL",
    defaultGraphical: "SVG",
  };

  // Mime types
  static mimeTypes = {
    shex: "text/shex",
    svg: "image/svg+xml",
    png: "image/png",
  };

  // Inferences
  static inferences = {
    default: "None",

    none: "None",
  };

  // Engines
  static engines = {
    default: "ShEx",
    defaultShex: "ShEx",
    defaultShacl: "SHACLex",

    shex: "ShEx",
    shacl: "SHACL", // For general purpose, don't use in API requests
    shaclex: "SHACLex",
    jenaShacl: "JenaSHACL",
    shacl_tq: "SHACL_TQ",

    shumlex: "Shumlex",
    shapeForms: "ShapeForms",
  };

  // Trigger modes
  static triggerModes = {
    default: "ShapeMap",

    shapeMap: "ShapeMap",
    targetDecls: "TargetDecls",
  };

  // By text limitations
  static limits = {
    byTextCharacterLimit: 2200,
  };

  // Text constants
  static texts = {
    navbarHeaders: {
      rdf: "RDF",
      endpoint: "Endpoint",
      shex: "ShEx",
      shacl: "SHACL",
      shapeMap: "ShapeMap",
      analysis: "Analysis",
      information: "Information",
      conversion: "Conversion",
      visualization: "Visualization",
      validationUser: "Validation",
      merge: "Merge",
      mergeAndConvert: "Merge & Convert",
      mergeAndVisualize: "Merge & Visualize",
      sparqlQuery: "Query (SPARQL)",
      shexExtract: "ShEx extraction",
      shexToForm: "ShEx → Form",
      shexToUml: "ShEx ⟷ UML",
      umlToShEx: "UML → ShEx",
      examples: "Examples",
      help: "Help",
      wikishape: "Wikishape",
      wiki: "Wiki",
      apiDocs: "API Docs",
      about: "About",
      projectSite: "Project site",
    },

    pageHeaders: {
      dataInfo: "Data analysis",
      dataConversion: "Data conversion",
      dataMerge: "Data merge",
      dataQuery: "Data query",
      wikidataQuery: "Query Wikidata",
      wikidataValidate: "Validate Wikidata entities",
      dataShexExtraction: "Extract ShEx from data",
      wikidataSchemaExtraction: "Extract schema from Wikidata entities",
      endpointSchemaExtraction: "Extract schema from Endpoint node",

      endpointInfo: "Endpoint information",
      endpointQuery: "Endpoint query",

      shexInfo: "ShEx analysis",
      shexConversion: "ShEx conversion",
      shexValidation: "ShEx validate data",
      umlToShex: "UML conversion to ShEx",

      shaclInfo: "SHACL analysis",
      shaclValidation: "SHACL validate data",
      shaclConversion: "SHACL conversion",

      shapeMapInfo: "ShapeMap analysis",
    },

    pageExplanations: {
      dataInfo:
        "Input some RDF data (by text, by pointing to a URL with the contents or by file) and select its format and inference to validate its contents and see additional information, including: prefix map, SVG and Cytoscape visuals",
      dataConversion:
        "Input some RDF data (by text, by pointing to a URL with the contents or by file) and select a target format to have your input converted",

      dataMerge:
        "Input two sources of RDF data (by text, by pointing to a URL with the contents or by file) and select a target format to have your inputs merged and converted",
      dataQuery:
        "Input some RDF data (by text, by pointing to a URL with the contents or by file) and a valid SPARQL query to execute the query against the data and examine the results",

      wikidataQuery: "Query Wikidata",
      wikidataValidate: "Validate Wikidata entities",
      dataShexExtraction:
        "Input some RDF data (by text, by pointing to a URL with the contents or by file) and try to extract a validation schema (ShEx) that suits the input",

      wikidataSchemaExtraction: "Extract schema from Wikidata entities",
      endpointSchemaExtraction: "Extract schema from Endpoint node",

      endpointInfo:
        "Input a the URL of an existing SPARQL endpoint to check its current status. Some common endpoints are given as examples.",
      endpointQuery: (
        <span>
          <p>
            Input a SPARQL query (by text, by pointing to a URL with the
            contents or by file) and execute it against the selected SPARQL
            endpoint. Some common endpoints are given as examples.
          </p>
          <p>Results are searchable, sortable and downloadable.</p>
        </span>
      ),
      shexInfo:
        "Input some Shape Expression (ShEx) (by text, by pointing to a URL with the contents or by file) and select its format to validate its contents and see additional information, including: prefix map, SVG and Cytoscape visuals",

      shexConversion: (
        <>
          <p>
            Input some Shape Expression (ShEx) and select its format, as well as
            a target validation engine and format to have your schema converted
          </p>
          <p>
            Several target engines are supported, including:
            <ul>
              <li>ShEx and SHACL for schema to schema conversions</li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.routes.utils.shumlexRepo}
                >
                  Shumlex
                </a>{" "}
                for schema to UML conversions
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.routes.utils.shapeFormsRepo}
                >
                  ShapeForms
                </a>{" "}
                for schema to forms conversions
              </li>
            </ul>
          </p>
          <p>
            {API.engines.shex} to {API.engines.shacl} is still unsupported
          </p>
        </>
      ),
      shexValidation: (
        <>
          <p>
            Input some RDF data and ShEx schema (by text, by pointing to a URL
            with the contents or by file) to validate the data against the
            schema and see the validation results in per-node detail
          </p>
          <p>Results are searchable, sortable and downloadable</p>
        </>
      ),
      umlToShex:
        "Input some XMI data (by text, by pointing to a URL with the contents or by file) to try to extract a ShEx schema compliant with the input",

      shaclInfo:
        "Input some SHACL (by text, by pointing to a URL with the contents or by file) and select its format and engine to validate its contents and see additional information, including: prefix map and visuals",

      shaclValidation: "SHACL validate data",
      shaclConversion: (
        <>
          <p>
            Input a SHACL schema and select its format/engine, as well as a
            target validation engine and format to have your schema converted
          </p>
          <p>
            Several target engines are supported, including:
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://shex.io/"}
                >
                  {this.engines.shex}
                </a>{" "}
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://jena.apache.org/"}
                >
                  {this.engines.jenaShacl}
                </a>{" "}
                for Apache Jena
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://github.com/TopQuadrant/shacl"}
                >
                  {this.engines.shacl_tq}
                </a>{" "}
                for Top Braid SHACL API
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://github.com/weso/shaclex"}
                >
                  {this.engines.shaclex}
                </a>{" "}
                for WESO's ShEx/SHACL API
              </li>
            </ul>
          </p>
        </>
      ),

      shapeMapInfo:
        "Input a ShapeMap (by text, by pointing to a URL with the contents or by file) and select its format to validate its contents. Note that whole URIs must be used as there is no data/schema from which a prefix map can be retrieved",
    },

    dataTabs: {
      dataHeader: "Data (RDF)",
      shexHeader: "Shapes Graph (ShEx)",
      shaclHeader: "Shapes Graph (SHACL)",
      shapeMapHeader: "ShapeMap",
      queryHeader: "Query (SPARQL)",
      umlHeader: "UML (XMI)",

      formatHeader: "Format",
      nodeSelectorHeader: "Node selector",
    },

    selectors: {
      format: "Format",
      targetFormat: "Target format",

      engine: "Engine",
      targetEngine: "Target engine",
      shaclEngine: "SHACL engine",
    },

    resultTabs: {
      schema: "Schema",
      extracted: "Extracted",
      overview: "Overview",
      result: "Result",
      prefixMap: "Prefix Map",
      visualization: "Visualization",
      render: "Render",
      visualizations: "Visualizations",
      visualizationDot: "DOT",
      visualizationCyto: "Cytoscape",
    },

    endpoints: {
      commonEndpoints: "Common endpoints",
      online: "Endpoint ONLINE",
    },

    xmi: {
      umlToShex: "Load UML to ShEx converter",
      shexToUml: "Load ShEx to UML converter",
    },

    placeholders: {
      sparqlQuery: "SELECT...",
      rdf: "RDF...",
      url: "http://...",
      shex: "ShEx...",
      shacl: "SHACL...",
      shapeMap: "<node>@<Shape>...>",
      xmi: "XMI...",
      nodeSelector: "prefix:Node",
    },

    actionButtons: {
      analyze: "Analyze",
      convert: "Convert",
      visualize: "Visualize",
      validate: "Validate",
      merge: "Merge",
      query: "Query",
      extract: "Extract",
      fetch: "Fetch",
      createForm: "Create form",
    },

    visualizationSettings: {
      download: "Download",
      embedLink: "Embed link",
      fullscreen: "Toggle fullscreen",
      fullscreenIn: "Enter fullscreen",
      fullscreenOut: "Exit fullscreen",
      center: "Center visualization",
    },

    validationResults: {
      allValid: "Validation successful",
      nodeValid: "Valid",
      nodeInvalid: "Invalid",
      someValid:
        "Partially invalid data: check the details of each node to learn more",
      noneValid: "Invalid data: check the details of each node to learn more",
      noData:
        "Validation was completed but no results were obtained, check if the input data is coherent",
    },

    queryResults: {
      noData:
        "Query was executed but no results were obtained, check if the input data is coherent",
    },

    misc: {
      shex: "ShEx",
      shacl: "SHACL",
      xmi: "XMI",
      graph: "Graph",
      prefixMap: "Prefix map",
      associations: "Associations",
      umlDiagram: "UML Diagram",
      fullscreen: "Fullscreen",
      download: "Download",
      address: "Address",
      status: "Status",
      authors: "Authors & Contributors",
      weso: "WESO",
      wesoGroup: "WESO Research Group",

      shaclValidationReportText: "Validation report",
      shaclValidationReportNodes: "Results per node",
    },

    serverStatus: "Server status",
    networkError: "Network error",
    errorDetails: "Error details",
    errorParsingUrl: "Could not parse URL information",
    emptyDataUrl: "No URL data to process",
    noProvidedRdf: "No RDF data provided",
    noProvidedSchema: "No schema provided",
    invalidXmiSchema: "Invalid XMI schema",
    noProvidedShapeMap: "No shapeMap provided",
    noProvidedQuery: "No query provided",
    noProvidedEndpoint: "No endpoint provided",
    noProvidedUml: "No UML provided",
    errorResponsePrefix: "Error response",
    responseSummaryText: "Full response",
    noPrefixes: "No prefixes",
    noAssociations: "No associations",

    dataFormat: "Data format",
    schemaFormat: "Schema format",
    schemaEngine: "Schema engine",
    shapeMapFormat: "ShapeMap format",

    numberOfStatements: "Number of statements",
    numberOfShapes: "Number of shapes",
    numberOfAssociations: "Number of associations",

    operationInformation: "Operation information",
    visualizationsWillAppearHere: "Visualizations will appear here",
    dataInfoWillAppearHere: "Data info will appear here",
    schemaInfoWillAppearHere: "Schema info will appear here",
    conversionResultsWillAppearHere: "Conversion results will appear here",
    extractionResultsWillAppearHere: "Extraction results will appear here",
    mergeResultsWillAppearHere: "Merge results will appear here",
    queryResultsWillAppearHere: "Query results will appear here",
    validationResultsWillAppearHere: "Validation results will appear here",
    noPermalinkManual:
      "Can't generate links for long manual inputs, try inserting data by URL",
    noPermalinkFile:
      "Can't generate links for file-based inputs, try inserting data by URL",

    embeddedLink: "Embedded link",
    noEmbeddedFile:
      "Can't generate direct links to visualizations for file-based inputs, try inserting data by URL",
    invalidVisualizationType: "Invalid data type to be visualized",
    invalidVisualizationTarget: "Invalid visualization target format",
    permalinkCopied: "Link copied to clipboard!",
    shapeStartRequired: '"Shape Start" is required when using ShapeForms',

    enableFullscreen: "Show at fullscreen",
    leaveFullscreen: "✖ Leave fullscreen",

    useNodeSelector: "Use node selector",
  };

  // ID of the results container for any operation
  static resultsId = "results-container";
}

export default API;
