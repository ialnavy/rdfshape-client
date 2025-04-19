import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../components/Home";
import RDFDataMainView from "../components/RDFDataMainView";
import RDFShapeNavBar from "../components/RDFShapeNavBar";
import { useLocale } from "../containers/ExternalisedStringsContext";


let RDFShapeRoutes: React.FC = () => {
    let { getString } = useLocale();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RDFShapeNavBar><Home /></RDFShapeNavBar>} />

                <Route path="/rdfData" element={<Navigate to={"/rdfData/".concat(getString("api.defaultWssDocId"))} />} />
                <Route path="/rdfData/:idDoc?" element={<RDFShapeNavBar><RDFDataMainView /></RDFShapeNavBar>} />
                
                {/*
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
                */}
            </Routes>
        </BrowserRouter>
    );
};

export default RDFShapeRoutes;