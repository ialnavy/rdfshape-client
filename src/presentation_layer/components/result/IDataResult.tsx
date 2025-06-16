import { IEditorState } from "../../../domain_layer/editorState/IEditorState";

export type IDataResult = {
    isLineWrapping?: boolean | undefined;
    fontSize?: number | undefined;

    editorState: IEditorState;
};
