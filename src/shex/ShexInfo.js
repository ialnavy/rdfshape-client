import qs from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

// React Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import API from "../API";
import PageHeader from "../components/PageHeader";
import { ApplicationContext } from "../context/ApplicationContext";
import { mkPermalinkLong } from "../Permalink";
import axios from "../utils/networking/axiosConfig";
import { mkError } from "../utils/ResponseError";
import {
  getShexText,
  InitialShex,
  mkShexServerParams,
  paramsFromStateShex,
  updateStateShex
} from "./Shex";
import ResultSchemaInfo from "../results/ResultSchemaInfo";
import ShExResult from "./commons/ShExResult";
import ShexInfoForm from "./shexInfo/ShExInfoForm";

function ShexInfo(props) {
  const { shexSchema: ctxShex } = useContext(ApplicationContext);
  const history = useHistory();

  const [shex, setShEx] = useState(ctxShex || InitialShex);

  const [result, setResult] = useState("");

  const [params, setParams] = useState(null);
  const [lastParams, setLastParams] = useState(null);

  const [permalink, setPermalink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const [disabledLinks, setDisabledLinks] = useState(false);

  const urlInfo = API.routes.server.schemaInfo;
  const urlVisual = API.routes.server.schemaConvert;

  const [key, setKey] = useState("shexEditor");

  useEffect(() => {
    if (props.location?.search) {
      const queryParams = qs.parse(props.location.search);

      if (queryParams[API.queryParameters.schema.schema]) {
        const finalSchema = updateStateShex(queryParams, shex) || shex;
        setShEx(finalSchema);

        const newParams = mkParams(finalSchema);

        setParams(newParams);
        setLastParams(newParams);
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
        postRequest();
      } else {
        setError(API.texts.noProvidedSchema);
      }
    }
  }, [params]);

  function mkParams(pShex = shex) {
    return {
      ...paramsFromStateShex(pShex),
    };
  }

  async function mkServerParams(pShex = shex) {
    return {
      [API.queryParameters.schema.schema]: await mkShexServerParams(pShex),
    };
  }

  async function postRequest() {
    setLoading(true);
    setProgressPercent(20);

    try {
      const baseParams = await mkServerParams();
      setProgressPercent(40);
      // Firstly: get the schema basic info and prefix map
      const { data: resultSchemaInfo } = await axios.post(urlInfo, baseParams);
      setProgressPercent(50);

      // Secondly: get schema visualization
      const visualizeParams = {
        ...baseParams,
        [API.queryParameters.targetFormat]: API.formats.svg,
      };
      const { data: resultSchemaVisualize } = await axios.post(
        urlVisual,
        visualizeParams
      );
      setProgressPercent(80);

      // Set result with all data
      setResult({
        resultInfo: resultSchemaInfo,
        resultVisualize: resultSchemaVisualize,
      });

      // Set permalinks and finish
      setPermalink(
        mkPermalinkLong(API.routes.client.shexInfoRoute, params, true)
      );
      checkLinks();
    } catch (error) {
      setError(mkError(error, urlInfo));
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
        ? API.sources.byText
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
        mkPermalinkLong(API.routes.client.shexInfoRoute, lastParams)
      );
    }
    // Change current url for shareable links
    history.replace(mkPermalinkLong(API.routes.client.shexInfoRoute, params));

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
          title={API.texts.pageHeaders.shexInfo}
          details={API.texts.pageExplanations.shexInfo}
        />
      </Row>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="shex-info-tab"
        className="mb-3"
      >
        <Tab eventKey="shexEditor" title="ShEx editor">
          <ShexInfoForm
            shex={shex}
            setShEx={setShEx}
            loading={loading}
            setParams={setParams}
            mkParams={mkParams}
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
            notRenderedYetMessage={API.texts.schemaInfoWillAppearHere}
            resultComponent={(
              <ResultSchemaInfo
                result={result}
                params={params}
                schemaEngine={API.engines.shex}
                permalink={permalink}
                disabled={disabledLinks}
              />
            )}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ShexInfo;
