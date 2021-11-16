import axios from "axios";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import API from "../API";
import SelectFormat from "../components/SelectFormat";
import { mkPermalinkLong, params2Form } from "../Permalink";
import ResultShacl2ShEx from "../results/ResultShacl2ShEx";
import { mkError } from "../utils/ResponseError";
import {
  getShaclText,
  InitialShacl,
  mkShaclTabs,
  paramsFromStateShacl,
  shaclParamsFromQueryParams,
  updateStateShacl,
} from "./SHACL";

export default function SHACL2ShEx(props) {
  const [shacl, setShacl] = useState(InitialShacl);
  const [targetFormat, setTargetFormat] = useState(API.formats.defaultShex);

  const [result, setResult] = useState("");

  const [params, setParams] = useState(null);
  const [lastParams, setLastParams] = useState(null);

  const [permalink, setPermalink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const [disabledLinks, setDisabledLinks] = useState(false);

  const url = API.routes.server.schemaConvert;

  useEffect(() => {
    if (props.location?.search) {
      const queryParams = qs.parse(props.location.search);
      let paramsShacl = {};

      if (
        queryParams.schema ||
        queryParams.schemaUrl ||
        queryParams.schemaFile
      ) {
        const schemaParams = shaclParamsFromQueryParams(queryParams);
        const finalSchema = updateStateShacl(schemaParams, shacl) || shacl;

        paramsShacl = finalSchema;
        setShacl(finalSchema);
      }

      if (queryParams.targetSchemaFormat)
        setTargetFormat(queryParams.targetSchemaFormat);

      let params = {
        ...mkServerParams(
          paramsShacl,
          queryParams.targetSchemaFormat || "TURTLE"
        ),
        // schemaEngine: "SHACLex",
        targetSchemaEngine: "ShEx",
      };

      setParams(params);
      setLastParams(params);
    }
  }, [props.location?.search]);

  useEffect(() => {
    if (params && !loading) {
      if (
        params.schema ||
        params.schemaUrl ||
        (params.schemaFile && params.schemaFile.name)
      ) {
        resetState();
        setUpHistory();
        postRequest();
      } else {
        setError("No SHACL schema provided");
      }
      window.scrollTo(0, 0);
    }
  }, [params]);

  function targetFormatMode(targetFormat) {
    switch (targetFormat.toUpperCase()) {
      case "TURTLE":
        return "turtle";
      case "RDF/XML":
        return "xml";
      case "TRIG":
        return "xml";
      case "JSON-LD":
        return "javascript";
      default:
        return "turtle";
    }
  }

  function mkServerParams(shacl, format) {
    const params = {
      ...paramsFromStateShacl(shacl),
      targetSchemaFormat: targetFormat,
    };
    // Change target format if needed
    if (format) {
      setTargetFormat(format);
      params.targetSchemaFormat = format;
    }
    return params;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setParams({
      ...mkServerParams(shacl),
      // schemaEngine: "SHACLex",
      targetSchemaEngine: "ShEx",
    });
  }

  function postRequest(cb) {
    setLoading(true);
    setProgressPercent(20);
    const formData = params2Form(params);

    axios
      .post(url, formData)
      .then((response) => response.data)
      .then(async (data) => {
        setProgressPercent(70);
        setResult(data);
        setPermalink(
          mkPermalinkLong(API.routes.client.shacl2ShExRoute, {
            schemaFormat: params.schemaFormat,
            targetSchemaFormat: params.targetSchemaFormat,
            schemaEngine: params.schemaEngine,
            schemaInference: params.schemaInference,
            schema: params.schema || undefined,
            schemaUrl: params.schemaUrl || undefined,
            schemaFile: params.schemaFile || undefined,
          })
        );
        checkLinks();
        setProgressPercent(90);
        if (cb) cb();
        setProgressPercent(100);
      })
      .catch(function(error) {
        setError(mkError(error, url));
      })
      .finally(() => setLoading(false));
  }

  // Disabled permalinks, etc. if the user input is too long or a file
  function checkLinks() {
    const disabled =
      getShaclText(shacl).length > API.limits.byTextCharacterLimit
        ? API.sources.byText
        : shacl.activeSource === API.sources.byFile
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
      // eslint-disable-next-line no-restricted-globals
      history.pushState(
        null,
        document.title,
        mkPermalinkLong(API.routes.client.shacl2ShExRoute, {
          schemaFormat: lastParams.schemaFormat,
          targetSchemaFormat: lastParams.targetSchemaFormat,
          schemaEngine: lastParams.schemaEngine,
          schemaInference: lastParams.schemaInference,
          schema: lastParams.schema || undefined,
          schemaUrl: lastParams.schemaUrl || undefined,
          schemaFile: lastParams.schemaFile || undefined,
        })
      );
    }
    // Change current url for shareable links
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(
      null,
      document.title,
      mkPermalinkLong(API.routes.client.shacl2ShExRoute, {
        schemaFormat: params.schemaFormat,
        targetSchemaFormat: params.targetSchemaFormat,
        schemaEngine: params.schemaEngine,
        schemaInference: params.schemaInference,
        schema: params.schema || undefined,
        schemaUrl: params.schemaUrl || undefined,
        schemaFile: params.schemaFile || undefined,
      })
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
        <h1>Convert SHACL to ShEx</h1>
      </Row>
      <Row>
        <Col className={"half-col border-right"}>
          <Form onSubmit={handleSubmit}>
            {mkShaclTabs(shacl, setShacl, "SHACL Input")}
            <hr />
            <SelectFormat
              name="ShEx format"
              defaultFormat="TURTLE"
              selectedFormat={targetFormat}
              handleFormatChange={(value) => setTargetFormat(value)}
              urlFormats={API.routes.server.shExFormats}
            />

            <hr />
            <Button
              variant="primary"
              type="submit"
              className={"btn-with-icon " + (loading ? "disabled" : "")}
              disabled={loading}
            >
              Convert to ShEx
            </Button>
          </Form>
        </Col>
        {loading || result || error || permalink ? (
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
              <ResultShacl2ShEx
                result={result}
                mode={targetFormatMode(targetFormat)}
                permalink={permalink}
                disabled={disabledLinks}
              />
            ) : null}
          </Col>
        ) : (
          <Col className={"half-col"}>
            <Alert variant="info">Conversion results will appear here</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}
