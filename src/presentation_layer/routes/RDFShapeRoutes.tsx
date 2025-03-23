import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RDFShapeNavBar from "../components/RDFShapeNavBar";
import Home from "../components/Home";
import RDFDataMainView from "../components/RDFDataMainView";


let RDFShapeRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RDFShapeNavBar><Home /></RDFShapeNavBar>} />
                <Route path="/rdfData" element={<RDFShapeNavBar><RDFDataMainView /></RDFShapeNavBar>} />
                {/*
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
                */}
            </Routes>
        </BrowserRouter>
    );
};

export default RDFShapeRoutes;