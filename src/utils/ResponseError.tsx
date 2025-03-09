import React from 'react';
import API from '../API';
import environmentConfiguration from '../EnvironmentConfig';

// Definición de la interfaz para las propiedades de ResponseError
export interface ResponseErrorProps {
  errorOrigin: string;
  errorMessage?: string;
}

// Componente auxiliar para mostrar errores del servidor dado el URL solicitado y el mensaje
const ResponseError: React.FC<ResponseErrorProps> = ({ errorOrigin, errorMessage }) => {
  return (
    <details>
      <summary>
        {`${API.texts.errorResponsePrefix} from ${errorOrigin}`}{" "}
      </summary>
      {errorMessage && (
        <>
          <hr />
          <p className="code alert-body">{errorMessage}</p>
        </>
      )}
    </details>
  );
};

export default ResponseError;

// Función auxiliar para construir un elemento ResponseError a partir de un error de axios y el URL de origen del error
export const mkError = (error: any, url: string = environmentConfiguration.apiHost): JSX.Element => {
  // Parsear la respuesta del servidor para un mensaje de error personalizado, de lo contrario usar el mensaje de error de axios
  const errorMessage =
    error?.response?.data?.error ||
    error?.response?.data ||
    error?.message ||
    error ||
    API.texts.networkError;
  return (
    <ResponseError errorOrigin={url} errorMessage={errorMessage.toString()} />
  );
};
