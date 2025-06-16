interface IConfigHeader {
    isLineWrapping: boolean;
    isHiddenApiResponse: boolean;
    isHiddenGraph: boolean;
    fontSize: number;
    
    setLineWrapping: (isLineWrapping: boolean) => void;
    setHiddenApiResponse: (isHiddenApiResponse: boolean) => void;
    setHiddenGraph: (isHiddenGraph: boolean) => void;
    setFontSize: (fontSize: number) => void;
}

export default IConfigHeader;