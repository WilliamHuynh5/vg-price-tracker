import { React } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { fontBold, inputBox } from '../inlineStyles';

const FormInput = (props) => {
  return (
    <Form.Group className="mb-3 text-start" controlId={props.id}>
      <Form.Label style={{fontSize:'bold'}}>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        style={inputBox}
        defaultValue={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        accept={props.accept}
        placeholder={props.placeholderText}
      />
    </Form.Group>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholderText: PropTypes.string,
  accept: PropTypes.string,
};

export default FormInput;
