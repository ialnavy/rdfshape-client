interface IConfigHeader {
    /*
     * Chain of responsibility pattern
     * is used to pass the information
     * relative to the YJS documents
     * to construct the permalink.
     */
    idDocs: string[];
    yjsCollection: string;

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