import { React, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useContextHook, Context } from '../helpers/context';
import { apiCall } from '../helpers/fetch_api';
import Button from 'react-bootstrap/Button';
import { fontBold, font, backgroundGrey } from '../inlineStyles';
import PS5Logo from '../assets/ps5-logo.png'
import PS4Logo from '../assets/ps4-logo.png'
import SWITCHLogo from '../assets/switch-logo.png'

const GameCard = (props) => {
  const { getters, setters } = useContextHook(Context);

  const gameTitle = props.gameTitle;
  const gameThumbnail = props.gameThumbnail;
  const platformPref = props.platformPref;
  const physicalPref = props.physicalPref;
  const digitalPref = props.digitalPref;

  const platformIcons = []
  if (platformPref.includes('ps5')) {
    const platIcon = (
      <Card.Img
        variant="top"
        style={{ width: '3rem', height: 'auto' }}
        src={PS5Logo}
      />
    );
    platformIcons.push(platIcon)
  }
  if (platformPref.includes('ps4')) {
    const platIcon = (
      <Card.Img
        variant="top"
        style={{ width: '3rem', height: 'auto' }}
        src={PS4Logo}
      />
    );
    platformIcons.push(platIcon)
  }
  if (platformPref.includes('switch')) {
    const platIcon = (
      <Card.Img
        variant="top"
        style={{ width: '3rem', height: 'auto' }}
        src={SWITCHLogo}
      />
    );
    platformIcons.push(platIcon)
  }

  return (
    <Card
      style={{ width: '70vw', marginBottom: '1vw', ...font }}
      className="text-center mx-auto"
      id={props.id}
    >
      <div className="row no-gutters">
        <div className="col-md-1">
          <div className="row-md-1">
            {platformIcons}
          </div>
        </div>
        <div className="col-md-1">
          <Card.Img
            variant="top"
            style={{ width: '15rem', height: 'auto' }}
            className="col-6"
            src={gameThumbnail}
          />
        </div>
        <div className="col-md-10">
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
            ...backgroundGrey,
          }}
        >
        </div>
      </div>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number,
  gameTitle: PropTypes.string,
  gameThumbnail: PropTypes.string,
  platformPref: PropTypes.array,
  physicalPref: PropTypes.bool,
  digitalPref: PropTypes.bool
};

export default GameCard;