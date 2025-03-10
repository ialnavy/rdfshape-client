import React, { Fragment, useContext, useEffect, useState, JSX } from "react";
import { useNavigate } from "react-router-dom";

// React Bootstrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import qs from "query-string";
import axios from "../../../domain/utils/axiosConfig";

// App Context
import { ApplicationContext } from "../../containers/ApplicationContext";
// Strings externalisation
import { useLocaleStrings } from "../../containers/StringsContext";

// Custom components
import PageHeader from "../PageHeader";
import DataInfoResult from "./DataInfoResult";

import ResponseError from "../miscellaneous/ResponseError";

// Domain logic
import { processDotData } from "../../../domain/utils/dotUtils";
import { getDataText, mkDataServerParams, mkDataTabs, paramsFromStateData, updateStateData } from "../../../domain/data/Data";
import { mkPermalinkLong } from "../../Permalink";


interface DataInfoProps {
  location: {
    search: string;
  };
}

const DataInfo: React.FC<DataInfoProps> = (props) => {
  // Recover user input data from context, if any. Use first item of the data array
  const appContext = useContext(ApplicationContext);

  const navigate = useNavigate();

  // Set initial data from context, if possible
  const [data, setData] = useState(appContext.rdfData[0]);

  const [result, setResult] = useState<any>(null);

  const [params, setParams] = useState<any>(null);
  const [lastParams, setLastParams] = useState<any>(null);

  const [error, setError] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [permalink, setPermalink] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const [disabledLinks, setDisabledLinks] = useState<string | null>(null);

  const { getString } = useLocaleStrings();
  let urlInfo = getString("routes.server.dataInfo");
  let urlVisual = getString("routes.server.dataConvert");

  // Try to autofill user data, first from the query string then from context
  useEffect(() => {
    if (props.location?.search) {
      const queryParams = qs.parse(props.location.search);
      if (queryParams[getString("queryParameters.data.data")]) {
        const finalData = {
          index: 0,
          ...(updateStateData(queryParams, data) || data),
        };
        setData(finalData);

        const params = mkParams(finalData);
        setParams(params);
        setLastParams(params);
      } else {
        setError(<ResponseError errorOrigin={urlInfo} errorMessage={getString("texts.errorParsingUrl")} />);
      }
    }
  }, [props.location?.search]);

  useEffect(() => {
    if (params && !loading) {
      if (
        params[getString("queryParameters.data.data")] &&
        (params[getString("queryParameters.data.source")] === getString("sources.byFile")
          ? params[getString("queryParameters.data.data")].name
          : true) // Extra check for files
      ) {
        resetState();
        setUpHistory();
        postDataInfo();
      } else {
        setError(<ResponseError errorOrigin={urlInfo} errorMessage={getString("texts.noProvidedRdf")} />);
      }
    }
  }, [params]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setParams(mkParams());
  }

  function mkParams(pData = data) {
    return { ...paramsFromStateData(pData) };
  }

  async function mkServerParams(pData = data) {
    return { [getString("queryParameters.data.data")]: await mkDataServerParams(pData) };
  }

  async function postDataInfo() {
    setLoading(true);
    setProgressPercent(20);

    const baseParams = await mkServerParams();
    try {
      // First: get data info with the data summary and prefix map
      const { data: resultInfo } = await axios.post(urlInfo, baseParams);
      setProgressPercent(40);

      // Second: get data visualizations...
      // ...first graphviz
      const graphvizParams = {
        ...baseParams,
        [getString("queryParameters.targetFormat")]: getString("formats.dot"),
      };

      const { data: resultDot } = await axios.post(urlVisual, graphvizParams);
      const dot = resultDot.result.content; // Get the DOT string from the axios data object
      const dotVisualization = await processDotData(dot, getString);

      setProgressPercent(60);

      // ...then cyto
      const cytoscapeParams = {
        ...baseParams,
        [getString("queryParameters.targetFormat")]: getString("formats.json"),
      };
      const { data: resultCyto } = await axios.post(urlVisual, cytoscapeParams);
      const cytoElements = JSON.parse(resultCyto.result.content);

      setProgressPercent(80);

      // Set result with all collected data
      setResult({
        resultInfo,
        resultDot: { ...resultDot, visualization: dotVisualization },
        resultCyto: { ...resultCyto, elements: cytoElements },
      });
      // Set permalinks and finish
      setPermalink(
        mkPermalinkLong(getString("routes.client.dataInfoRoute"), params, true)
      );
      checkLinks();
    } catch (error) {
      setError(<ResponseError errorOrigin={urlInfo} errorMessage={(new String(error)).toString()} />);
    } finally {
      setLoading(false);
    }
  }

  // Disabled permalinks, etc. if the user input is too long or a file
  function checkLinks() {
    const disabled =
      getDataText(data).length > Number(getString("limits.byTextCharacterLimit"))
        ? getString("sources.byText")
        : data.activeSource === getString("sources.byFile")
          ? getString("sources.byFile")
          : null;

    setDisabledLinks(disabled);
  }

  function setUpHistory() {
    // Store the last search URL in the browser history to allow going back
    if (
      params &&
      lastParams &&
      JSON.stringify(params) !== JSON.stringify(lastParams)
    ) {
      navigate(
        mkPermalinkLong(getString("routes.client.dataInfoRoute"), lastParams)
      );
    }
    // Change current url for shareable links
    navigate(mkPermalinkLong(getString("routes.client.dataInfoRoute"), params), { replace: true });

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
          title={getString("texts.pageHeaders.dataInfo")}
          details={getString("texts.pageExplanations.dataInfo")}
        />
      </Row>
      <Row>
        <Col className={"half-col border-right"}>
          <Form onSubmit={handleSubmit}>
            {mkDataTabs(data, setData)}
            <hr />
            <Button
              id="submit"
              variant="primary"
              type="submit"
              className={"btn-with-icon " + (loading ? "disabled" : "")}
              disabled={loading}
            >
              {getString("texts.actionButtons.analyze")}
            </Button>
          </Form>
        </Col>
        {loading || result || error || permalink ? (
          <Fragment>
            <Col className={"half-col"}>
              {loading ? (
                <ProgressBar
                  striped
                  animated
                  variant="info"
                  now={progressPercent}
                />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : result ? (
                <DataInfoResult
                  result={result}
                  params={params}
                  permalink={permalink}
                  disabled={disabledLinks}
                />
              ) : null}
            </Col>
          </Fragment>
        ) : (
          <Col className={"half-col"}>
            <Alert variant="info">{getString("texts.dataInfoWillAppearHere")}</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DataInfo;
