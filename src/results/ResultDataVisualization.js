import React from "react";
import Viz from "viz.js/viz.js";
import Cyto from "../components/Cyto";
const { Module, render } = require("viz.js/full.render.js");

function mkInner(inner) {
  return { __html: inner };
}

class ResultDataVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHtml: null,
      json: null,
      svg: null,
    };
    this.visualizeDot = this.visualizeDot.bind(this);
  }

  visualizeDot(dot, engine, format) {
    const digraph = `digraph G {

subgraph cluster_0 {
 style=filled;
 color=lightgrey;
 node [style=filled,color=white];
 a0 -> a1 -> a2 -> a3;
 label = "process #1";
}

subgraph cluster_1 {
 node [style=filled];
 b0 -> b1 -> b2 -> b3;
 label = "process #2";
 color=blue
}
 tstart -> a0;
 tstart -> b0;
 ta1 -> b3;
 tb2 -> a3;
 ta3 -> a0;
 a3 -> end;
 b3 -> end;

start [shape=Mdiamond];
 tend [shape=Msquare];
}
`;
    let viz = new Viz({ Module, render });
    const opts = { engine: "dot" };
    viz
      .renderSVGElement(digraph, opts)
      .then((svg) => {
        this.setState({
          innerHtml: svg.outerHTML,
          svg: svg,
        });
      })
      .catch((error) => {
        // Create a new Viz instance (@see Caveats page for more info)
        viz = new Viz({ Module, render });
        this.setState({ innerHtml: "<p>" + error + "</p>" });
        console.error(error);
      });
  }

  componentDidMount() {
    const result = this.props.result;
    let targetGraphFormat = this.props.targetGraphFormat;
    if (targetGraphFormat) {
      targetGraphFormat = targetGraphFormat.toLowerCase();
      if (["svg", "png", "jpg", "dot"].includes(targetGraphFormat)) {
        let dotStr;
        try {
          dotStr = JSON.parse(result.result);
        } catch (ex) {
          console.error("Error parsing result: " + ex);
          dotStr = null;
        }
        if (dotStr) this.visualizeDot(dotStr, "dot", targetGraphFormat);
        else {
          this.setState({ innerHtml: "<p>Error obtaining result value</p>" });
        }
      } else if (targetGraphFormat === "json") {
        const json = JSON.parse(result.result);
        this.setState({
          json: json,
          innerHtml: "<p>Cytoscape from JSON</p>",
        });
      }
    } else {
      this.setState({
        innerHtml: "<p>Unknown targetGraphFormat" + targetGraphFormat + "</p>",
      });
    }
  }

  render() {
    const result = this.props.result;
    let msg;
    if (result === "") {
      msg = null;
    } else if (result.error) {
      msg = (
        <div>
          <p>Error: {result.error}</p>
          <details>
            <PrintJson json={result} />
          </details>
        </div>
      );
    } else {
      if (this.state.innerHtml) {
        msg = (
          <div>
            <p>SVG</p>
            <div dangerouslySetInnerHTML={mkInner(this.state.innerHtml)} />
            <details>
              <pre>{JSON.stringify(result)}</pre>
            </details>
          </div>
        );
      } else if (this.state.json) {
        msg = (
          <div>
            <Cyto elements={this.state.json} />
            <details>
              <pre>{JSON.stringify(result)}</pre>
            </details>
          </div>
        );
      } else {
        msg = (
          <div>
            <p>{result.msg}</p>
            <details>
              <pre>{JSON.stringify(result)}</pre>
            </details>
          </div>
        );
      }
    }

    return <div>{msg}</div>;
  }
}

export default ResultDataVisualization;
