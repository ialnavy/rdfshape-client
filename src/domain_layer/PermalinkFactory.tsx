export let forRdfData = (idDocs: string[], yjsCollection: string): string => {
    return "/".concat(yjsCollection)
        .concat("/").concat(idDocs[0]);
}

export let forRdfMerge = (idDocs: string[], yjsCollection: string): string => {
    return "/".concat(yjsCollection)
        .concat("?idDocLeft=").concat(idDocs[0])
        .concat("&idDocRight=").concat(idDocs[1]);
}
