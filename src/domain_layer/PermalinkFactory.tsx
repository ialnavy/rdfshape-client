export let forRdfData = (idDocs: string[], yjsCollection: string): string => {
    let permalink = "/".concat(yjsCollection);
    if (idDocs.length >= 1)
        permalink = permalink.concat("/").concat(idDocs[0]);
    return permalink;
}

export let forRdfMerge = (idDocs: string[], yjsCollection: string): string => {
    let permalink = "/".concat(yjsCollection);
    if (idDocs.length >= 1)
        permalink = permalink.concat("?idDocLeft=").concat(idDocs[0]);
    if (idDocs.length >= 2)
        permalink = permalink.concat("&idDocRight=").concat(idDocs[1]);
    return permalink;
}
