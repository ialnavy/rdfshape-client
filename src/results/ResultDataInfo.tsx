import React, { Fragment, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../API';
import { mkEmbedLink, Permalink } from '../Permalink';
import PrintJson from '../utils/PrintJson';
import { prefixMapTableColumns, scrollToResults } from '../utils/Utils';
import ShowVisualization, { visualizationTypes } from '../visualization/ShowVisualization';

// Definición de las interfaces para las propiedades
interface ResultInfo {
  message: string;
  result: {
    numberOfStatements: number;
    prefixMap: any[];
    format: {
      name: string;
    };
  };
}

interface ResultDot {
  visualization: {
    data: any;
  };
}

interface ResultCyto {
  elements: any[];
}

export interface IResult {
  resultInfo: ResultInfo;
  resultDot: ResultDot;
  resultCyto: ResultCyto;
}

interface ResultDataInfoProps {
  result: IResult;
  params: any;
  permalink?: string;
  disabled?: string;
}



// Compendio de resumen de datos, mapa de prefijos y visualizaciones
const ResultDataInfo: React.FC<ResultDataInfoProps> = ({
  result: { resultInfo, resultDot, resultCyto },
  params: stateDataParams,
  permalink,
  disabled = "",
}) => {
  // Control de pestañas activas
  const [resultTab, setResultTab] = useState(API.tabs.overview);
  const [visualTab, setVisualTab] = useState(API.tabs.visualizationDot);

  // Desestructuración de los elementos de la respuesta para su uso posterior
  const {
    message: messageInfo,
    result: {
      numberOfStatements,
      prefixMap,
      format: { name: formatName },
    },
  } = resultInfo;

  const { visualization: dotVisualization } = resultDot;
  const { elements: cytoElements } = resultCyto;

  const [cytoVisual, setCytoVisual] = useState<JSX.Element | null>(null);

  useEffect(scrollToResults, []);

  // Renderizar forzosamente el cyto al entrar en la pestaña para obtener dimensiones precisas
  function renderCytoVisual() {
    setCytoVisual(
      <ShowVisualization
        data={{ elements: cytoElements }}
        type={visualizationTypes.cytoscape}
        raw={false}
        controls={true}
        embedLink={mkEmbedLink(stateDataParams, {
          visualizationType: API.queryParameters.visualization.types.data,
          visualizationTarget: API.queryParameters.visualization.targets.cyto,
        })}
      />
    );
  }

  const handleResultTab = (eventKey: string | null) => {
    if (eventKey !== null) {
      setResultTab(eventKey);
    }
  };

  const handleVisualTab = (eventKey: string | null) => {
    if (eventKey !== null) {
      setVisualTab(eventKey);
    }
  };

  if (resultInfo) {
    return (
      <>
        <div id={API.resultsId}>
          <Tabs activeKey={resultTab} id="resultTabs" onSelect={handleResultTab}>
            {/* Resumen de datos */}
            <Tab eventKey={API.tabs.overview} title={API.texts.resultTabs.overview}>
              <div className="marginTop">
                <ul>
                  <li>{messageInfo}</li>
                  <li>
                    {API.texts.numberOfStatements}: {numberOfStatements}
                  </li>
                  <li>
                    {API.texts.dataFormat}: <span className="code">{formatName}</span>
                  </li>
                </ul>
              </div>
            </Tab>

            {/* Mapa de prefijos de datos */}
            {prefixMap && (
              <Tab eventKey={API.tabs.prefixMap} title={API.texts.resultTabs.prefixMap}>
                <div className="prefixMapTable marginTop">
                  <BootstrapTable
                    keyField="prefixName"
                    data={prefixMap}
                    columns={prefixMapTableColumns}
                    noDataIndication={API.texts.noPrefixes}
                  ></BootstrapTable>
                </div>
              </Tab>
            )}

            {/* Visualizaciones de datos */}
            <Tab eventKey={API.tabs.visualizations} title={API.texts.resultTabs.visualizations} mountOnEnter={true}>
              {(resultCyto || resultDot) && (
                <Tabs activeKey={visualTab} id="visualTabs" onSelect={handleVisualTab}>
                  {resultDot && (
                    <Tab eventKey={API.tabs.visualizationDot} title={API.texts.resultTabs.visualizationDot}>
                      <ShowVisualization
                        data={dotVisualization.data}
                        type={visualizationTypes.svgObject}
                        raw={false}
                        controls={true}
                        embedLink={mkEmbedLink(stateDataParams, {
                          visualizationType: API.queryParameters.visualization.types.data,
                          visualizationTarget: API.queryParameters.visualization.targets.svg,
                        })}
                      />
                    </Tab>
                  )}
                  {resultCyto && (
                    <Tab eventKey={API.tabs.visualizationCyto} title={API.texts.resultTabs.visualizationCyto} onEnter={renderCytoVisual}>
                      {cytoVisual}
                    </Tab>
                  )}
                </Tabs>
              )}
            </Tab>
          </Tabs>
        </div>

        <br />

        <details>
          <summary>{API.texts.responseSummaryText}</summary>
          <PrintJson json={resultInfo} />
        </details>
        {permalink && (
          <Fragment>
            <hr />
            <Permalink url={permalink} disabled={disabled} />
          </Fragment>
        )}
      </>
    );
  }

  return null;
};

export default ResultDataInfo;
