import {React, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import FormInput from "./FormInput";
import PS4_Logo from '../assets/ps4-c-logo.png'
import PS5_Logo from '../assets/ps5-c-logo.png'
import switch_Logo from '../assets/switch-c-logo.png'
import { useContextHook, Context } from '../helpers/context';

const AddGameModal = () => {
  const { getters, setters } = useContextHook(Context);

  const [show, setShow] = useState(false);
  const [checkedPS5, setCheckedPS5] = useState(false);
  const [checkedPS4, setCheckedPS4] = useState(false);
  const [checkedSWITCH, setCheckedSWITCH] = useState(false);
  const [checkedDigital, setCheckedDigital] = useState(true);
  const [checkedPhysical, setCheckedPhysical] = useState(true);

  const [gameTitle, setGameTitle] = useState('')
  const handleClose = () => {
    setCheckedPS5(false)
    setCheckedPS4(false)
    setCheckedSWITCH(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  
  const SaveGameToMemory = () => {

    const gameDict = {}
    gameDict[gameTitle] = {'platforms': [], 'physical': checkedPhysical, 'digital': checkedDigital}

    if (checkedPS5) {
      gameDict[gameTitle].platforms.push('ps5')
    }
    if (checkedPS4) {
      gameDict[gameTitle].platforms.push('ps4')
    }
    if (checkedSWITCH) {
      gameDict[gameTitle].platforms.push('switch')
    }

    const currentTrackedGames = getters.trackedGames
    currentTrackedGames[gameTitle] = gameDict[gameTitle]

    setters.setTrackedGames(currentTrackedGames)

    console.log(getters.trackedGames)
  }

  return (
    <>
      <Button variant = 'primary' onClick = {handleShow}>
        Add New
      </Button>
      <Modal show = {show} onHide = {handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add a game!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Platform logos */}
          <p style={{fontWeight: 'bold'}}>Select Platform</p>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '150px', height: '100px', textAlign: 'center'}} onClick={()=> {setCheckedPS5(!checkedPS5)}}>
              <img src = {PS5_Logo} style={{width: '100px', height: '100px', cursor:'pointer'}}></img>
            </div>
            <div style={{width: '150px', height: '100px', textAlign: 'center'}} onClick={()=> {setCheckedPS4(!checkedPS4)}}>
              <img src = {PS4_Logo} style={{width: '120px', height: '72px', marginTop: '10px', cursor:'pointer'}}></img>
            </div>
            <div style={{width: '150px', height: '100px', textAlign: 'center'}} onClick={()=> {setCheckedSWITCH(!checkedSWITCH)}}>
              <img src = {switch_Logo} style={{width: '90px', height: '90px', cursor:'pointer'}}></img>
            </div>
          </div>
          
          {/* Checkboxes */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '150px', height: '50px', textAlign: 'center'}}> 
              <FormCheck type="switch" checked={checkedPS5} onChange={()=> {setCheckedPS5(!checkedPS5)}}></FormCheck>
            </div>
            <div style={{width: '150px', height: '50px', textAlign: 'center'}}> 
              <FormCheck type="switch" checked={checkedPS4} onChange={()=> {setCheckedPS4(!checkedPS4)}}></FormCheck>
            </div>
            <div style={{width: '150px', height: '50px', textAlign: 'center'}}> 
              <FormCheck type="switch" checked={checkedSWITCH} onChange={()=> {setCheckedSWITCH(!checkedSWITCH)}}></FormCheck>
            </div>
          </div>

          <Form>
            <FormInput 
              label='Game Title'
              id='gameTitle'
              type='text'
              onChange={(e) => {
                setGameTitle(e.target.value)
              }}
            >
            </FormInput>
          </Form>

          {/* Type preference */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '120px'}}>
              <FormCheck label='Physical' defaultChecked={true} onChange={()=> {setCheckedPhysical(!checkedPhysical)}}></FormCheck>
            </div>
            <div>
              <FormCheck label='Digital' defaultChecked={true} onChange={()=> {setCheckedDigital(!checkedPhysical)}}></FormCheck>
            </div>
          </div>  
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id="createQuizButton" variant="primary" onClick={() => {
            SaveGameToMemory()
            handleClose()
            }}>
            Add
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddGameModal