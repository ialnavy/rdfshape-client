import React from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { EditorView, Extension, ViewUpdate } from "@uiw/react-codemirror";
import { turtle } from 'codemirror-lang-turtle';


interface EditorFactoryParams {
    code: string | undefined;
    language: string | undefined;
    editable?: boolean | undefined;
    isLineWrapping?: boolean | undefined;
    onChange?: (value: string, viewUpdate: ViewUpdate) => void;
}

let EditorFactory = ({ code, language, editable, isLineWrapping, onChange }: EditorFactoryParams): React.ReactElement => {
    let { getString } = useLocale();

    let theme = EditorView.theme({
        "&": { height: "50vh", position: "fixed" },
        ".cm-scroller": { overflow: "auto" }
    });

    let extensions: Extension[] = [theme];
    if (isLineWrapping)
        extensions.push(EditorView.lineWrapping);

    switch (language) {
        case getString("mimeTypes.javascript.textJS"):
        case getString("mimeTypes.javascript.appJS"):
        case getString("mimeTypes.javascript.appXJS"):
        case getString("mimeTypes.javascript.textECMA"):
        case getString("mimeTypes.javascript.appECMA"):
            extensions.push(javascript());
            break;
        case getString("mimeTypes.turtle"):
            extensions.push(turtle());
            break;
        default:
            break;
    }

    return (<CodeMirror
        value={code}
        extensions={extensions}
        onChange={onChange}
        editable={editable === undefined ? true : editable} />);
};

export default EditorFactory;
