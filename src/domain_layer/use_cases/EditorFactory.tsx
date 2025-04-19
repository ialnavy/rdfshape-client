import React from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { EditorView, Extension } from "@uiw/react-codemirror";
import { turtle } from 'codemirror-lang-turtle';
import { yCollab } from 'y-codemirror.next';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';


interface EditorFactoryParams {
    code: string | undefined;
    idDoc?: string | undefined;
    language: string | undefined;
    editable?: boolean | undefined;
    isLineWrapping?: boolean | undefined;
    fontSize?: number | undefined;
    setCode(code: string): void;
}

let EditorFactory = ({ code, idDoc, language, editable, isLineWrapping, fontSize, setCode }: EditorFactoryParams): React.ReactElement => {
    let { getString, getNumber } = useLocale();

    // Font size umbral check
    if (fontSize === undefined
        || fontSize < getNumber("limits.minEditorFontSizePx")
        || fontSize > getNumber("limits.maxEditorFontSizePx")) {
        fontSize = getNumber("defaultBehaviour.editorFontSizePx");
    }

    // Theme and extensions
    let theme = EditorView.theme({
        "&": {
            fontSize: ((new String(fontSize)).toString()).concat("px"),
            height: "50vh",
            position: "fixed"
        },
        ".cm-scroller": { overflow: "auto" }
    });
    let extensions: Extension[] = [theme];

    if (isLineWrapping)
        extensions.push(EditorView.lineWrapping);

    // Extension for language syntax highlighting
    // (none by default)
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

    // Colaborativity functionality
    if (idDoc !== undefined) {
        let userColor = { color: '#30bced', light: '#30bced33' };
        let yDoc = new Y.Doc();
        let provider = new WebsocketProvider(
            (import.meta.env.VITE_RDFSHAPE_Y_MONGO_DB_PROVIDER_HOST as string) ?? "ws://127.0.0.1:2403/",
            idDoc,
            yDoc);
        provider.on('status', (event) => {
            if (event.status === 'connected')
                console.log(event.status);
        });
        provider.on('connection-error', () => {
            provider.ws?.close();
        })

        let ytext = yDoc.getText('codemirror');
        let undoManager = new Y.UndoManager(ytext);

        provider.awareness.setLocalStateField('user', {
            name: 'Anonymous ' + Math.floor(Math.random() * 100),
            color: userColor.color,
            colorLight: userColor.light
        });
        extensions.push(yCollab(ytext, provider.awareness, { undoManager }));
    }

    return (<CodeMirror
        value={code}
        extensions={extensions}
        onChange={(value: string) => { setCode(value); }}
        editable={editable === undefined ? true : editable} />);
};

export default EditorFactory;
