import { Extension } from "@codemirror/state";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import React from "react";


/*
 * May adapt type of CodeMirror properties.
 * To be extended as needed.
 */
export type CodeMirrorAdapterProps = {
    code: string | undefined;
    extensions?: Extension[];
    editable?: boolean | undefined;

    onChange?(value: string, viewUpdate: ViewUpdate): void;
};

let CodeMirrorAdapter: React.FC<CodeMirrorAdapterProps> = ({ code, extensions, editable, onChange }) => {
    let theme = EditorView.theme({
        "&": { height: "50vh", position: "fixed" },
        ".cm-scroller": { overflow: "auto" }
    });

    return <CodeMirror
        value={code}
        extensions={[EditorView.lineWrapping, theme, ...(extensions || [])]}
        onChange={onChange}
        editable={editable === undefined ? true : editable} />;
};

export default CodeMirrorAdapter;
