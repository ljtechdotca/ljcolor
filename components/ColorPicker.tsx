import { FC } from "react";
import format from "../lib/helpers/format";
import useCanvas from "../lib/hooks/use-canvas";
import styles from "./ColorPicker.module.scss";
import ColorSlider from "./ColorSlider";

interface ColorPickerProps {
  height: number;
}

const ColorPicker: FC<ColorPickerProps> = ({ height }) => {
  const {
    gradientCanvasRef,
    swatchCanvasRef,
    hue,
    saturation,
    light,
    changeHue,
  } = useCanvas(height);

  return (
    <div className={styles.root}>
      <header className={styles.heading}>https://ljcolor.vercel.app</header>
      <canvas className={styles.gradient} ref={gradientCanvasRef} />
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
      <ColorSlider hue={hue} onHueChange={changeHue} />
      <canvas className={styles.swatch} ref={swatchCanvasRef} />
    </div>
  );
};

export default ColorPicker;
