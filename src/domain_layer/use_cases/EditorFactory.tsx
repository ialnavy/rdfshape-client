import React from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { EditorView, Extension, ViewUpdate } from "@uiw/react-codemirror";
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
    onChange?: (value: string, viewUpdate: ViewUpdate) => void;
}

let EditorFactory = ({ code, idDoc, language, editable, isLineWrapping, fontSize, onChange }: EditorFactoryParams): React.ReactElement => {
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
            idDoc ?? getString("api.defaultWssDocId"),
            yDoc);
        provider.on('status', (event) => {
            if (event.status === 'connected')
                console.log(event.status);
        });

        let ytext = yDoc.getText('codemirror');
        let undoManager = new Y.UndoManager(ytext);

        provider.awareness.setLocalStateField('user', {
            name: 'Anonymous ' + Math.floor(Math.random() * 100),
            color: userColor.color,
            colorLight: userColor.light
        });
        extensions.push(yCollab(ytext, provider.awareness, { undoManager }));
    }

    /*
     * VERY IMPORTANT!
     * 
     * An 'Y.Doc' object is not a string value like the 'code' prop,
     * it is a set of concurrent updates loaded against a MongoDB provider.
     * 
     * Therefore, when using colaborativity functionality,
     * we cannot manipulate the 'value' property of CodeMirror as a string;
     * that would lead to concurrency issues.
     * 
     * Instead, we let the yjs library make the synchronisation of the 
     * CodeMirror editor content, and handle each update of the document;
     * again, synchronised with the MongoDB provider.
     */
    return (idDoc === undefined)
        ? (<CodeMirror
            value={code}
            extensions={extensions}
            onChange={onChange}
            editable={editable === undefined ? true : editable} />)
        : (<CodeMirror
            extensions={extensions}
            onChange={onChange}
            editable={editable === undefined ? true : editable} />);
};

export default EditorFactory;
