import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./App.css";
import { initialApplicationContext } from "./containers/ApplicationContext";
import ApplicationProvider from "./containers/ApplicationProvider";
import Routes from "./Routes";
import strings from "../strings.yaml";
import { StringsContextProvider } from "./containers/StringsContext";

const App: React.FC = () => {
  const [appContext, setAppContext] = useState(initialApplicationContext);

  return (
    <StringsContextProvider data={strings}>
      <Container fluid={true}>
        <ApplicationProvider>
          <Routes />
        </ApplicationProvider>
      </Container>
    </StringsContextProvider>
  );
};

export default App;
