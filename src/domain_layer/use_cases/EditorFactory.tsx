import React from "react";

import { useLocaleStrings } from "../../presentation_layer/containers/ExternalisedStringsContext";

import CodeMirrorAdapter from "../entities/CodeMirrorAdapter";
import { javascript } from "@codemirror/lang-javascript";
import { turtle } from 'codemirror-lang-turtle';

export type EditorFactoryProps = {
    code: string | undefined;
    language: string | undefined;
};

let EditorFactory: React.FC<EditorFactoryProps> = ({ code, language }) => {
    let { getString } = useLocaleStrings();
    let editor = undefined;

    switch (language) {

        case getString("mimeTypes.javascript.textJS"):
        case getString("mimeTypes.javascript.appJS"):
        case getString("mimeTypes.javascript.appXJS"):
        case getString("mimeTypes.javascript.textECMA"):
        case getString("mimeTypes.javascript.appECMA"):
            editor = <CodeMirrorAdapter code={code} extensions={[javascript()]} />;
            break;

        case getString("mimeTypes.turtle"):
            editor = <CodeMirrorAdapter code={code} extensions={[turtle()]} />;
            break;

        default:
            editor = <CodeMirrorAdapter code={code} />;
    }

    return editor;
};

export default EditorFactory;
