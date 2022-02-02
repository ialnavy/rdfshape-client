import PropTypes from "prop-types";
import React from "react";
import Form from "react-bootstrap/Form";

class ByURL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlValue: this.props.urlValue,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ urlValue: e.target.value });
    this.props.handleUrlChange(e.target.value);
  }

  render() {
    return (
      <Form.Group>
        <Form.Label>{this.props.name}</Form.Label>
        <Form.Control
          type="text"
          value={this.props.urlValue}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </Form.Group>
    );
  }
}

ByURL.propTypes = {
  name: PropTypes.string.isRequired,
  urlValue: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

ByURL.defaultProps = {
  name: "",
  placeholder: "",
};

export default ByURL;
