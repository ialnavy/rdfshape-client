import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import API from "../../API";


function DataInfoForm(props) {

  return (<Form onSubmit={props.handleSubmit}>
    {props.dataTabs}
    <hr />
    <Button
      id="submit"
      variant="primary"
      type="submit"
      className={"btn-with-icon " + (props.loading ? "disabled" : "")}
      disabled={props.loading}
    >
      {API.texts.actionButtons.analyze}
    </Button>
  </Form>);
};

export default DataInfoForm;
