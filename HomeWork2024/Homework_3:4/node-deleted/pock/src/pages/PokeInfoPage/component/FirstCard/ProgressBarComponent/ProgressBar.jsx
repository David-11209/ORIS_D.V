import React from "react";
import "./ProgressBarStyle.css"

const ProgressBar = ({ label, value, color }) => {
    const progressBarStyles = {
        width: `${value*1.5}%`,
        backgroundColor: color
    };

    return (
        <div>
            <p className="AbilityLabel">{label}</p>
            <div className="Container">
                <div className="progressBar" style={{backgroundColor: color}}></div>
                <div className="progress" style={progressBarStyles}></div>
            </div>
        </div>

    );
};
  
  export default ProgressBar;