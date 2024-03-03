// import React, {useState, useEffect} from "react";
import {Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import "../../Styles/grafico.css" 

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip
)

const Grafico = () => {

  return (
      <div className="grafico">
        
      </div>
  );
};

export default Grafico;