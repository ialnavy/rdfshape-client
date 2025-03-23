import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@codemirror/state";


/*
 * May adapt type of CodeMirror properties.
 * To be extended as needed.
 */
export type CodeMirrorAdapterProps = {
    code: string | undefined;
    extensions?: Extension[];
};

let CodeMirrorAdapter: React.FC<CodeMirrorAdapterProps> = ({ code, extensions }) => {
    return <CodeMirror value={code} extensions={extensions} />;
};

export default CodeMirrorAdapter;
