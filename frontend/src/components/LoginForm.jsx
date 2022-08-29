import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { apiCall } from '../helpers/fetch_api';
import FormInput from './FormInput';
import FormButton from './FormButton';
import Error from './ErrorMessage';
import { useContextHook, Context } from '../helpers/context';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { setters, getters } = useContextHook(Context);
  const navigate = useNavigate();

  const login = async () => {
    setErr(false);
    const token = await apiCall('auth/login', 'POST', {
      email,
      password,
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
    <Form>
      <FormInput
        label="Email address"
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
      <FormButton title="Log in" action={login} />
      {loginErr && <Error error={errMsg} />}
    </Form>
  );
};

export default LoginForm;
