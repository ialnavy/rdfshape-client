import PropTypes from "prop-types";
import React from "react";

// App Context
// Strings externalisation
import { useLocaleStrings } from "../../containers/StringsContext";

// Aux component for showing server errors given the requested URL and message
interface ResponseErrorProps {
  errorOrigin: string;
  errorMessage?: string;
}

const ResponseError: React.FC<ResponseErrorProps> = ({ errorOrigin, errorMessage }) => {

  const { getString } = useLocaleStrings();

  return (
    <details>
      <summary>
        {`${getString("texts.errorResponsePrefix")} from ${errorOrigin}`}{" "}
      </summary>
      {errorMessage && (
        <>
          <hr />
          <p className="code alert-body">{errorMessage}</p>
        </>
      )}
    </details>
  );
};

ResponseError.propTypes = {
  errorOrigin: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ResponseError;
