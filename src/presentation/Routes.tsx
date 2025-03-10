import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "../About";
import API from "../API";
import "./App.css";
import VisualizeRaw from "../components/VisualizeRaw";
import DataConvert from "../domain/data/DataConvert";
import DataExtract from "../domain/data/DataExtract";
import DataInfo from "../domain/data/DataInfo";
import DataMerge from "../domain/data/DataMerge";
import DataQuery from "../domain/data/DataQuery";
import EndpointExtract from "../endpoint/EndpointExtract";
import EndpointInfo from "../endpoint/EndpointInfo";
import EndpointQuery from "../endpoint/EndpointQuery";
import Home from "../Home";
import NotFound from "../NotFound";
import PermalinkReceiver from "../PermalinkReceiver";
import RDFShapeNavbar from "../RDFShapeNavbar";
import ShaclConvert from "../domain/shacl/ShaclConvert";
import ShaclInfo from "../domain/shacl/ShaclInfo";
import ShaclValidate from "../domain/shacl/ShaclValidate";
import ShapeMapInfo from "../domain/shapeMap/ShapeMapInfo";
import ShexConvert from "../domain/shex/ShexConvert";
import ShexInfo from "../domain/shex/ShexInfo";
import ShexValidate from "../domain/shex/ShexValidate";
import Xmi2Shex from "../domain/shex/Xmi2Shex";

const Routes: FC = () => {
  const renderWithNavbar = (Component: React.ComponentType) => {
    return (
      <>
        <RDFShapeNavbar />
        {renderWithoutNavbar(Component)}
      </>
    );
  };

  const renderWithoutNavbar = (Component: React.ComponentType) => {
    // eslint-disable-next-line no-restricted-globals
    const loc = location;
    return <Component location={loc.search ? loc : undefined} />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => renderWithNavbar(Home)} />
        <Route
          path={API.routes.client.dataInfoRoute}
          render={() => renderWithNavbar(DataInfo)}
        />
        <Route
          path={API.routes.client.dataConvertRoute}
          render={() => renderWithNavbar(DataConvert)}
        />
        <Route
          path={API.routes.client.dataQueryRoute}
          render={() => renderWithNavbar(DataQuery)}
        />
        <Route
          path={API.routes.client.dataExtractRoute}
          render={() => renderWithNavbar(DataExtract)}
        />
        <Route
          path={API.routes.client.dataMergeRoute}
          render={() => renderWithNavbar(DataMerge)}
        />

        <Route
          path={API.routes.client.endpointInfoRoute}
          render={() => renderWithNavbar(EndpointInfo)}
        />
        <Route
          path={API.routes.client.endpointQueryRoute}
          render={() => renderWithNavbar(EndpointQuery)}
        />
        <Route
          path={API.routes.client.endpointExtractRoute}
          render={() => renderWithNavbar(EndpointExtract)}
        />

        <Route
          path={API.routes.client.shexValidateRoute}
          render={() => renderWithNavbar(ShexValidate)}
        />
        <Route
          path={API.routes.client.shexInfoRoute}
          render={() => renderWithNavbar(ShexInfo)}
        />

        <Route
          path={API.routes.client.shexConvertRoute}
          render={() => renderWithNavbar(ShexConvert)}
        />
        <Route
          path={API.routes.client.xmi2ShexRoute}
          render={() => renderWithNavbar(Xmi2Shex)}
        />
        <Route
          path={API.routes.client.shaclInfoRoute}
          render={() => renderWithNavbar(ShaclInfo)}
        />
        <Route
          path={API.routes.client.shaclValidateRoute}
          render={() => renderWithNavbar(ShaclValidate)}
        />
        <Route
          path={API.routes.client.shaclConvertRoute}
          render={() => renderWithNavbar(ShaclConvert)}
        />

        <Route
          path={API.routes.client.shapeMapInfoRoute}
          render={() => renderWithNavbar(ShapeMapInfo)}
        />
        <Route
          path={API.routes.client.aboutRoute}
          render={() => renderWithNavbar(About)}
        />
        {/* Raw visualizations for embeddings */}
        <Route
          path={API.routes.client.visualizeRawRoute}
          render={() => renderWithoutNavbar(VisualizeRaw)}
        />
        {/* Route to be shown for processing permalinks */}
        <Route
          path={API.routes.client.permalinkRoute}
          component={PermalinkReceiver}
        />
        <Route render={() => renderWithNavbar(NotFound)} />
      </Switch>
    </Router>
  );
};

export default Routes;
