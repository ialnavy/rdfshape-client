import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { generateRandomUuidForYjsDoc } from "../../infrastructure_layer/services/YjsDocServiceLayer";
import { useLocale } from "../../infrastructure_layer/utilities/ExternalisedStringsContext";

import RDFShapeNavBar from "../components/RDFShapeNavBar";
import Home from "../Home";
import RDFDataMainView from "../RDFDataMainView";
import RDFDataMergeView from "../RDFDataMergeView";



let RDFShapeRoutes: React.FC = () => {
    let { getString, /* getNumber, getBoolean, getStringsSet */ } = useLocale();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RDFShapeNavBar><Home /></RDFShapeNavBar>} />

                <Route path={"/".concat(getString("yjs.collections.rdfData"))} element={<Navigate to={"/".concat(getString("yjs.collections.rdfData")).concat("/").concat(generateRandomUuidForYjsDoc())} />} />
                <Route path={"/".concat(getString("yjs.collections.rdfData")).concat("/:idDoc?")} element={<RDFShapeNavBar><RDFDataMainView /></RDFShapeNavBar>} />

                <Route path={"/".concat(getString("yjs.collections.rdfMerge"))} element={<RDFShapeNavBar><RDFDataMergeView /></RDFShapeNavBar>} />

                {/*
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
                */}
            </Routes>
        </BrowserRouter>
    );
};

export default RDFShapeRoutes;