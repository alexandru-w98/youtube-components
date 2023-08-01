import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
