import { MouseEventHandler } from "react";

export interface CarouselProps {
  items: Array<string>;
  onItemClicked?: MouseEventHandler<HTMLButtonElement>;
  selectedIndex?: number;
}
