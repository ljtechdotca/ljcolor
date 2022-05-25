import { ChangeEvent, FC } from "react";
import styles from "./ColorSlider.module.scss";

interface ColorSliderProps {
  onHueChange: (event: ChangeEvent<HTMLInputElement>) => any;
  hue: number;
}

const ColorSlider: FC<ColorSliderProps> = ({ onHueChange, hue }) => {
  return (
    <div className={styles.root}>
      <style>{`::-moz-range-thumb{background:hsl(${hue},100%,50%);}::-webkit-slider-thumb{background:hsl(${hue},100%,50%);}`}</style>
      <input
        className={styles.base}
        max={360}
        min={0}
        name="hue"
        onChange={onHueChange}
        type="range"
        value={hue}
      />
    </div>
  );
};

export default ColorSlider;
