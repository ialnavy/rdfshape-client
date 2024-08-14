import React from "react";

// React Bootstrap components
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";

function ShExResult (props) {
    if (!props.loading && !props.result && !props.error && !props.permalink) {
        // Result is not yet rendered
        return (<Alert variant="info">{props.notRenderedYetMessage}</Alert>);
    } else if (props.loading) {
        // Render loading in progress
        return (<ProgressBar striped animated variant="info" now={props.progressPercent} />);
    } else if (props.error) {
        // Render result, which is an error
        return (<Alert variant="danger">{props.error}</Alert>);
    } else if (props.result) {
        // Render correct result
        return props.resultComponent;
    } else {
        // Unexpected result
        return null;
    }
}

export default ShExResult;