import {React, useEffect} from "react";
import DefaultHeader from "../components/Header";
import AddGameModal from "../components/AddGameModal";
import { apiCall } from "../helpers/fetch_api";
import { useContextHook, Context } from '../helpers/context';

const HomePage = () => {
  const {setters } = useContextHook(Context);
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall('util/fetch', 'GET', {});
      setters.setTrackedGames(data)
    }
    fetchData()
  }, [])  
  

  
 

  return (
    <DefaultHeader>
      <div>
        <AddGameModal></AddGameModal>
      </div>
    </DefaultHeader>
  )
}

export default HomePage