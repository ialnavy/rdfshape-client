import { ExternalisedStringsContextProvider } from './presentation_layer/containers/ExternalisedStringsContext';
import RDFShapeRoutes from './presentation_layer/routes/RDFShapeRoutes';

import externalisedStrings from "../externalisedStrings.yaml";

let App: React.FC = () => {
  return (
    <ExternalisedStringsContextProvider data={externalisedStrings}>
      <RDFShapeRoutes />
    </ExternalisedStringsContextProvider>
  )
};

export default App;
