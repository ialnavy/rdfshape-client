import React, { createContext, useContext, useState } from "react";
import { InitialDataStream } from "../../components/data/Data";
import { InitialQuery } from "../../components/query/Query";
import { InitialShacl } from "../../components/shacl/Shacl";
import { InitialShapeMap } from "../../components/shapeMap/ShapeMap";
import { InitialShex } from "../../components/shex/Shex";
import { InitialUML } from "../../components/uml/UML";

// Initial values in context
export const initialApplicationContext = {
  // Array of data (merge uses 2 units of data and more data compound could be added in the future)
  // See provider for the function to add new data
  rdfData: [] as any[],
  sparqlQuery: InitialQuery,
  sparqlEndpoint: "",
  shexSchema: InitialShex,
  shaclSchema: InitialShacl,
  shapeMap: InitialShapeMap,
  umlData: InitialUML,
  streamingData: InitialDataStream
};

// Shared context for storing the data the user is operating on
// and using it throughout the application (e.g.: for autofilling input forms when changing page)
export const ApplicationContext = createContext<any>(null);

export const ApplicationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [rdfData, setRdfData] = useState(initialApplicationContext.rdfData);
  const [sparqlQuery, setSparqlQuery] = useState(initialApplicationContext.sparqlQuery);
  const [sparqlEndpoint, setSparqlEndpoint] = useState(initialApplicationContext.sparqlEndpoint);
  const [shexSchema, setShexSchema] = useState(initialApplicationContext.shexSchema);
  const [shaclSchema, setShaclSchema] = useState(initialApplicationContext.shaclSchema);
  const [shapeMap, setShapeMap] = useState(initialApplicationContext.shapeMap);
  const [umlData, setUmlData] = useState(initialApplicationContext.umlData);
  const [streamingData, setStreamingData] = useState(initialApplicationContext.streamingData);

  return (
    <ApplicationContext.Provider
      value={{
        rdfData, setRdfData,
        sparqlQuery, setSparqlQuery,
        sparqlEndpoint, setSparqlEndpoint,
        shexSchema, setShexSchema,
        shaclSchema, setShaclSchema,
        shapeMap, setShapeMap,
        umlData, setUmlData,
        streamingData, setStreamingData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ApplicationContext);
};
