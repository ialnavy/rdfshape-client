import React from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import CodeMirrorAdapter from "../entities/CodeMirrorAdapter";
import { javascript } from "@codemirror/lang-javascript";
import { turtle } from 'codemirror-lang-turtle';
import { ViewUpdate } from "@uiw/react-codemirror";

export type EditorFactoryProps = {
    code: string | undefined;
    language: string | undefined;
    editable?: boolean | undefined;

    onChange?(value: string, viewUpdate: ViewUpdate): void;
};

let EditorFactory: React.FC<EditorFactoryProps> = ({ code, language, editable, onChange }) => {
    let { getString } = useLocale();
    let editor = undefined;

    switch (language) {
        case getString("mimeTypes.javascript.textJS"):
        case getString("mimeTypes.javascript.appJS"):
        case getString("mimeTypes.javascript.appXJS"):
        case getString("mimeTypes.javascript.textECMA"):
        case getString("mimeTypes.javascript.appECMA"):
            editor = <CodeMirrorAdapter code={code} extensions={[javascript()]} editable={editable} onChange={onChange} />;
            break;

        case getString("mimeTypes.turtle"):
            editor = <CodeMirrorAdapter code={code} extensions={[turtle()]} editable={editable} onChange={onChange} />;
            break;

        default:
            editor = <CodeMirrorAdapter code={code} editable={editable} onChange={onChange} />;
    }

    return editor;
};

export default EditorFactory;
