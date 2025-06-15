import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { generateRandomUuidForYjsDoc } from "../../infrastructure_layer/services/YjsDocServiceLayer";
import Home from "../Home";
import RDFDataMainView from "../RDFDataMainView";
import RDFShapeNavBar from "../components/RDFShapeNavBar";


let RDFShapeRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RDFShapeNavBar><Home /></RDFShapeNavBar>} />

                <Route path="/rdfData" element={<Navigate to={"/rdfData/".concat(generateRandomUuidForYjsDoc())} />} />
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