import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import About from "./About.js";
import API from "./API.js";
import "./App.css";
import DataVisualizeCyto from "./cytoscape/CytoVisualize.js";
import DataVisualizeCytoRaw from "./cytoscape/CytoVisualizeRaw.js";
import DataConvert from "./data/DataConvert.js";
import DataExtract from "./data/DataExtract.js";
import DataInfo from "./data/DataInfo.js";
import DataMerge from "./data/DataMerge";
import DataMergeVisualize from "./data/DataMergeVisualize";
import DataMergeVisualizeRaw from "./data/DataMergeVisualizeRaw.js";
import DataQuery from "./data/DataQuery.js";
import DataVisualize from "./data/DataVisualize.js";
import DataVisualizeRaw from "./data/DataVisualizeRaw.js";
import EndpointExtract from "./endpoint/EndpointExtract.js";
import EndpointInfo from "./endpoint/EndpointInfo.js";
import EndpointQuery from "./endpoint/EndpointQuery.js";
import Home from "./Home.js";
import NotFound from "./NotFound.js";
import PermalinkReceiver from "./PermalinkReceiver.js";
import RDFShapeNavbar from "./RDFShapeNavbar.js";
import SHACL2ShEx from "./shacl/SHACL2ShEx.js";
import SHACLConvert from "./shacl/SHACLConvert.js";
import SHACLInfo from "./shacl/SHACLInfo.js";
import SHACLValidate from "./shacl/SHACLValidate.js";
import ShapeMapInfo from "./shapeMap/ShapeMapInfo";
import ShapeForm from "./shex/ShapeForm.js";
import ShEx2Shacl from "./shex/ShEx2Shacl.js";
import ShEx2XMI from "./shex/ShEx2XMI.js";
import ShExConvert from "./shex/ShExConvert.js";
import ShExInfo from "./shex/ShExInfo.js";
import ShExValidate from "./shex/ShExValidate.js";
import ShExValidateEndpoint from "./shex/ShExValidateEndpoint.js";
import ShExVisualize from "./shex/ShExVisualize.js";
import ShExVisualizeCytoscape from "./shex/ShExVisualizeCytoscape.js";
import ShExVisualizeRaw from "./shex/ShExVisualizeRaw.js";
import TestCode from "./test/TestCode.js";
import TestCyto from "./test/TestCyto.js";
import TestGithubSearch from "./test/TestGithubSearch.js";
import TestInputTabsWithFormat from "./test/TestInputTabsWithFormat";
import TestRDFArea from "./test/TestRDFArea.js";
import TestSearch from "./test/TestSearch.js";
// Only for testing
import TestYashe from "./test/TestYashe.js";
import TestYasqe from "./test/TestYasqe.js";
import TestYate from "./test/TestYate.js";
import WikidataExtract from "./wikidata/WikidataExtract.js";
import WikidataQuery from "./wikidata/WikidataQuery.js";
import WikidataValidate from "./wikidata/WikidataValidate.js";

function Routes() {
  const renderWithNavbar = (Component) => {
    return (
      <>
        <RDFShapeNavbar />
        {renderWithoutNavbar(Component)}
      </>
    );
  };

  const renderWithoutNavbar = (Component) => {
    // eslint-disable-next-line no-restricted-globals
    const loc = location;
    return <Component location={loc.search ? loc : undefined} />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => renderWithNavbar(Home)} />
        <Route
          path={API.dataInfoRoute}
          render={() => renderWithNavbar(DataInfo)}
        />
        <Route
          path={API.dataConvertRoute}
          render={() => renderWithNavbar(DataConvert)}
        />
        <Route
          path={API.dataVisualizeRoute}
          render={() => renderWithNavbar(DataVisualize)}
        />
        {/* RAW visualization */}
        <Route
          path={API.dataVisualizeRouteRaw}
          render={() => renderWithoutNavbar(DataVisualizeRaw)}
        />
        <Route
          path={API.cytoVisualizeRoute}
          render={() => renderWithNavbar(DataVisualizeCyto)}
        />
        {/* RAW visualization */}
        <Route
          path={API.cytoVisualizeRouteRaw}
          render={() => renderWithoutNavbar(DataVisualizeCytoRaw)}
        />
        <Route
          path={API.dataQueryRoute}
          render={() => renderWithNavbar(DataQuery)}
        />
        <Route
          path={API.dataExtractRoute}
          render={() => renderWithNavbar(DataExtract)}
        />
        <Route
          path={API.dataMergeRoute}
          render={() => renderWithNavbar(DataMerge)}
        />
        <Route
          path={API.dataMergeVisualizeRoute}
          render={() => renderWithNavbar(DataMergeVisualize)}
        />
        {/* RAW visualization */}
        <Route
          path={API.dataMergeVisualizeRouteRaw}
          render={() => renderWithoutNavbar(DataMergeVisualizeRaw)}
        />

        <Route
          path={API.endpointInfoRoute}
          render={() => renderWithNavbar(EndpointInfo)}
        />
        <Route
          path={API.endpointQueryRoute}
          render={() => renderWithNavbar(EndpointQuery)}
        />
        <Route
          path={API.endpointExtractRoute}
          render={() => renderWithNavbar(EndpointExtract)}
        />

        <Route
          path={API.shExValidateRoute}
          render={() => renderWithNavbar(ShExValidate)}
        />
        <Route
          path={API.shExValidateEndpointRoute}
          render={() => renderWithNavbar(ShExValidateEndpoint)}
        />
        <Route
          path={API.shExInfoRoute}
          render={() => renderWithNavbar(ShExInfo)}
        />
        <Route
          path={API.shExVisualizeRoute}
          render={() => renderWithNavbar(ShExVisualize)}
        />
        {/* RAW visualization */}
        <Route
          path={API.shExVisualizeRouteRaw}
          render={() => renderWithoutNavbar(ShExVisualizeRaw)}
        />
        <Route
          path={API.shExVisualizeCytoscapeRoute}
          render={() => renderWithNavbar(ShExVisualizeCytoscape)}
        />
        <Route
          path={API.shExConvertRoute}
          render={() => renderWithNavbar(ShExConvert)}
        />
        <Route
          path={API.shEx2ShaclRoute}
          render={() => renderWithNavbar(ShEx2Shacl)}
        />
        <Route
          path={API.shEx2XMIRoute}
          render={() => renderWithNavbar(ShEx2XMI)}
        />

        <Route
          path={API.shapeFormRoute}
          render={() => renderWithNavbar(ShapeForm)}
        />

        <Route
          path={API.shaclInfoRoute}
          render={() => renderWithNavbar(SHACLInfo)}
        />
        <Route
          path={API.shaclValidateRoute}
          render={() => renderWithNavbar(SHACLValidate)}
        />
        <Route
          path={API.shaclConvertRoute}
          render={() => renderWithNavbar(SHACLConvert)}
        />
        <Route
          path={API.shacl2ShExRoute}
          render={() => renderWithNavbar(SHACL2ShEx)}
        />

        <Route
          path={API.shapeMapInfoRoute}
          render={() => renderWithNavbar(ShapeMapInfo)}
        />

        <Route
          path={API.wikidataQueryRoute}
          render={() => renderWithNavbar(WikidataQuery)}
        />
        <Route
          path={API.wikidataValidateRoute}
          render={() => renderWithNavbar(WikidataValidate)}
        />
        <Route
          path={API.wikidataExtractRoute}
          render={() => renderWithNavbar(WikidataExtract)}
        />
        <Route path={API.aboutRoute} render={() => renderWithNavbar(About)} />

        {/*The following route is for backwards compatibility*/}
        <Route path="/validate" render={() => renderWithNavbar(ShExValidate)} />

        <Route path="/test/yashe" render={() => renderWithNavbar(TestYashe)} />
        <Route path="/test/yasqe" render={() => renderWithNavbar(TestYasqe)} />
        <Route
          path="/test/rdfArea"
          render={() => renderWithNavbar(TestRDFArea)}
        />
        <Route path="/test/cyto" render={() => renderWithNavbar(TestCyto)} />
        <Route path="/test/code" render={() => renderWithNavbar(TestCode)} />
        <Route path="/test/turtle" render={() => renderWithNavbar(TestYate)} />
        <Route
          path="/test/search"
          render={() => renderWithNavbar(TestSearch)}
        />
        <Route
          path="/test/github"
          render={() => renderWithNavbar(TestGithubSearch)}
        />
        <Route
          path="/test/inputTabsWithFormat"
          render={() => renderWithNavbar(TestInputTabsWithFormat)}
        />
        <Route
          path={API.permalinkRoute}
          component={PermalinkReceiver}
          // render={() => renderWithNavbar(PermalinkReceiver)}
        />

        <Route
          path="/links/i1"
          render={() => (
            <Redirect to="/dataInfo?data=%40prefix%20%3A%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2F%3E%20.%0A%40prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20.%0A%40prefix%20item%3A%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F%3E%20.%0A%40prefix%20dbr%3A%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%20.%0A%40prefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20.%0A%40prefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20.%0A%40prefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.example.org%2Fitem%2F%3E%20.%0A%40prefix%20wd%3A%20%20%20%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20.%0A%40prefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20%221990-07-04%22%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2Falice%23me%3E%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%22unknown%22%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22Mona%20Lisa%22%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22La%20Joconde%20%C3%A0%20Washington%22%40fr%20.%0A&dataFormat=TURTLE&inference=NONE" />
          )}
        />
        <Route
          path="/links/i2"
          render={() => (
            <Redirect to="/dataConvert?data=%40prefix%20%3A%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2F%3E%20.%0A%40prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20.%0A%40prefix%20item%3A%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F%3E%20.%0A%40prefix%20dbr%3A%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%20.%0A%40prefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20.%0A%40prefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20.%0A%40prefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.example.org%2Fitem%2F%3E%20.%0A%40prefix%20wd%3A%20%20%20%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20.%0A%40prefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20%221990-07-04%22%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2Falice%23me%3E%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%22unknown%22%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22Mona%20Lisa%22%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22La%20Joconde%20%C3%A0%20Washington%22%40fr%20.&amp;dataFormat=TURTLE&amp;targetDataFormat=JSON-LD&amp;inference=NONE" />
          )}
        />
        <Route
          path="/links/i3"
          render={() => (
            <Redirect to="/shExConvert?activeSchemaTab=%23schemaTextArea&schema=prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20%0Aprefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20%0Aprefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20%0Aprefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F>%20%0Aprefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20%0A%0A<User>%20IRI%20%7B%20%0A%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B%20foaf%3APerson%20%5D%3B%20%0A%20schema%3AbirthDate%20%20%20%20%20xsd%3Adate%3F%20%20%3B%0A%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%40<User>%2A%20%3B%0A%20foaf%3Atopic_interest%20%20%40<Topic>%7B0%2C10%7D%0A%7D%0A%0A<Topic>%20%7B%0A%20%20dcterms%3Atitle%20%20%20xsd%3Astring%20%3B%0A%20%20dcterms%3Acreator%20IRI%20%3B%0A%20%20%5Edcterms%3Asubject%20%40<Item>%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A<Item>%20%7B%0A%20%20dcterms%3Atitle%20%5B%40en%20%40fr%20%40es%5D%20%3B%0A%7D&schemaEngine=ShEx&schemaFormat=ShExC&schemaFormatTextArea=ShExC&targetSchemaFormat=JSON-LD" />
          )}
        />
        <Route
          path="/links/i4"
          render={() => (
            <Redirect to="/shExInfo?schema=prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20%0Aprefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0Aprefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20%0Aprefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F%3E%20%0Aprefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20%0A%0A%3CUser%3E%20IRI%20%7B%20%0A%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B%20foaf%3APerson%20%5D%3B%20%0A%20schema%3AbirthDate%20%20%20%20%20xsd%3Adate%3F%20%20%3B%0A%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%40%3CUser%3E*%20%3B%0A%20foaf%3Atopic_interest%20%20%40%3CTopic%3E%7B0%2C10%7D%0A%7D%0A%0A%3CTopic%3E%20%7B%0A%20%20dcterms%3Atitle%20%20%20xsd%3Astring%20%3B%0A%20%20dcterms%3Acreator%20IRI%20%3B%0A%20%20%5Edcterms%3Asubject%20%40%3CItem%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A%3CItem%3E%20%7B%0A%20%20dcterms%3Atitle%20%5B%40en%20%40fr%20%40es%5D%20%3B%0A%7D&schemaFormat=ShExC&schemaEngine=ShEx" />
          )}
        />
        <Route
          path="/links/i5"
          render={() => (
            <Redirect to="/validate?data=%40prefix%20%3A%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2F%3E%20.%0A%40prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20.%0A%40prefix%20item%3A%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F%3E%20.%0A%40prefix%20dbr%3A%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%20.%0A%40prefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20.%0A%40prefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20.%0A%40prefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.example.org%2Fitem%2F%3E%20.%0A%40prefix%20wd%3A%20%20%20%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20.%0A%40prefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20%221990-07-04%22%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Aalice%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%22unknown%22%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22Mona%20Lisa%22%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22La%20Joconde%20%C3%A0%20Washington%22%40fr%20.&amp;dataFormat=TURTLE&amp;schema=prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20%0Aprefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20%0Aprefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20%0Aprefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F%3E%20%0Aprefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20%0A%0A%3CUser%3E%20IRI%20%7B%20%0A%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B%20foaf%3APerson%20%5D%3B%20%0A%20schema%3AbirthDate%20%20%20%20%20xsd%3Adate%3F%20%20%3B%0A%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%40%3CUser%3E*%20%3B%0A%20foaf%3Atopic_interest%20%20%40%3CTopic%3E%7B0%2C10%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A%3CTopic%3E%20%7B%0A%20%20dcterms%3Atitle%20%20%20xsd%3Astring%20%3B%0A%20%20dcterms%3Acreator%20IRI%20%3B%0A%20%20%5Edcterms%3Asubject%20%40%3CItem%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A%3CItem%3E%20%7B%0A%20%20dcterms%3Atitle%20%5B%40en%20%40fr%20%40es%5D%20%3B%0A%7D&amp;schemaFormat=ShExC&amp;schemaEngine=ShEx&amp;triggerMode=ShapeMap&amp;inference=NONE&amp;activeDataTab=%23dataTextArea&amp;activeSchemaTab=%23schemaTextArea&amp;activeShapeMapTab=%23shapeMapTextArea&amp;&amp;shapeMap=%3Abob%40%3CUser%3E%2C%3Acarol%40%3CUser%3E" />
          )}
        />
        <Route render={() => renderWithNavbar(NotFound)} />
      </Switch>
    </Router>
  );

  // <Redirect to="/dataInfo?data=%40prefix%20%3A%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2F%3E%20.%0A%40prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20.%0A%40prefix%20item%3A%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F%3E%20.%0A%40prefix%20dbr%3A%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%20.%0A%40prefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20.%0A%40prefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20.%0A%40prefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.example.org%2Fitem%2F%3E%20.%0A%40prefix%20wd%3A%20%20%20%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20.%0A%40prefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20%221990-07-04%22%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2Falice%23me%3E%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%22unknown%22%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22Mona%20Lisa%22%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22La%20Joconde%20%C3%A0%20Washington%22%40fr%20.%0A&dataFormat=TURTLE&inference=NONE"/>
}

export default Routes;
