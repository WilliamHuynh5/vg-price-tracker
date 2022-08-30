import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { apiCall } from '../helpers/fetch_api';
import { useContextHook, Context } from '../helpers/context';
import PropTypes from 'prop-types';
import { fontBold } from '../inlineStyles';

const DeleteGameModal = (props) => {
  const gameTitle = props.gameTitle;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { getters, setters } = useContextHook(Context);

  const deleteQuiz = async () => {
    const response = await apiCall(
      'user/delete/game?' + new URLSearchParams({
        gameTitle: gameTitle,
    }),
      'DELETE',
      {},
      getters.userToken.token
    );
    if ('error' in response) {
      console.log(response);
    } else {
      handleClose();
      setters.setHasNewGame(true);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{
          float: 'right',
          marginTop: '0.3rem',
        }}
      >
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger" style={fontBold}>
            Delete this quiz?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '2rem',
          }}
        >
          {/* <img
            src={deleteQuizIcon}
            style={{
              width: '20rem',
            }}
          ></img> */}
          <br></br>
          Are you sure you want to delete this quiz?
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            No, take me back!
          </Button>
          <Button variant="danger" onClick={deleteQuiz}>
            Yes, delete the quiz!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteGameModal.propTypes = {
  gameTitle: PropTypes.string,
};

export default DeleteGameModal;
