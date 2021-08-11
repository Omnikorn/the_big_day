import React, { useState } from "react";
import Clock from "./Clock.component";

const CountDown = () => {
  let deadline = "march, 7, 2022";


  return (
    <div className="App">
      
      <Clock deadline={deadline} />
    </div>
  );
};

export default CountDown;
