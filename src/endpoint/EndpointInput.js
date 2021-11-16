import React from 'react';

import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import API from "../API";

import PropTypes from "prop-types";

function EndpointInput(props) {

    const endpoints = [
        {name: "wikidata", url: API.routes.utils.wikidataUrl },
        {name: "dbpedia", url: API.routes.utils.dbpediaUrl },
    ];

    const dropDownItems = endpoints.map((endpoint,index) =>
        <Dropdown.Item key={index} eventKey={endpoint.url}>{endpoint.name}</Dropdown.Item>
    );

    function handleOnChange(e) {
        props.handleOnChange(e.target.value)
    }

    function handleOnSelect(e) {
        if (props.handleOnSelect) props.handleOnSelect()
        props.handleOnChange(e);
    }

    return (
        <Form.Group id="common-endpoints" >
            <Form.Label>Endpoint</Form.Label>
            <Form.Control as="input"
                          type="url"
                          placeholder="http://..."
                          value={props.value}
                          onChange={handleOnChange}
            />
            <Dropdown onSelect={handleOnSelect}>
            <DropdownButton alignRight
                            title="Common endpoints"
                            id="select-endpoint"
            >
                {dropDownItems}
            </DropdownButton>
            </Dropdown>
        </Form.Group>

    );
}

EndpointInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired
};

export default EndpointInput;
