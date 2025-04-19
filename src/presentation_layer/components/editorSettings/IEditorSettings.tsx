export interface EditorSettingsProps {
    isLineWrapping: boolean;
    fontSize: number;
    isHiddenApiResponse: boolean;
    
    setLineWrapping(isLineWrapping: boolean): void;
    setFontSize(fontSize: number): void;
    setHiddenApiResponse(isHiddenApiResponse: boolean): void;
}