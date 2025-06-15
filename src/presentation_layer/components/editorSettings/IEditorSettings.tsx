export interface IEditorSettings {
    isLineWrapping: boolean;
    isHiddenApiResponse: boolean;
    isHiddenGraph: boolean;
    
    setLineWrapping(isLineWrapping: boolean): void;
    setHiddenApiResponse(isHiddenApiResponse: boolean): void;
    setHiddenGraph(isHiddenGraph: boolean): void;
}