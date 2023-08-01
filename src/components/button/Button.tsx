import React from "react";
import { FC } from "react";
import { ButtonProps } from "./Button.types";
import "./Button.css";

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
