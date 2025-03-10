import React, { useState, CSSProperties, ReactNode } from "react";

// App Dependencies
import FormData from "form-data";
import PropTypes from "prop-types";
import qs from "query-string";

// React Bootstrap and Toastify components
import { Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// App Context
// Strings externalisation
import { useLocaleStrings } from "./containers/StringsContext";

import axios from "../domain/utils/axiosConfig";
import { notificationSettings } from "../domain/utils/Utils";

// Returns a promise that will return a shortened permalink generated on the server
// or the full-length permalink if the server response fails
export async function mkPermalink(route: string, params: Record<string, any>, getString = ((textId : string) => { return textId; })): Promise<string> {
  const url = mkPermalinkLong(route, params, true);
  return await mkPermalinkFromUrl(url, getString);
}

export async function mkPermalinkFromUrl(url: string, getString = ((textId : string) => { return textId; })): Promise<string> {
  try {
    const { data: permalinkCode } = await axios.get(
      getString("routes.server.serverPermalinkEndpoint"),
      {
        params: { url },
      }
    );
    // The server only returns the permalink code. The full link is: current host + code
    return `${getHost()}/link/${permalinkCode}`;
  } catch (err) {
    console.error(
      `Error processing shortened permalink request for ${url}: ${(err as any)?.message}`
    );
    // Return the original URL in case of error
    return url;
  }
}

// By default, does not include host and starts from the URL route "/"
export function mkPermalinkLong(route: string, params: Record<string, any>, includeHost = false): string {
  return (includeHost ? getHost() : "") + route + "?" + qs.stringify(params);
}

// Shorthand for creating embed links
// Receive the params (with data, shex...) from used in the state of the component
// and an object with the options, i.e.: the visualization type (data, uml...) and target (svg, cytoscape...)
export function mkEmbedLink(
  params: Record<string, any>,
  { visualizationType, visualizationTarget }: { visualizationType: string, visualizationTarget: string },
  getString = ((textId : string) => { return textId; })
): string {
  return (
    getHost() +
    getString("routes.client.visualizeRawRoute") +
    "?" +
    qs.stringify({
      ...params,
      [getString("queryParameters.visualization.type")]: visualizationType,
      [getString("queryParameters.visualization.target")]: visualizationTarget,
    })
  );
}

export function params2Form(params: Record<string, any>): FormData {
  let formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
}

function getHost(): string {
  const port = window.location.port;
  return (
    window.location.protocol +
    "//" +
    window.location.hostname +
    (port ? ":" + port : "")
  );
}

// Returns a tuple [status, message], the message being the target link or an error in case of failure
export async function getOriginalLink(code: string, getString = ((textId : string) => { return textId; })): Promise<[boolean, string]> {
  try {
    const res = await axios.get(getString("routes.server.serverOriginalLinkEndpoint"), {
      params: { urlCode: code },
    });
    return [true, `${getHost()}${res.data}`];
  } catch (error) {
    let err = (error as any);
    const errorMsg = err?.response
      ? `${err?.response.data} (error ${err?.response.status})`
      : `Error retrieving original link request for permalink '${code}': ${err?.message}`;

    console.error(errorMsg);
    return [false, errorMsg];
  }
}

// Returns a tuple [status, message], the message being the original link or an error in case of failure
export async function getOriginalLinkFromUrl(url: string): Promise<[boolean, string]> {
  const urlCode = url.split("/").slice(-1)[0];
  return await getOriginalLink(urlCode);
}

interface PermalinkProps {
  url: string;
  disabled?: string | null;
  icon?: ReactNode;
  style?: CSSProperties;
  text?: string;
  shorten?: boolean;
}

export function Permalink(props: PermalinkProps) {
  const [loading, setLoading] = useState(false);
  const [permalink, setPermalink] = useState<string | undefined>();

  const { getString } = useLocaleStrings();

  async function requestPermalink(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // If a permalink has been generated already, copy to clipboard and notify
    if (permalink) {
      navigator.clipboard.writeText(permalink);
      toast.info(getString("texts.permalinkCopied"));
      return;
    }

    // Get permalink from server
    try {
      // Set to loading
      setLoading(true);
      // Generate short URL / return the long link in case of error
      const newPermalink = props.shorten
        ? await mkPermalinkFromUrl(props.url, getString)
        : props.url;

      // Copy results and update state
      navigator.clipboard.writeText(newPermalink);
      setPermalink(newPermalink);
      // Notify
      toast.info(getString("texts.permalinkCopied"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (props.url)
    return (
      <span
        data-tip
        data-for="permalinkTip"
        style={props.style ? props.style : undefined}
      >
        <Button
          disabled={props.disabled !== null}
          className={"btn-with-icon " + (loading ? "disabled" : "")}
          onClick={requestPermalink}
          variant="secondary"
          href={permalink || props.url}
        >
          {props.text}
          {loading ? (
            <Spinner
              className="white-filler"
              animation="border"
              size="sm"
            ></Spinner>
          ) : (
            props.icon
          )}
        </Button>
        {(props.disabled !== null) && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="permalinkTip">
                {props.disabled === getString("sources.byText")
                  ? getString("texts.noPermalinkManual")
                  : getString("texts.noPermalinkFile")}
              </Tooltip>
            }
          >
            <span></span>
          </OverlayTrigger>
        )}
        <ToastContainer
          position={notificationSettings.position as ToastPosition}
          autoClose={notificationSettings.autoClose}
          hideProgressBar={notificationSettings.hideProgressBar}
          closeOnClick={notificationSettings.closeOnClick}
          pauseOnFocusLoss={notificationSettings.pauseOnFocusLoss}
          pauseOnHover={notificationSettings.pauseOnHover}
          closeButton={notificationSettings.closeButton}
          transition={notificationSettings.transition}
          limit={notificationSettings.limit}
        />
      </span>
    );
  return null;
}

Permalink.propTypes = {
  url: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.node,
};

Permalink.defaultProps = {
  text: "Permalink",
  shorten: true,
  icon: "\uD83D\uDCCB",
};
