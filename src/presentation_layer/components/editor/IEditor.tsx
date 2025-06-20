import { IEditorState } from "../../../domain_layer/editorState/IEditorState";


export interface IEditor {

    /*
     * Parameters of editor.
     */
    idDoc: string | null;
    yDocCollection: string | undefined;
    isLineWrapping: boolean;
    fontSize: number;
    isEditable: boolean;

    editorState: IEditorState;
}