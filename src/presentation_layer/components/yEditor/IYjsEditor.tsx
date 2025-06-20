import { IEditorState } from "../../../domain_layer/editorState/IEditorState";


export interface IYjsEditor {

    /*
     * Parameters of editor.
     */
    idDoc: string | undefined;
    yDocCollection: string | undefined;
    isLineWrapping: boolean;
    fontSize: number;

    editorState: IEditorState;
}