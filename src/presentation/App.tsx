import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./App.css";
import { initialApplicationContext } from "./containers/ApplicationContext";
import ApplicationProvider from "./containers/ApplicationProvider";
import Routes from "./Routes";

const App: React.FC = () => {
  const [appContext, setAppContext] = useState(initialApplicationContext);

  return (
    <Container fluid={true}>
      <ApplicationProvider>
        <Routes />
      </ApplicationProvider>
    </Container>
  );
};

export default App;
