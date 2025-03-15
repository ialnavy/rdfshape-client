import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CirclePicker } from "react-color";
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
  ZoomInIcon,
  ZoomOutIcon
} from "react-open-iconic-svg";
import CogIcon from "react-open-iconic-svg/dist/CogIcon";
import DataTransferDownloadIcon from "react-open-iconic-svg/dist/DataTransferDownloadIcon";
import ExternalLinkIcon from "react-open-iconic-svg/dist/ExternalLinkIcon";
import TargetIcon from "react-open-iconic-svg/dist/TargetIcon";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {
  cytoscapeDefaultNodeColor,
  layouts
} from "../utils/cytoscape/cytoUtils";
import {
  capitalize,
  visualizationMaxZoom,
  visualizationMinZoom
} from "../domain/utils/Utils";
import { visualizationTypes } from "./ShowVisualization";

// App Context
// Strings externalisation
import { useLocaleStrings } from "../containers/StringsContext";

interface VisualizationLinksProps {
  embedLink?: string | boolean;
  disabled?: string | boolean;
  generateDownloadLink: () => { link: string; type?: string };
  styles?: React.CSSProperties;
  type: string;
  tooltips?: boolean;
  controls?: boolean;
  zoomControls?: [number, React.Dispatch<React.SetStateAction<number>>];
  fullscreenControls?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  layoutControls?: [any, React.Dispatch<React.SetStateAction<any>>];
  styleControls?: [any, React.Dispatch<React.SetStateAction<any>>];
  cytoscape?: any;
}

const VisualizationLinks: React.FC<VisualizationLinksProps> = ({
  embedLink,
  disabled,
  generateDownloadLink,
  styles,
  type,
  tooltips = true,
  controls = false,
  zoomControls,
  fullscreenControls,
  layoutControls,
  styleControls,
  cytoscape,
}) => {
  const [zoom, setZoom] = zoomControls || [1, () => {}];
  const [fullscreen, setFullscreen] = fullscreenControls || [false, () => {}];
  const [layout, setLayout] = layoutControls || [null, () => {}];
  const [cytoStyle, setCytoStyle] = styleControls || [[], () => {}];

  const [cytoNodeColor, setCytoNodeColor] = useState(cytoscapeDefaultNodeColor);
  const [downloadLink, setDownloadLink] = useState(generateDownloadLink());

  const { getString } = useLocaleStrings();

  useEffect(() => {
    setCytoStyle([
      {
        selector: "node",
        style: {
          "background-color": cytoNodeColor,
        },
      },
    ]);
  }, [cytoNodeColor, setCytoStyle]);

  const tooltipSettings = {
    delayShow: 1000,
    place: "left",
    effect: "solid",
  };

  return (
    <div className={`visualization-links ${fullscreen && ""}`} style={styles}>
      <div id="download-controls" className="controls-group">
        {downloadLink && (
          <div className="embedded-icon">
            <a
              id="downloadLink"
              href={downloadLink.link}
              download={`visualization${downloadLink.type ? `.${downloadLink.type}` : ""}`}
            >
              <Button
                onMouseEnter={() => setDownloadLink(generateDownloadLink())}
                className="btn-controls"
                variant="secondary"
                data-tip
                data-for="downloadLinkTip"
              >
                <DataTransferDownloadIcon className="white-icon" />
              </Button>
            </a>

            {tooltips && (
              <ReactTooltip id="downloadLinkTip" {...tooltipSettings} place="left">
                {getString("texts.visualizationSettings.download")}
              </ReactTooltip>
            )}
          </div>
        )}
        {embedLink && (
          <div data-tip data-for="embedLinkTip" className="embedded-icon">
            <a
              target="_blank"
              href={disabled ? undefined : (embedLink as string)}
              className={disabled ? "disabled" : ""}
            >
              <Button className="btn-controls" variant="secondary">
                <ExternalLinkIcon className="white-icon" />
              </Button>
            </a>

            {tooltips && (
              <ReactTooltip id="embedLinkTip" {...tooltipSettings} place="left">
                {disabled === getString("sources.byText")
                  ? getString("texts.noPermalinkManual")
                  : disabled === getString("sources.byFile")
                  ? getString("texts.noPermalinkFile")
                  : getString("texts.visualizationSettings.embedLink")}
              </ReactTooltip>
            )}
          </div>
        )}
      </div>

      {controls && (
        <div id="scale-controls" className="controls-group">
          {fullscreenControls && (
            <>
              <Button
                onClick={() => setFullscreen(!fullscreen)}
                className="btn-controls"
                variant="secondary"
                data-tip
                data-for="fullscreenTip"
              >
                {fullscreen ? (
                  <FullscreenExitIcon className="white-icon" />
                ) : (
                  <FullscreenEnterIcon className="white-icon" />
                )}
              </Button>
              {tooltips && (
                <ReactTooltip id="fullscreenTip" {...tooltipSettings} place="left">
                  {fullscreen
                    ? getString("texts.visualizationSettings.fullscreenOut")
                    : getString("texts.visualizationSettings.fullscreenIn")}
                </ReactTooltip>
              )}
              {type === visualizationTypes.cytoscape && (
                <>
                  <Button
                    onClick={() => cytoscape.fit()}
                    className="btn-controls"
                    variant="secondary"
                    data-tip
                    data-for="centerTip"
                  >
                    <TargetIcon className="white-icon" />
                  </Button>
                  {tooltips && (
                    <ReactTooltip id="centerTip" {...tooltipSettings} place="left">
                      { getString("texts.visualizationSettings.center") }
                    </ReactTooltip>
                  )}
                </>
              )}
            </>
          )}
          {zoomControls &&
            type !== visualizationTypes.cytoscape &&
            type !== visualizationTypes.threeD && (
              <>
                <Button
                  onClick={() => setZoom(zoom - 1)}
                  className="btn-controls"
                  variant="secondary"
                  disabled={zoom <= visualizationMinZoom}
                >
                  <ZoomOutIcon className="white-icon" />
                </Button>
                <Button
                  onClick={() => setZoom(zoom + 1)}
                  style={{ marginLeft: "1px" }}
                  className="btn-controls"
                  variant="secondary"
                  disabled={zoom >= visualizationMaxZoom}
                >
                  <ZoomInIcon className="white-icon" />
                </Button>
              </>
            )}
        </div>
      )}
      {controls && type === visualizationTypes.cytoscape && (
        <div id="cytoscape-controls" className="controls-group">
          {layoutControls && (
            <>
              <Button
                className="btn-controls"
                variant="secondary"
                data-tip
                data-for="layout-picker-container"
              >
                <CogIcon className="white-icon" />
              </Button>
              <ReactTooltip
                clickable={true}
                openEvents={{ "mouseenter": true, "click": true }}
                closeEvents={{ "mouseleave": true }}
                globalCloseEvents={{ clickOutsideAnchor: true }}
                delayHide={150}
                id="layout-picker-container"
                className="layout-picker-container dark"
                place="left"
                style={{ border: "solid" }}
              >
                <Form>
                  <Form.Group
                    controlId="layout"
                    className="layout-picker-container"
                  >
                    {layouts.map((itLayout: { name: string; uiName?: string }) => (
                      <div key={itLayout.name}>
                      <Form.Check
                        type="radio"
                        name="layout"
                        value={itLayout.name}
                        label={capitalize(itLayout.uiName || itLayout.name)}
                        onChange={() => setLayout(itLayout)}
                        checked={layout === itLayout}
                      />
                      </div>
                    ))}
                  </Form.Group>
                </Form>
              </ReactTooltip>
            </>
          )}
          {styleControls && (
            <>
              <button
                className="btn-controls btn-color-picker"
                style={{
                  backgroundColor: cytoNodeColor,
                  boxShadow: `${cytoNodeColor} 0 0 5px`,
                }}
                data-tip
                data-for="color-picker-container"
              ></button>
              <ReactTooltip
                clickable={true}
                openEvents={{ "mouseenter": true, "click": true }}
                closeEvents={{ "mouseleave": true }}
                globalCloseEvents={{ clickOutsideAnchor: true }}
                delayHide={150}
                id="color-picker-container"
                className="color-picker-container dark"
                place="left"
                style={{ border: "solid" }}
              >
                <CirclePicker
                  className="color-picker"
                  onChangeComplete={({ hex }) => setCytoNodeColor(hex)}
                />
              </ReactTooltip>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualizationLinks;
