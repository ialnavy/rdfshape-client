import React from "react";

import { useLocaleStrings } from "../../presentation_layer/containers/ExternalisedStringsContext";

import EditorFactory from "../../domain_layer/use_cases/EditorFactory";


let RDFDataMainView: React.FC = () => {
    let { getString } = useLocaleStrings();

    let [code, setCode] = React.useState<string>();

    
    return (
        <div>
            <h1>RDF Data Main View</h1>
            <p>Welcome to the RDF Data Main View component.</p>
            <EditorFactory code={code} language={getString("mimeTypes.turtle")} />
        </div>
    );
};

export default RDFDataMainView;
