import React, {useState} from "react";

// React Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// RDFShape commons
import API from "../../API";
import {mkDataTabs} from "../../data/Data";
import {mkShexTabs} from "../Shex";
import {mkShapeMapTabs} from "../../shapeMap/ShapeMap";

function ShExValidateForm(props) {
    const [innerKey, setInnerKey] = useState("rdfEditor");

    function handleSubmit(event) {
        event.preventDefault();
        props.setOuterKey("result");
        props.setParams(props.mkParams());
    }

    return (
    <Form onSubmit={handleSubmit}>
        <Tabs
            activeKey={innerKey}
            onSelect={(k) => setInnerKey(k)}
            id="shex-validate-tab"
            className="mb-3"
        >
            <Tab eventKey="rdfEditor" title="RDF editor">
            {mkDataTabs(props.data, props.setData, {
                allowStream: true,
                streamData: props.streamData,
                setStreamData: props.setStreamData,
                currentTabStore: props.currentTab,
                setCurrentTabStore: props.setCurrentTab,
            })}
            </Tab>
            <Tab eventKey="shexEditor" title="ShEx editor">
            {mkShexTabs(props.shex, props.setShEx)}
            </Tab>
            <Tab eventKey="shapeMapEditor" title="ShapeMap editor">
            {mkShapeMapTabs(props.shapeMap, props.setShapeMap)}
            </Tab>
        </Tabs>
        <Button
            variant="primary"
            type="submit"
            className={
                "btn-with-icon " +
                (props.loading ||
                (props.streamValidationInProgress && !props.streamValidationPaused)
                ? "disabled"
                : "")
            }
            // Disabled the validation button as usual and
            // when a stream validation is running un-paused
            disabled={
                props.loading ||
                (props.streamValidationInProgress && !props.streamValidationPaused)
            }
            >
            {API.texts.actionButtons.validate}
        </Button>
    </Form>
    );
}

export default ShExValidateForm;