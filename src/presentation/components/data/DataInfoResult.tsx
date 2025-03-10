import React, { Fragment, useEffect, useState, JSX } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BootstrapTable from "fad-react-bootstrap-table-next";
import { mkEmbedLink, Permalink } from "../../Permalink";
import PrintJson from "../miscellaneous/PrintJson";
import { prefixMapTableColumns, scrollToResults } from "../../../domain/utils/Utils";
import ShowVisualization, {
  visualizationTypes
} from "../../../visualization/ShowVisualization";

// App Context
// Strings externalisation
import { useLocaleStrings } from "../../containers/StringsContext";


interface DataInfoResultProps {
  result: {
    resultInfo: {
      message: string;
      result: {
        numberOfStatements: number;
        prefixMap: any[];
        format: {
          name: string;
        };
      };
    };
    resultDot: {
      visualization: any;
    };
    resultCyto: {
      elements: any;
    };
  };
  params: any;
  permalink: string | null;
  disabled: string | null;
}

// Compendium of data overview, prefix map and visualizations
const DataInfoResult: React.FC<DataInfoResultProps> = ({
  result: { resultInfo, resultDot, resultCyto }, // Request successful response
  params: stateDataParams,
  permalink,
  disabled = null,
}) => {
  const { getString } = useLocaleStrings();

  // Active tab control
  const [resultTab, setResultTab] = useState(getString("tabs.overview"));
  const [visualTab, setVisualTab] = useState(getString("tabs.visualizationDot"));

  // Destructure response items for later usage
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

  // Forcibly render the cyto when entering the tab for accurate dimensions
  function renderCytoVisual() {
    setCytoVisual(
      <ShowVisualization
        data={{ elements: cytoElements }}
        type={visualizationTypes.cytoscape}
        raw={false}
        controls={true}
        embedLink={mkEmbedLink(stateDataParams, {
          visualizationType: getString("queryParameters.visualization.types.data"),
          visualizationTarget: getString("queryParameters.visualization.targets.cyto")
        })}
      />
    );
  }

  if (resultInfo) {
    return (
      <>
        <div id={getString("resultsId")}>
          <Tabs activeKey={resultTab} id="resultTabs" onSelect={(k) => setResultTab(k || getString("tabs.overview"))}>
            {/* Data overview */}
            <Tab
              eventKey={getString("tabs.overview")}
              title={getString("texts.resultTabs.overview")}
            >
              <div className="marginTop">
                <ul>
                  <li>{messageInfo}</li>
                  <li>
                    {getString("texts.numberOfStatements")}: {numberOfStatements}
                  </li>
                  <li>
                    {getString("texts.dataFormat")}:{" "}
                    <span className="code">{formatName}</span>
                  </li>
                </ul>
              </div>
            </Tab>

            {/* Data prefix map */}
            {prefixMap && (
              <Tab
                eventKey={getString("tabs.prefixMap")}
                title={getString("texts.resultTabs.prefixMap")}
              >
                <div className="prefixMapTable marginTop">
                  <BootstrapTable
                    keyField="prefixName"
                    data={prefixMap}
                    columns={prefixMapTableColumns}
                    noDataIndication={getString("texts.noPrefixes")}
                  ></BootstrapTable>
                </div>
              </Tab>
            )}

            {/* Data visualizations */}
            <Tab
              eventKey={getString("tabs.visualizations")}
              title={getString("texts.resultTabs.visualizations")}
              mountOnEnter={true}
            >
              {(resultCyto || resultDot) && (
                <Tabs
                  activeKey={visualTab}
                  id="visualTabs"
                  onSelect={(k) => setVisualTab(k || getString("tabs.visualizationDot"))}
                >
                  {resultDot && (
                    <Tab
                      eventKey={getString("tabs.visualizationDot")}
                      title={getString("texts.resultTabs.visualizationDot")}
                    >
                      <ShowVisualization
                        data={dotVisualization.data}
                        type={visualizationTypes.svgObject}
                        raw={false}
                        controls={true}
                        embedLink={mkEmbedLink(stateDataParams, {
                          visualizationType:
                            getString("queryParameters.visualization.types.data"),
                          visualizationTarget:
                            getString("queryParameters.visualization.targets.svg")
                        })}
                      />
                    </Tab>
                  )}
                  {resultCyto && (
                    <Tab
                      eventKey={getString("tabs.visualizationCyto")}
                      title={getString("texts.resultTabs.visualizationCyto")}
                      onEnter={renderCytoVisual}
                    >
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
          <summary>{getString("texts.responseSummaryText")}</summary>
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


export default DataInfoResult;
