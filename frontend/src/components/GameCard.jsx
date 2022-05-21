import { React, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useContextHook, Context } from '../helpers/context';
import { apiCall } from '../helpers/fetch_api';
import Button from 'react-bootstrap/Button';
import { fontBold, font } from '../inlineStyles';

const GameCard = (props) => {
  const { getters, setters } = useContextHook(Context);

  const gameTitle = props.gameTitle;
  const gameThumbnail = props.gameThumbnail;
  const platformPref = props.platformPref;
  const physicalPref = props.physicalPref;
  const digitalPref = props.digitalPref;

  return (
    <Card
      style={{ width: '70vw', marginBottom: '1vw', ...font }}
      className="text-center mx-auto"
      // id={quizId}
    >
      <div className="row no-gutters">
        <div className="col-md-4">
          <Card.Img
            variant="top"
            style={{ width: '15rem' }}
            className="col-4"
            src={gameThumbnail}
          />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Title style={fontBold}>{gameTitle}</Card.Title>
            {/* <Card.Text> {numQuestions}</Card.Text>
            <Card.Text>{quizTime}</Card.Text> */}
          </Card.Body>
        </div>
        <div
          style={{
            width: '70vw',
            height: '3rem',
            marginLeft: '0.7rem',
            // ...backgroundGrey,
          }}
        >
        </div>
      </div>
    </Card>
  );
};

GameCard.propTypes = {
  gameTitle: PropTypes.string,
  gameThumbnail: PropTypes.string,
  platformPref: PropTypes.array,
  physicalPref: PropTypes.bool,
  digitalPref: PropTypes.bool
};

export default GameCard;