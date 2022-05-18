import React from "react";
import DefaultHeader from "../components/Header";
import AddGameModal from "../components/AddGameModal";

const HomePage = () => {
  return (
    <DefaultHeader>
      <div>
        <AddGameModal></AddGameModal>
      </div>
    </DefaultHeader>
  )
}

export default HomePage