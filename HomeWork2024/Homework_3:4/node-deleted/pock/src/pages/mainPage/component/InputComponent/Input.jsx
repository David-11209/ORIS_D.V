import React from "react";
import "./InputStyle.css";

const InputComponent = ({ value, onChangeValue, onSubmit }) => {
  return (
    <div className="InputContainer">
      <input
        className="Input"
        type="text"
        onChange={(s) => onChangeValue(s.target.value)}
        value={value}
        placeholder="e.g. Pikachu"
      />
      <button className="Button" onClick={onSubmit}>
        GO
      </button>
    </div>
  );
};

export default InputComponent;