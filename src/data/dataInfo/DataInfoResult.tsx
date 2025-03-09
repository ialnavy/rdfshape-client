import React, { Fragment } from 'react';

import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import API from "../../API";
import ResultDataInfo, { IResult } from "../../results/ResultDataInfo";
import { ResponseErrorProps } from "../../utils/ResponseError";


interface IDataInfoResult {
  isLoading: boolean;
  result: IResult | null;
  error: ResponseErrorProps | null;
  permalink: string | null;
  progressPercent: number;
  params: any;
  disabledLinks: string | null;
}

const DataInfoResult: React.FC<IDataInfoResult> = ({
  isLoading, result, error, permalink, progressPercent, params, disabledLinks
}) => {
  return (
    (isLoading || !!result || !!error || !!permalink) ? (
      <Fragment>
        <Col className={"half-col"}>
          {isLoading ? (
            <ProgressBar
              striped
              animated
              variant="info"
              now={progressPercent}
            />
          ) : !!error ? (
            <Alert variant="danger">{!!error}</Alert>
          ) : (result !== null) ? (
            <ResultDataInfo
              result={result}
              params={params}
              permalink={permalink ?? ""}
              disabled={disabledLinks ?? ""}
            />
          ) : null}
        </Col>
      </Fragment>
    ) : (
      <Col className={"half-col"}>
        <Alert variant="info">{API.texts.dataInfoWillAppearHere}</Alert>
      </Col>
    )
  );
};

export default DataInfoResult;