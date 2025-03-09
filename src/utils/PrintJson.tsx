import React from 'react';

// Definición de la interfaz para las propiedades
interface PrintJsonProps {
  json: object;
  overflow?: boolean;
  styles?: React.CSSProperties;
}

const PrintJson: React.FC<PrintJsonProps> = React.memo(({ json, overflow, styles }) => (
  <pre className={overflow === false ? 'no-overflow' : ''} style={styles}>
    {JSON.stringify(json, null, 2)}
  </pre>
));

export default PrintJson;
