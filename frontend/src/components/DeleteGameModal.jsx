import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiCall } from '../helpers/fetch_api';
import { useContextHook, Context } from '../helpers/context';
import PropTypes from 'prop-types';
import { fontBold } from '../inlineStyles';
import loadingCat from '../assets/loading-cat.jpg';
import deleteIcon from '../assets/delete-icon.png'

const DeleteGameModal = (props) => {
  const gameId = props.gameId;
  const gameTitle = props.gameTitle;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { getters, setters } = useContextHook(Context);

  const deleteQuiz = async () => {
    const response = await apiCall(
      'user/delete/game?' + new URLSearchParams({
        gameId: gameId,
    }),
      'DELETE',
      {},
      getters.userToken.token
    );
    if ('error' in response) {
      console.log(response);
    } else {
      handleClose();
      setters.setTrackedGames([]);
      setters.setHasNewGame(true);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{
          float: 'left',
          marginTop: '0.3rem',
        }}
      >
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger" style={fontBold}>
            Remove game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '2rem',
          }}
        >
          <img
            src={loadingCat}
            style={{
              width: '20rem',
            }}
          ></img>
          <br></br>
          <span style={{fontWeight:'lighter', fontSize: '1.75rem'}}>Are you sure you want to remove </span>
          <br></br>
          <span>{gameTitle}</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            No, take me back!
          </Button>
          <Button variant="danger" onClick={deleteQuiz}>
            Yes, remove the game!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteGameModal.propTypes = {
  gameId: PropTypes.number,
  gameTitle: PropTypes.string
};

export default DeleteGameModal;
