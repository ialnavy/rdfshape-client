import { IEditorState } from "../../../domain_layer/editorState/IEditorState";


export interface IEditor {

    /*
     * Parameters of editor.
     */
    idDoc: string | undefined;
    yDocCollection: string | undefined;
    isLineWrapping: boolean;
    fontSize: number;

    editorState: IEditorState;
}