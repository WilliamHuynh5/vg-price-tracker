import React from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fontBold } from '../inlineStyles';


const LoginPage = () => {
  const smallScreen = useMediaQuery('(max-width: 550px)');
  const mediumScreen = useMediaQuery(
    '(max-width: 1200px) and (min-width: 550px)'
  );
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const content = (
    <>
      <h3 className="mb-4" style={fontBold}>
        Log In
      </h3>
      <LoginForm />
      <hr />
      <p>
        Don&apos;t have an account? <Link to="/auth/register">Sign up</Link>
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

export default LoginPage;