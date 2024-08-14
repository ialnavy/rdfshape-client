import React from "react";
import {ReadyState} from "react-use-websocket";

// RDFShape commons
import API from "../../API";
import ResultValidateShex from "../../results/ResultValidateShex";
import ResultValidateStream from "../../results/ResultValidateStream";

function ShExValidateResult(props) {
    if (props.results.length &&
        !props.streamValidationError &&
        !props.streamValidationInProgress) {
        return (
        <ResultValidateShex
            result={props.results[0]}
            permalink={props.permalink}
            disabled={props.disabledLinks}
        />
        );
    }

    return (
    <ResultValidateStream
        results={props.results}
        error={props.streamValidationError}
        config={props.serverParams}
        paused={props.streamValidationPaused}
        setPaused={(v) => {
          // Only pause validations if the connection had time to open
          if (
            [
              API.wsStatuses[ReadyState.CONNECTING],
              API.wsStatuses[ReadyState.OPEN],
            ].includes(props.connectionStatus)
          )
          props.setStreamValidationPaused(v);
        }}
        clearItems={() => props.setResults([])}
        permalink={props.permalink}
        disabled={props.disabledLinks}
    />
    );
}

export default ShExValidateResult;