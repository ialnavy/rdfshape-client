import qs from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// React Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import shumlex from "shumlex";
import API from "../API";
import PageHeader from "../components/PageHeader";
import {
  schemaEngines,
  shaclEngines
} from "../components/SelectEngine";
import { ApplicationContext } from "../context/ApplicationContext";
import { mkPermalinkLong } from "../Permalink";
import axios from "../utils/networking/axiosConfig";
import { mkError } from "../utils/ResponseError";
import { getConverterInput } from "../utils/xmiUtils/shumlexUtils";
import ShExParser from "./shapeform/ShExParser";
import {
  getShexText,
  InitialShex,
  mkShexServerParams,
  paramsFromStateShex,
  updateStateShex
} from "./Shex";

import ShExResult from "./commons/ShExResult";
import ShExConvertResult from "./shexConvert/ShExConvertResult";
import ShExConvertForm from "./shexConvert/ShExConvertForm";

function ShexConvert(props) {
  const { shexSchema: ctxShex } = useContext(ApplicationContext);

  const history = useHistory();

  const [shex, setShex] = useState(ctxShex || InitialShex);

  const [targetSchemaFormat, setTargetSchemaFormat] = useState(
    API.formats.defaultShex
  );

  const [targetSchemaEngine, setTargetSchemaEngine] = useState(
    API.engines.shex
  );

  const [result, setResult] = useState("");

  const [params, setParams] = useState(null);
  const [lastParams, setLastParams] = useState(null);

  const [permalink, setPermalink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const [disabledLinks, setDisabledLinks] = useState(false);

  const [key, setKey] = useState("shexEditor");

  const urlInfo = API.routes.server.schemaInfo;
  const urlConvert = API.routes.server.schemaConvert;

  // Store the current result type as one of these to know which result component to render
  const resultTypes = Object.freeze({
    schema: "schema",
    shumlex: "shumlex",
    shapeForms: "shapeForms",
    tresd: "3dshex",
  });

  // Extra logic for handling the target format changes
  const handleTargetFormatChange = (newFormat) => {
    // If we are missing the format it is because the engine changed category,
    // set default format for new category
    if (!newFormat) {
      if (targetSchemaEngine === API.engines.shex)
        setTargetSchemaFormat(API.formats.defaultShex);
      else if (shaclEngines.includes(targetSchemaEngine))
        setTargetSchemaFormat(API.formats.defaultShacl);
      else if (targetSchemaEngine === API.engines.shapeForms)
        setTargetSchemaFormat(API.formats.htmlForm);
      else if (targetSchemaEngine === API.engines.shumlex)
        setTargetSchemaFormat(API.formats.xmi);
      else if (targetSchemaEngine === API.engines.tresdshex)
        setTargetSchemaFormat(API.formats.tresd);
    } else setTargetSchemaFormat(newFormat);
  };

  useEffect(() => {
    if (props.location?.search) {
      const queryParams = qs.parse(props.location.search);

      if (queryParams[API.queryParameters.schema.schema]) {
        const finalSchema = updateStateShex(queryParams, shex) || shex;
        setShex(finalSchema);

        const finalTargetFormat =
          queryParams[API.queryParameters.schema.targetFormat] ||
          targetSchemaFormat;
        setTargetSchemaFormat(finalTargetFormat);

        const finalTargetEngine =
          queryParams[API.queryParameters.schema.targetEngine] ||
          targetSchemaEngine;
        setTargetSchemaEngine(finalTargetEngine);

        const params = mkParams(
          finalSchema,
          finalTargetFormat,
          finalTargetEngine
        );

        setParams(params);
        setLastParams(params);
      } else {
        setError(API.texts.errorParsingUrl);
      }
    }
  }, [props.location?.search]);

  useEffect(() => {
    if (params && !loading) {
      if (
        params[API.queryParameters.schema.schema] &&
        (params[API.queryParameters.schema.source] == API.sources.byFile
          ? params[API.queryParameters.schema.schema].name
          : true)
      ) {
        resetState();
        setUpHistory();
        // Execute different logic depending on the target engine
        convertSchema();
      } else {
        setError(API.texts.noProvidedSchema);
      }
    }
  }, [params]);

  function mkParams(
    pShex = shex,
    pTargetFormat = targetSchemaFormat,
    pTargetEngine = targetSchemaEngine
  ) {
    return {
      ...paramsFromStateShex(pShex),
      [API.queryParameters.schema.targetFormat]: pTargetFormat,
      [API.queryParameters.schema.targetEngine]: pTargetEngine,
    };
  }

  async function mkServerParams(
    pShex = shex,
    pTargetFormat = targetSchemaFormat,
    pTargetEngine = targetSchemaEngine
  ) {
    return {
      [API.queryParameters.schema.schema]: await mkShexServerParams(pShex),
      [API.queryParameters.targetFormat]: pTargetFormat,
      [API.queryParameters.targetEngine]: pTargetEngine,
    };
  }

  // Execute the necessary conversion logic depending on the target engine
  const convertSchema = () => {
    if (schemaEngines.includes(targetSchemaEngine)) serverSchemaConvert();
    else if (targetSchemaEngine === API.engines.shapeForms) clientFormConvert();
    else if (targetSchemaEngine === API.engines.shumlex) clientUmlConvert();
  };

  // Aux function. Before doing any client conversion, ask the server for the Schema info
  // so that we get syntax errors.
  // If no errors: discard response, we can assume ShEx is OK
  // If errors: throw them so that the caller handles them
  async function serverSchemaInfo() {
    try {
      const postParams = await mkServerParams();
      const { data: infoResponse } = await axios.post(urlInfo, postParams);
      return infoResponse;
    } catch (error) {
      throw error;
    }
  }

  // For schema-schema conversions done by server
  async function serverSchemaConvert() {
    setLoading(true);
    setProgressPercent(20);

    try {
      // We don't need to call "serverSchemaInfo", this operation is done in the server
      // and will validate the schema
      const postParams = await mkServerParams();
      const { data: convertResponse } = await axios.post(
        urlConvert,
        postParams
      );
      setProgressPercent(60);

      setResult({ ...convertResponse, renderType: resultTypes.schema });

      setPermalink(
        mkPermalinkLong(API.routes.client.shexConvertRoute, params, true)
      );
      checkLinks();
    } catch (error) {
      setError(mkError(error, urlConvert));
    } finally {
      setLoading(false);
    }
  }

  // For schema-uml conversions done with client libraries
  async function clientUmlConvert() {
    setLoading(true);
    setProgressPercent(20);
    try {
      // We do "serverSchemaInfo" first, so that the server validates
      // the user ShEx before processing anything. We don't use this data though.
      const schemaInfo = await serverSchemaInfo();

      // Get the raw data passed to the converter
      const input = await getConverterInput(params);
      const xmiResult = shumlex.shExToXMI(input);

      setResult({ result: xmiResult, renderType: resultTypes.shumlex });

      setPermalink(
        mkPermalinkLong(API.routes.client.shexConvertRoute, params, true)
      );
      checkLinks();
    } catch (error) {
      setError(
        mkError({
          ...error,
          message: `An error occurred creating the UML equivalent. Check your inputs.\n${error}`,
        })
      );
    } finally {
      setLoading(false);
    }
  }

  // For schema-form conversions done with client libraries
  async function clientFormConvert() {
    setLoading(true);
    setProgressPercent(20);
    try {
      // We do "serverSchemaInfo" first, so that the server validates
      // the user ShEx before processing anything. We don't use this data though.
      const schemaInfo = await serverSchemaInfo();

      // Get the raw data passed to the converter
      const input = await getConverterInput(params);
      // Parse the ShEx to form
      const result = new ShExParser().parseShExToForm(input);
      // Finish updating state, UI

      setResult({
        form: result,
        message: "successMessage",
        renderType: resultTypes.shapeForms,
      });
      setPermalink(
        mkPermalinkLong(API.routes.client.shexConvertRoute, params, true)
      );
      checkLinks();
    } catch (error) {
      setError(
        mkError({
          ...error,
          message: `An error has occurred while creating the Form equivalent:\n${error}`,
        })
      );
    } finally {
      setLoading(false);
    }
  }

  // Disabled permalinks, etc. if the user input is too long or a file
  function checkLinks() {
    const disabled =
      getShexText(shex).length > API.limits.byTextCharacterLimit
        ? API.sources.byText
        : shex.activeSource === API.sources.byFile
        ? API.sources.byFile
        : false;

    setDisabledLinks(disabled);
  }

  function setUpHistory() {
    // Store the last search URL in the browser history to allow going back
    if (
      params &&
      lastParams &&
      JSON.stringify(params) !== JSON.stringify(lastParams)
    ) {
      history.push(
        mkPermalinkLong(API.routes.client.shexConvertRoute, lastParams)
      );
    }
    // Change current url for shareable links
    history.replace(
      mkPermalinkLong(API.routes.client.shexConvertRoute, params)
    );

    setLastParams(params);
  }

  function resetState() {
    setResult(null);
    setPermalink(null);
    setError(null);
    setProgressPercent(0);
  }

  return (
    <Container fluid={true}>
      <Row>
        <PageHeader
          title={API.texts.pageHeaders.shexConversion}
          details={API.texts.pageExplanations.shexConversion}
        />
      </Row>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="shex-convert-tab"
        className="mb-3"
      >
        <Tab eventKey="shexEditor" title="ShEx editor">
          <ShExConvertForm
            loading={loading}
            setParams={setParams}
            mkParams={mkParams}
            shex={shex}
            setShex={setShex}
            targetSchemaEngine={targetSchemaEngine}
            setTargetSchemaEngine={setTargetSchemaEngine}
            setKey={setKey}
          />
        </Tab>
        <Tab eventKey="result" title="Result">
          <ShExResult
              loading={loading}
              result={result}
              error={error}
              permalink={permalink}
              progressPercent={progressPercent}
              notRenderedYetMessage={API.texts.conversionResultsWillAppearHere}
              resultComponent={(
                <ShExConvertResult
                  result={result}
                  resultTypes={resultTypes}
                  permalink={permalink}
                  disabledLinks={disabledLinks}
                />
              )}
            />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ShexConvert;
