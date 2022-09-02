import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiCall } from '../helpers/fetch_api';
import { useContextHook, Context } from '../helpers/context';
import PropTypes from 'prop-types';
import { fontBold } from '../inlineStyles';
import { fontSize } from '@mui/system';

const TrackGameModal = (props) => {
  const gameId = props.gameId;
  const gameTitle = props.gameTitle;
  const gamePlatforms = props.gamePlatforms;
  const digitalPref = props.digitalPref;
  const physicalPref = props.physicalPref;
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { getters, setters } = useContextHook(Context);

  const trackGame = async () => {
    console.log(gamePlatforms);
    for (const platform of gamePlatforms) {
      console.log(platform);
      try {
        const response = await apiCall(
          'game/query/track',
          'POST',
          {gameTitle: gameTitle, gamePlatforms: platform, digitalPref: digitalPref, physicalPref:physicalPref },
          getters.userToken.token
        );
        if ('error' in response) {
          console.log(response);
        }
        setters.setHasNewGame(true);
      } catch {
        continue;
      }
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          float: 'right',
          marginTop: '0.3rem',
        }}
      >
        Open Tracking Menu
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary" style={{fontWeight:'bold', fontSize:'2rem'}}>
            {gameTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
          }}
        >
          
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Go back!
          </Button>
          <Button variant="success" onClick={trackGame}>
            Scrape Prices!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

TrackGameModal.propTypes = {
  gameId: PropTypes.number,
  gameTitle: PropTypes.string,
  gamePlatforms: PropTypes.array,
  digitalPref: PropTypes.bool,
  physicalPref: PropTypes.bool
};

export default TrackGameModal;
