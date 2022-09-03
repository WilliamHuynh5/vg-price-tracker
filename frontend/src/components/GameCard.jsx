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
import NinLogo from '../assets/nintendo-logo.png'
import PSLogo from '../assets/ps-logo.png'
import DeleteGameModal from './DeleteGameModal';
import TrackGameModal from './TrackGameModal';

const GameCard = (props) => {
  const { getters, setters } = useContextHook(Context);

  const gameTitle = props.gameTitle;
  const gameThumbnail = props.gameThumbnail;
  const platformPref = props.platformPref;
  const physicalPref = props.physicalPref;
  const digitalPref = props.digitalPref;
  const date = (props.date) ? props.date : '<no data>';
  const currPrice = (props.currPrice) ? props.currPrice : '<no data>';
  const allTimeLow = (props.allTimeLow) ? props.allTimeLow : '<no data>';
  const buyNowLink = (props.buyNow) ? props.buyNow : '<no data>';
  
  
  const currentLowest = '💲';
  const allTimeLowest = '✨ ';
  const lastScraped = '📅 Scraped: ';
  const buyNow = '🛒 Buy now:';

  const platformIcons = []
  if (platformPref.includes('ps5')) {
    const platIcon = (
      <img style ={{width: '22px', marginLeft: '1rem', marginTop: '0.5rem'}} src = {PS5Logo}/>
    );
    platformIcons.push(platIcon)
  }
  if (platformPref.includes('ps4')) {
    const platIcon = (
      <img style ={{width: '30px', marginLeft: '1rem', marginTop: '0.5rem'}} src = {PS4Logo}/>
    );
    platformIcons.push(platIcon)
  }
  if (platformPref.includes('switch')) {
    const platIcon = (
      <img style ={{width: '30px', marginLeft: '1rem', marginTop: '0.5rem'}} src = {SWITCHLogo}/>
    );
    platformIcons.push(platIcon)
  }

  return (
<>
      <Card
        style={{
          width: '18rem',
          marginBottom: '1vw',
          marginTop: '2rem',
          marginLeft: '2rem'
        }}
        id={props.id}
      >
        <div className="row no-gutters">
          <div
            style={{
              width: '20rem',
              height: '10rem',
              textAlign: 'left',
            }}
          >
            <Card.Img
              variant="top"
              style={{
                width: '286px',
                height: '150px',
              }}
              src={gameThumbnail}
            />
            {platformIcons}            
          </div>
          <div>
            <Card.Body style={{textAlign: 'left', marginTop: '1rem'}}>
              <Card.Title style={fontBold}>{gameTitle}</Card.Title>
              <div style={{marginBottom : '1rem'}}></div>
              {date === '<no data>' ? <span style={{fontSize: '1.05rem'}}>{currentLowest} <span style={{fontWeight:'lighter', color : 'red'}}>{currPrice}</span></span> : <span style={{fontSize: '1.05rem'}}>{currentLowest} <span style={{fontWeight:'bold', color : 'green'}}>{currPrice + ' AUD'}</span></span>}
              <br></br>
              {date === '<no data>' ? <span style={{fontSize: '1.05rem'}}>{allTimeLowest} <span style={{fontWeight:'lighter', color : 'red'}}>{allTimeLow}</span></span> : <span style={{fontSize: '1.05rem'}}>{allTimeLowest} <span style={{fontWeight:'bold', color : 'orange'}}>{+ allTimeLow + ' AUD'}</span></span>}
              <br></br>
              <br></br>
              {date === '<no data>' ? <span style={{fontSize: '1.05rem'}}>{'📅'} <span style={{color : 'red'}}>{date}</span></span> :<span style={{fontSize: '1.05rem'}}>{'📅'} <span style={{fontWeight:'bold'}}>{date}</span></span>}
              <br></br>
              {date === '<no data>' ? <span style={{fontSize: '1.05rem', color: 'red'}}>{'🛒 <no data>'}</span> : <span style={{fontSize: '1.05rem'}}>{'🛒'} <a style={{fontWeight: 'bold'}} href={buyNowLink}> Buy now! </a></span>}
              
              <br></br>
              <div style={{marginBottom : '1rem'}}></div>
            </Card.Body>
          </div>
          
          <div
            style={{
              width: '18rem',
              height: '3rem',
              marginLeft: '0.7rem',
            }}
          >
            <DeleteGameModal gameId={props.id} gameTitle={gameTitle}></DeleteGameModal>
            <TrackGameModal 
              gameId={props.id} 
              gameTitle={gameTitle} 
              gamePlatforms={platformPref} 
              digitalPref={digitalPref} 
              physicalPref={physicalPref}
              date={date}
              currPrice={currPrice}
              allTimeLow={allTimeLow}
              buyNow={buyNowLink}>
            </TrackGameModal>
          </div>
        </div>
      </Card>
    </>
  );
};

GameCard.propTypes = {
  id: PropTypes.number,
  gameTitle: PropTypes.string,
  gameThumbnail: PropTypes.string,
  platformPref: PropTypes.array,
  physicalPref: PropTypes.bool,
  digitalPref: PropTypes.bool,
  date: PropTypes.string,
  currPrice: PropTypes.string,
  allTimeLow: PropTypes.string,
  buyNow: PropTypes.string
};

export default GameCard;