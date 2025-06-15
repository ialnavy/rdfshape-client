export type IDataResult = {
    isError: boolean;
    fullResponse: string;

    isLineWrapping?: boolean | undefined;
    fontSize?: number | undefined;
    
    responseMessage: string;
    responseNumberOfStatements: number | undefined;
};
