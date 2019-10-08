import React from "react";
import "./error.css";

const Error = props => {
  return props.errors ? <div className="errorLabel">{props.errors.map(error => error)}</div> : null;
};

export default Error;
