export interface EditorSettingsProps {
    isLineWrapping: boolean;
    fontSize: number;
    
    setLineWrapping(isLineWrapping: boolean): void;
    setFontSize(fontSize: number): void;
}