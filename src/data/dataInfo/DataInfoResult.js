import React, { Fragment } from "react";

import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";

import API from "../../API";
import ResultDataInfo from "../../results/ResultDataInfo";


function DataInfoResult(props) {

  if (props.loading) {
    return (<ProgressBar
      striped
      animated
      variant="info"
      now={props.progressPercent}
    />);

  } else if (props.result) {
    return (<ResultDataInfo
      result={props.result}
      params={props.params}
      permalink={props.permalink}
      disabled={props.disabledLinks}
      progressPercent={props.progressPercent}
    />);

  } else if (props.error) {
    return (<Alert variant="danger">{props.error}</Alert>);

  } else if (!props.loading && !props.result && !props.error && !props.permalink) {
    return (<Alert variant="info">{API.texts.dataInfoWillAppearHere}</Alert>);
  
  } else return null;
};

export default DataInfoResult;
