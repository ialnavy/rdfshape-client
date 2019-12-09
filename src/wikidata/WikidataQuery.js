import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { mkPermalink, Permalink } from "../Permalink";
import API from "../API";
import Pace from "react-pace-progress";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {InitialQuery, mkQueryTabs, queryParamsFromQueryParams} from "../query/Query";
import axios from "axios";
import ResultEndpointQuery from "../results/ResultEndpointQuery";

function WikidataQuery(props) {
    const [result, setResult] = useState('');
    const [permalink, setPermalink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [query, setQuery] = useState(InitialQuery);
    const serverUrl = API.endpointQuery ;


    function handleSubmit(event) {
        event.preventDefault();
        const permalinkParams = queryParamsFromQueryParams();
        let serviceParams = permalinkParams ;
        serviceParams['endpoint'] = API.wikidataUrl ;
        let permalink = mkPermalink(API.wikidataQueryRoute, permalinkParams);
        setLoading(true);
        postProcess(serverUrl, serviceParams, permalink);
    }

    function postProcess(url, params, permalink) {
        axios.post(url, params)
            .then(response => response.data)
            .then((data) => {
                setResult(data);
                setPermalink(permalink)
            })
            .catch(function (error) {
                const msg = `Error doing server request at ${serverUrl}: ${error}`;
                console.log(msg);
                setLoading(false);
                setError(msg);
            })
        ;
    }

    return (
       <Container>
         <h1>Query Wikidata</h1>
         <Row>
             { result || loading || error ?
             <Col>
                 {loading ? <Pace color="#27ae60"/> :
                     error? <Alert variant="danger">{error}</Alert> :
                     result ?
                         <ResultEndpointQuery result={result} /> : null
                 }
                 { permalink &&  <Permalink url={permalink} /> }
             </Col> : null
             }
             <Col>
                 <Form onSubmit={handleSubmit}>
                     {mkQueryTabs(query,setQuery)}
                     <Button variant="primary"
                             type="submit">Query wikidata</Button>
                 </Form>
             </Col>
         </Row>
       </Container>
     );
}

export default WikidataQuery;
