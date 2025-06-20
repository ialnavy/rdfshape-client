import { IEditorState } from "../../../domain_layer/editorState/IEditorState";

export type IResumeResponse = {
    isError: boolean;
    fullResponse: string;
    editorState?: IEditorState | undefined;
};
