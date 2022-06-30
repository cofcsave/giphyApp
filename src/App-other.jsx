import React from "react";
import Giphy from "./components/giphy"
import './App.scss';

function Apps() {
    return (
      <div className="App"> <Giphy /> </div>
    );
  }
  
  /*
Giphy is imported from components library with giphy.jsx file
 Makes for easily digestible chunks
*/
  export default Apps;