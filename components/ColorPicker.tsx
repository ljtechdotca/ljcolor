import { FC } from "react";
import format from "../lib/helpers/format";
import useCanvas from "../lib/hooks/use-canvas";
import styles from "./ColorPicker.module.scss";
import ColorSlider from "./ColorSlider";

interface ColorPickerProps {}

const ColorPicker: FC<ColorPickerProps> = ({}) => {
  const {
    gradientCanvasRef,
    swatchCanvasRef,
    hue,
    saturation,
    light,
    changeHue,
  } = useCanvas();

  return (
    <div className={styles.root}>
      <canvas className={styles.swatch} ref={swatchCanvasRef} />
      <div className={styles.fields}>
        <fieldset className={styles.field}>
          <legend className={styles.legend}>HEX</legend>
          <div>{format.hslToHex(hue, saturation, light)}</div>
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.legend}>RGB</legend>
          <div>{format.hexToRgb(format.hslToHex(hue, saturation, light))}</div>
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.legend}>HSL</legend>
          <div>
            {hue}, {light}%, {saturation}%
          </div>
        </fieldset>
      </div>
      <canvas className={styles.gradient} ref={gradientCanvasRef} />
      <ColorSlider hue={hue} onHueChange={changeHue} />
    </div>
  );
};

export default ColorPicker;
