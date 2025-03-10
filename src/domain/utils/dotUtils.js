import Viz from "viz.js/viz.js";
const { Module, render } = require("viz.js/full.render.js");

// https://github.com/mdaines/viz.js/wiki/API
async function convertDot(dot, engine, format, getString = ((textId) => { return (new String(textId)).toString();})) {
  let viz = new Viz({
    Module: () => Module({ TOTAL_MEMORY: 1 << 25 }),
    render,
  });

  // Process the dot regarding the needed format
  const options = { engine };
  let promise = null;
  let textual = true;

  switch (format) {
    // SVG
    case getString("formats.svg"):
      promise = viz.renderSVGElement(dot, {
        ...options,
        mimeType: getString("mimeTypes.svg"),
      });
      textual = false;
      break;

    // Image (deprecated)
    case getString("formats.png"):
      promise = viz.renderImageElement(dot, {
        ...options,
        format: "png-image-element",
        mimeType: getString("mimeTypes.png"),
        scale: 0,
      });
      textual = false;
      break;

    // JSON
    case getString("formats.json"):
      promise = viz.renderJSONObject(dot, options);
      textual = true;
      break;

    // String
    case getString("formats.ps"):
    case getString("formats.dot"):
    default:
      promise = viz.renderString(dot, options);
      textual = true;
      break;
  }

  try {
    const data = await promise;
    return {
      data,
      textual,
    };
  } catch (err) {
    throw err;
  }
}

export async function processDotData(dot, getString = ((textId) => { return (new String(textId)).toString();})) {
  return await convertDot(dot, getString("formats.dot").toLowerCase(), getString("formats.svg"), getString);
}
