import Button from 'react-bootstrap/Button';
import { React } from 'react';
import PropTypes from 'prop-types';

const FormButton = (props) => {
  return (
    <Button
      className="w-100"
      variant="primary"
      type="button"
      onClick={() => {
        props.action()
      }}
    >
      {props.title}
    </Button>
  );
};

FormButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func
};

export default FormButton;
