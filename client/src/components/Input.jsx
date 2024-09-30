import React from "react";

const Input = (props) => {
  return (
  <input 
    placeholder={props.placeholder}
    type={props.type}
    name={props.name}
    onChange={props.change}
    maxLength={props.length}
    autoComplete="flase"
    required
  />
)
};

export default Input; 
