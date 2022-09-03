import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { apiCall } from '../helpers/fetch_api';
import FormInput from './FormInput.jsx';
import FormButton from './FormButton.jsx';
import Error from './ErrorMessage.jsx';
import { useContextHook, Context } from '../helpers/context';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerErr, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { setters } = useContextHook(Context);
  const navigate = useNavigate();

  const register = async () => {
    setErr(false);
    const token = await apiCall('auth/register', 'POST', {
      email,
      password,
      confirmPassword
    });
    if ('error' in token) {
      setErr(true);
      setErrMsg(token.error);
    } else {
      setters.setUserToken(token);
      navigate('/home');
    }
  };

  return (
    <>
      <Form>
        <FormInput
          label="Username"
          id="email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></FormInput>
        <FormInput
          label="Password"
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></FormInput>
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></FormInput>
        <FormButton title="Sign up" action={register} />
        {registerErr && <Error error={errMsg} />}
      </Form>
    </>
  );
};

export default RegisterForm;
