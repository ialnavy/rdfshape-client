export type IRDFDataResult = {
    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number | undefined;
};
