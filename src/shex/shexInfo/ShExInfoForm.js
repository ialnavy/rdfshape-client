import React from "react";

// React Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// RDFShape API
import API from "../../API";

// RDFShape commons
import {mkShexTabs} from "../Shex";

function ShexInfoForm (props) {

    function handleSubmit(event) {
        event.preventDefault();
        props.setKey("result");
        props.setParams(props.mkParams());
    }

    return (
    <Form onSubmit={handleSubmit}>
        {mkShexTabs(props.shex, props.setShEx)}
        <hr />
        <Button
            variant="primary"
            type="submit"
            className={"btn-with-icon " + (props.loading ? "disabled" : "")}
            disabled={props.loading}
        >
            {API.texts.actionButtons.analyze}
        </Button>
    </Form>
    );
}

export default ShexInfoForm;