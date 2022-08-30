import Button from 'react-bootstrap/Button';
import { React } from 'react';
import { apiCall } from '../helpers/fetch_api';
import { useContextHook, Context } from '../helpers/context';
import { useNavigate } from 'react-router-dom';

const BtnLogOut = () => {
  const { getters, setters } = useContextHook(Context);
  const navigate = useNavigate();

  const logout = async () => {
    const token = getters.userToken.token;
    await apiCall('auth/logout', 'POST', {token});
    setters.setUserToken(undefined);
    setters.setTrackedGames([]);
    navigate('/auth/login');
  };

  return (
    <Button variant="danger" type="button" onClick={logout}>
      Sign Out
    </Button>
  );
};

export default BtnLogOut;
