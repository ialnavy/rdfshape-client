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
import ResultShEx2Shacl from "../results/ResultShEx2Shacl";
import { mkError } from "../utils/ResponseError";
import {
  convertSourceSchema,
  getShexText,
  InitialShEx,
  mkShExTabs,
  shExParamsFromQueryParams,
  updateStateShEx,
} from "./ShEx";

export default function ShEx2Shacl(props) {
  const [shex, setShEx] = useState(InitialShEx);
  const [targetFormat, setTargetFormat] = useState(API.defaultSHACLFormat);

  const [result, setResult] = useState("");

  const [params, setParams] = useState(null);
  const [lastParams, setLastParams] = useState(null);

  const [permalink, setPermalink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const [disabledLinks, setDisabledLinks] = useState(false);

  const url = API.schemaConvert;

  useEffect(() => {
    if (props.location?.search) {
      const queryParams = qs.parse(props.location.search);
      let paramsShEx = {};

      if (
        queryParams.schema ||
        queryParams.schemaUrl ||
        queryParams.schemaFile
      ) {
        const schemaParams = shExParamsFromQueryParams(queryParams);
        const finalSchema = updateStateShEx(schemaParams, shex) || shex;

        paramsShEx = finalSchema;
        setShEx(finalSchema);
      }

      if (queryParams.targetSchemaFormat)
        setTargetFormat(queryParams.targetSchemaFormat);

      const params = {
        ...mkServerParams(
          paramsShEx,
          queryParams.targetSchemaFormat || "TURTLE"
        ),
        schemaEngine: "ShEx",
        targetSchemaEngine: "SHACL",
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
        setError("No ShEx schema provided");
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

  function mkServerParams(shex, format) {
    let params = {};
    params["activeSchemaSource"] = convertSourceSchema(shex.activeSource);
    params["schemaFormat"] = shex.format;
    switch (shex.activeSource) {
      case API.byTextSource:
        params["schema"] = shex.textArea;
        break;
      case API.byUrlSource:
        params["schemaUrl"] = shex.url;
        break;
      case API.byFileSource:
        params["schemaFile"] = shex.file;
        break;
      default:
    }

    if (format) {
      setTargetFormat(format);
      params["targetSchemaFormat"] = format;
    } else params["targetSchemaFormat"] = targetFormat;
    return params;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setParams({
      ...mkServerParams(shex),
      schemaEngine: "ShEx",
      targetSchemaEngine: "SHACL",
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
          mkPermalinkLong(API.shEx2ShaclRoute, {
            schemaFormat: params.schemaFormat,
            targetSchemaFormat: params.targetSchemaFormat,
            schema: params.schema || undefined,
            schemaUrl: params.schemaUrl || undefined,
            schemaFile: params.schemaFile || undefined,
          })
        );
        setProgressPercent(90);
        checkLinks();
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
      getShexText(shex).length > API.byTextCharacterLimit
        ? API.byTextSource
        : shex.activeSource === API.byFileSource
        ? API.byFileSource
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
        mkPermalinkLong(API.shEx2ShaclRoute, {
          schemaFormat: lastParams.schemaFormat,
          targetSchemaFormat: lastParams.targetSchemaFormat,
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
      mkPermalinkLong(API.shEx2ShaclRoute, {
        schemaFormat: params.schemaFormat,
        targetSchemaFormat: params.targetSchemaFormat,
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
        <h1>Convert ShEx to SHACL</h1>
      </Row>
      <Row>
        <Col className={"half-col border-right"}>
          <Form onSubmit={handleSubmit}>
            {mkShExTabs(shex, setShEx, "ShEx Input")}
            <hr />
            <SelectFormat
              name="SHACL format"
              defaultFormat="TURTLE"
              selectedFormat={targetFormat}
              handleFormatChange={(value) => setTargetFormat(value)}
              urlFormats={API.shaclFormats}
            />

            <hr />
            <Button
              variant="primary"
              type="submit"
              className={"btn-with-icon " + (loading ? "disabled" : "")}
              disabled={loading}
            >
              Convert to SHACL
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
              <ResultShEx2Shacl
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
