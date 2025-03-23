import { Extension } from "@codemirror/state";
import { minWidth } from "@mui/system";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../../infrastructure_layer/utilities/ReactElementsUtils";


/*
 * May adapt type of CodeMirror properties.
 * To be extended as needed.
 */
export type CodeMirrorAdapterProps = {
    code: string | undefined;
    extensions?: Extension[];

    onChange?(value: string, viewUpdate: ViewUpdate): void;
};

let CodeMirrorAdapter: React.FC<CodeMirrorAdapterProps> = ({ code, extensions, onChange }) => {
    let theme = EditorView.theme({
        "&": { height: "50vh", position: "fixed" },
        ".cm-scroller": { overflow: "auto" }
    });

    return <CodeMirror
        value={code}
        extensions={[EditorView.lineWrapping, theme, ...(extensions || [])]}
        onChange={onChange} />;
};

export default CodeMirrorAdapter;
