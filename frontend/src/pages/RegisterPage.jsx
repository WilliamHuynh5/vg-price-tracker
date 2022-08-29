import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fontBold } from '../inlineStyles';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const RegisterPage = () => {
  const smallScreen = useMediaQuery('(max-width: 550px)');
  const mediumScreen = useMediaQuery(
    '(max-width: 1100px) and (min-width: 550px)'
  );
  const largeScreen = useMediaQuery('(min-width: 1100px)');

  const content = (
    <>
      <h3 className="mb-4" style={fontBold}>
        Register
      </h3>
      <RegisterForm />
      <hr />
      <p>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </>
  );
  return (
    <>
      <Header />
      {smallScreen && (
        <div
          className="text-center shadow-lg mx-auto p-4"
          style={{ width: '80%' }}
        >
          {content}
        </div>
      )}
      {mediumScreen && (
        <div
          className="text-center shadow-lg mx-auto p-4"
          style={{ width: '60%' }}
        >
          {content}
        </div>
      )}
      {largeScreen && (
        <div className="w-25 text-center shadow-lg mx-auto p-4">{content}</div>
      )}
      <Footer />
    </>
  );
};

export default RegisterPage;
