import React from "react";

// React Bootstrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// RDFShape API
import API from "../../API";

// RDFShape commons
import {mkShexTabs} from "../Shex";

// Reused custom components
import {
    allEngines,
    SelectEngine,
    shaclEngines
} from "../../components/SelectEngine";
import SelectFormat from "../../components/SelectFormat";

function ShExConvertForm(props) {

    function handleSubmit(event) {
        event.preventDefault();
        props.setKey("result");
        props.setParams(props.mkParams());
    }

    function getUrlFormats(targetSchemaEngine) {
        if (targetSchemaEngine === API.engines.shex)
            return API.routes.server.shExFormats;
        else if (shaclEngines.includes(targetSchemaEngine))
            return API.routes.server.shaclFormats;
        else
            return null;
    }

    function getExtraOptions(targetSchemaEngine) {
        if (targetSchemaEngine === API.engines.shapeForms)
            return [API.formats.htmlForm];
        else if (targetSchemaEngine === API.engines.shumlex)
            return [API.formats.xmi];
        else if (targetSchemaEngine === API.engines.tresdshex)
            return [API.formats.tresd]
        else
            return []
    }

    return (
    <Form onSubmit={handleSubmit}>
        {mkShexTabs(props.shex, props.setShex)}
        <hr />
        <Row>
          <Col className={"half-col border-right"}>
            {/* Choose target engine */}
            <SelectEngine
              name={API.texts.selectors.targetEngine}
              handleEngineChange={(newEngine) => {
                // Set new engine if present
                newEngine && props.setTargetSchemaEngine(newEngine);
              }}
              selectedEngine={props.targetSchemaEngine}
              fromParams={false}
              resetFromParams={false}
              extraOptions={allEngines} // Allow to choose any engines
            />
          </Col>
          <Col className={"half-col border-right"}>
            {/* Choose target format, depending on engine */}
            <SelectFormat
              name={API.texts.selectors.targetFormat}
              selectedFormat={props.targetSchemaFormat}
              handleFormatChange={props.handleTargetFormatChange}
              urlFormats={getUrlFormats(props.targetSchemaEngine)}
              // Additional target options if a client engine (shapeForms or shumlex is used)
              extraOptions={getExtraOptions(props.targetSchemaEngine)}
            />
          </Col>
        </Row>
        {/* Warning to use shape-start if using shapeforms */}
        {props.targetSchemaEngine === API.engines.shapeForms && (
          <Alert variant="warning">
            A <i>Shape Start</i> is required when using ShapeForms (
            <a href={API.routes.utils.shapeFormHelpUrl} target="_blank">
              learn more
            </a>
            )
          </Alert>
        )}
        <hr />
        <Button
          variant="primary"
          type="submit"
          className={"btn-with-icon " + (props.loading ? "disabled" : "")}
          disabled={props.loading}
        >
          {API.texts.actionButtons.convert}
        </Button>
      </Form>
    );
}

export default ShExConvertForm;