import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormCheck } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { apiCall } from '../helpers/fetch_api';
import { useContextHook, Context } from '../helpers/context';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';

import amazonStoreLogo from '../assets/amazon-store-logo.png';
import bigwStoreLogo from '../assets/bigw-store-logo.png';
import ebgamesStoreLogo from '../assets/ebgames-store-logo.jpg';
import eshopStoreLogo from '../assets/eshop-store-logo.png';
import harveynormanStoreLogo from '../assets/harveynorman-store-logo.jpg';
import jbhifiStoreLogo from '../assets/jbhifi-store-logo.jpg';
import playasiaStoreLogo from '../assets/playasia-store-logo.jpg';
import psStoreLogo from '../assets/ps-store-logo.png';
import targetStoreLogo from '../assets/target-store-logo.png';

const TrackGameModal = (props) => {
  const gameTitle = props.gameTitle;
  const gamePlatforms = props.gamePlatforms;
  const digitalPref = props.digitalPref;
  const physicalPref = props.physicalPref;
  const date = (props.date) ? props.date : '<no data>';
  const currPrice = (props.currPrice) ? props.currPrice : '<no data>';
  const allTimeLow = (props.allTimeLow) ? props.allTimeLow : '<no data>';
  const buyNowLink = (props.buyNow) ? props.buyNow : '<no data>';
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedDigital, setCheckedDigital] = useState(true);
  const [checkedPhysical, setCheckedPhysical] = useState(true);
  const [createErrPref, setErrPref] = useState(false);
  const [errMsgPref, setErrMsgPref] = useState('');
  const [checkedAmazon, setCheckedAmazon] = useState(true);
  const [checkedBigw, setCheckedBigw] = useState(true);
  const [checkedEbgames, setCheckedEbgames] = useState(true);
  const [checkedEshop, setCheckedEshop] = useState(true);
  const [checkedHarveynorman, setCheckedHarveyNorman] = useState(true);
  const [checkedJbhifi, setCheckedJbhifi] = useState(true);
  const [checkedPlayasia, setCheckedPlayasia] = useState(true);
  const [checkedPs, setCheckedPs] = useState(true);
  const [checkedTarget, setCheckedTarget] = useState(true);
  
  const { getters, setters } = useContextHook(Context);

  const trackGame = async () => {
    if(!checkedPhysical && !checkedDigital) {
      setErrPref(true);
      setErrMsgPref('Please select at least one preference.');
      return;
    }
    const retailPrefs = {
      'amazon.com.au': checkedAmazon,
      'bigw.com.au': checkedBigw,
      'ebgames.com.au': checkedEbgames,
      'nintendo.com.au': checkedEshop,
      'harveynorman.com.au': checkedHarveynorman,
      'jbhifi.com.au': checkedJbhifi,
      'playasia.com': checkedPlayasia,
      'store.playstation.au': checkedPs,
      'target.com.au': checkedTarget
    }
    setIsLoading(true);
    for (const platform of gamePlatforms) {
      console.log(platform);
      try {
        const response = await apiCall(
          'game/query/track',
          'POST',
          {gameTitle: gameTitle, gamePlatforms: platform, digitalPref: digitalPref, physicalPref:physicalPref, retailPrefs: retailPrefs },
          getters.userToken.token
        );
        if ('error' in response) {
          console.log(response);
        }
        setters.setHasNewGame(true);
      } catch {
        continue;
      }
      setIsLoading(false);
      handleClose();
    }
  };
  
  const trackModalBody = (
  <>
    <h4>Select Preference</h4>
    {/* Type preference */}
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px'}}>
        <FormCheck label='Physical' defaultChecked={true} onChange={()=> {setCheckedPhysical(!checkedPhysical)}}></FormCheck>
      </div>
      <div>
        <FormCheck label='Digital' defaultChecked={true} onChange={()=> {setCheckedDigital(!checkedPhysical)}}></FormCheck>
      </div>
    </div>  
    {createErrPref && <Error error={errMsgPref} />}
    <div style={{marginBottom:'1.5rem'}}></div>
    <h4>Select Retailers</h4>
    <div style={{marginBottom:'1rem'}}></div>
    
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedAmazon(!checkedAmazon)}}>
        <img src = {amazonStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedBigw(!checkedBigw)}}>
        <img src = {bigwStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedEbgames(!checkedEbgames)}}>
        <img src = {ebgamesStoreLogo} style={{width: '90px', height: '90px', cursor:'pointer', marginTop: '-18px'}}></img>
      </div>
      
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedEshop(!checkedEshop)}}>
        <img src = {eshopStoreLogo} style={{width: '100px', height: '100px', cursor:'pointer', marginTop: '-20px'}}></img>
      </div>
    </div>
    <div style={{marginBottom:'1rem'}}></div>
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedAmazon} onChange={()=> {setCheckedAmazon(!checkedAmazon)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedBigw} onChange={()=> {setCheckedBigw(!checkedBigw)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedEbgames} onChange={()=> {setCheckedEbgames(!checkedEbgames)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedEshop} onChange={()=> {setCheckedEshop(!checkedEshop)}}></FormCheck>
      </div>
    </div>
    <br></br>
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedHarveyNorman(!checkedHarveynorman)}}>
        <img src = {harveynormanStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedJbhifi(!checkedJbhifi)}}>
        <img src = {jbhifiStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedPlayasia(!checkedPlayasia)}}>
        <img src = {playasiaStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedPs(!checkedPs)}}>
        <img src = {psStoreLogo} style={{width: '50px', height: '50px', cursor:'pointer'}}></img>
      </div>
    </div>
    <div style={{marginBottom:'1rem'}}></div>
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedHarveynorman} onChange={()=> {setCheckedHarveyNorman(!checkedHarveynorman)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedJbhifi} onChange={()=> {setCheckedJbhifi(!checkedJbhifi)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedPlayasia} onChange={()=> {setCheckedPlayasia(!checkedPlayasia)}}></FormCheck>
      </div>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedPs} onChange={()=> {setCheckedPs(!checkedPs)}}></FormCheck>
      </div>
    </div>
    <div style={{marginBottom:'1rem'}}></div>
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}} onClick={()=> {setCheckedTarget(!checkedTarget)}}>
        <img src = {targetStoreLogo} style={{width: '70px', height: '70px', cursor:'pointer'}}></img>
      </div>
    </div>
    <br></br>
    
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '120px', height: '50px', textAlign: 'center'}}> 
        <FormCheck type="switch" checked={checkedTarget} onChange={()=> {setCheckedTarget(!checkedTarget)}}></FormCheck>
      </div>
    </div>
    
    <div style={{marginBottom:'1rem'}}></div>
    <span style={{fontSize: '1rem', color:'grey'}}><span style={{fontWeight:'bold'}}>Last tracked at: </span>📅 {date}</span>
  </>
  )

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
        <Modal.Body>
          {isLoading ? <LoadingSpinner /> : trackModalBody}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Go back!
          </Button>
          <Button variant="success" onClick={trackGame} disabled={isLoading}>
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
  physicalPref: PropTypes.bool,
  date: PropTypes.string,
  currPrice: PropTypes.string,
  allTimeLow: PropTypes.string,
  buyNow: PropTypes.string
};

export default TrackGameModal;
