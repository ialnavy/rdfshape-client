import React from "react";
import { Route, Routes as Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import API from "../API";

import Home from "./components/Home";
import DataInfo from "./components/data/DataInfo";

// import About from "../About";
// import VisualizeRaw from "../components/VisualizeRaw";
// import DataConvert from "../domain/data/DataConvert";
// import DataExtract from "../domain/data/DataExtract";
// import DataMerge from "../domain/data/DataMerge";
// import DataQuery from "../domain/data/DataQuery";
// import EndpointExtract from "../endpoint/EndpointExtract";
// import EndpointInfo from "../endpoint/EndpointInfo";
// import EndpointQuery from "../endpoint/EndpointQuery";
// import NotFound from "../NotFound";
// import PermalinkReceiver from "../PermalinkReceiver";
// import RDFShapeNavbar from "../RDFShapeNavbar";
// import ShaclConvert from "../domain/shacl/ShaclConvert";
// import ShaclInfo from "../domain/shacl/ShaclInfo";
// import ShaclValidate from "../domain/shacl/ShaclValidate";
// import ShapeMapInfo from "../domain/shapeMap/ShapeMapInfo";
// import ShexConvert from "../domain/shex/ShexConvert";
// import ShexInfo from "../domain/shex/ShexInfo";
// import ShexValidate from "../domain/shex/ShexValidate";
// import Xmi2Shex from "../domain/shex/Xmi2Shex";

import { useLocation } from "react-router-dom";

const Routes: React.FC = () => {
  const location = useLocation();
  
  const renderWithNavbar = (Component: React.FC<any>) => {
    return (
      <div>
        {/* <RDFShapeNavbar /> */}
        <Component location={location} />
      </div>
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/" element={renderWithNavbar(Home)} />
        <Route
          path={API.routes.client.dataInfoRoute}
          element={renderWithNavbar(DataInfo)}
        />
        {
        
        /* TBD: TO BE DONE */
        
        /* <Route
          path={API.routes.client.dataConvertRoute}
          element={renderWithNavbar(DataConvert)}
        />
        <Route
          path={API.routes.client.dataQueryRoute}
          element={renderWithNavbar(DataQuery)}
        />
        <Route
          path={API.routes.client.dataExtractRoute}
          element={renderWithNavbar(DataExtract)}
        />
        <Route
          path={API.routes.client.dataMergeRoute}
          element={renderWithNavbar(DataMerge)}
        />

        <Route
          path={API.routes.client.endpointInfoRoute}
          element={renderWithNavbar(EndpointInfo)}
        />
        <Route
          path={API.routes.client.endpointQueryRoute}
          element={renderWithNavbar(EndpointQuery)}
        />
        <Route
          path={API.routes.client.endpointExtractRoute}
          element={renderWithNavbar(EndpointExtract)}
        />

        <Route
          path={API.routes.client.shexValidateRoute}
          element={renderWithNavbar(ShexValidate)}
        />
        <Route
          path={API.routes.client.shexInfoRoute}
          element={renderWithNavbar(ShexInfo)}
        />

        <Route
          path={API.routes.client.shexConvertRoute}
          element={renderWithNavbar(ShexConvert)}
        />
        <Route
          path={API.routes.client.xmi2ShexRoute}
          element={renderWithNavbar(Xmi2Shex)}
        />
        <Route
          path={API.routes.client.shaclInfoRoute}
          element={renderWithNavbar(ShaclInfo)}
        />
        <Route
          path={API.routes.client.shaclValidateRoute}
          element={renderWithNavbar(ShaclValidate)}
        />
        <Route
          path={API.routes.client.shaclConvertRoute}
          element={renderWithNavbar(ShaclConvert)}
        />

        <Route
          path={API.routes.client.shapeMapInfoRoute}
          element={renderWithNavbar(ShapeMapInfo)}
        />
        <Route
          path={API.routes.client.aboutRoute}
          element={renderWithNavbar(About)}
        />
        <Route
          path={API.routes.client.visualizeRawRoute}
          element={ <VisualizeRaw /> }
        />
        <Route
          path={API.routes.client.permalinkRoute}
          element={<PermalinkReceiver />}
        />
        <Route element={renderWithNavbar(NotFound)} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
