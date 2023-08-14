import React, { ReactNode, useRef, useState } from "react";
import { FC } from "react";
import { addIndex, equals, map } from "ramda";
import { CarouselProps } from "./carousel.types";
import styles from "./carousel.module.css";
import { notEquals } from "../../utils/not-equals";
import { selectCurrentWidth } from "../../selectors";

const Carousel: FC<CarouselProps> = ({
  items,
  onItemClicked,
  selectedIndex,
}) => {
  const [listTranslateX, setListTranslateX] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const translateOffset = 100;

  const defaultItemTemplate = (item: any, index: any): ReactNode => {
    const selectedClasses =
      index === selectedIndex ? styles["carousel__item--selected"] : "";

    return (
      <button
        className={`${styles["carousel__item"]} ${selectedClasses}`}
        onClick={onItemClicked}
      >
        {item}
      </button>
    );
  };

  const onLeftArrowClicked = () => {
    setListTranslateX((prev) => {
      return listTranslateX + translateOffset <= 0 ? prev + translateOffset : 0;
    });
  };

  const onRightArrowClicked = () => {
    const listWidth = listRef.current!.clientWidth;
    const carouselWidth = carouselRef.current!.clientWidth;
    const maxTranslate = listWidth - carouselWidth;

    setListTranslateX((prev) => {
      return maxTranslate >= translateOffset - listTranslateX
        ? prev - translateOffset
        : prev - Math.max(maxTranslate + listTranslateX, 0);
    });
  };

  const carouselListStyle = {
    transform: `translateX(${listTranslateX}px)`,
  };

  const signedMaxTranslate =
    selectCurrentWidth(carouselRef) - selectCurrentWidth(listRef);

  const itemsList: ReactNode[] = addIndex(map)(defaultItemTemplate, items);
  return (
    <div className={styles["test"]}>
      <div className={styles["carousel"]}>
        <div ref={carouselRef}>
          {notEquals(0)(listTranslateX) && (
            <button
              onClick={onLeftArrowClicked}
              className={`${styles["carousel__arrow--left"]} ${styles["carousel__arrow"]}`}
            >
              &lt;
            </button>
          )}
          <div
            className={styles["carousel__list"]}
            style={carouselListStyle}
            ref={listRef}
          >
            {itemsList}
          </div>
          {notEquals(signedMaxTranslate)(listTranslateX) && (
            <button
              onClick={onRightArrowClicked}
              className={`${styles["carousel__arrow--right"]} ${styles["carousel__arrow"]}`}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
