import { RefObject } from "react";

const details = (
  gradientCanvasRef?: RefObject<HTMLCanvasElement>,
  gradientContextRef?: RefObject<CanvasRenderingContext2D>,
  swatchCanvasRef?: RefObject<HTMLCanvasElement>,
  swatchContextRef?: RefObject<CanvasRenderingContext2D>
) => {
  const gradientCanvas = gradientCanvasRef?.current as HTMLCanvasElement;
  const gradientContext =
    gradientContextRef?.current as CanvasRenderingContext2D;
  const swatchCanvas = swatchCanvasRef?.current as HTMLCanvasElement;
  const swatchContext = swatchContextRef?.current as CanvasRenderingContext2D;
  return {
    gradientCanvas,
    gradientContext,
    swatchCanvas,
    swatchContext,
  };
};

const color = (
  context: CanvasRenderingContext2D,
  hsl: string,
  width: number,
  height: number
) => {
  context.fillStyle = hsl;
  context.fillRect(0, 0, width, height);
};

const dark = (
  context: CanvasRenderingContext2D,
  value: number,
  width: number,
  height: number
) => {
  const dark = context.createLinearGradient(0, 0, 0, height);
  dark.addColorStop(0, `rgba(0,0,0,0)`);
  dark.addColorStop(1, `rgba(0,0,0,1)`);
  context.fillStyle = dark;
  context.fillRect(0, 0, width, height);
};

const light = (
  context: CanvasRenderingContext2D,
  value: number,
  width: number,
  height: number
) => {
  const light = context.createLinearGradient(0, height, width, height);
  light.addColorStop(0, `rgba(255,255,255,1)`);
  light.addColorStop(1, `rgba(255,255,255,0)`);
  context.fillStyle = light;
  context.fillRect(0, 0, width, height);
};

const select = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(x, y, 8, 0, Math.PI * 2);
  context.stroke();
  context.closePath();
};

const canvas = {
  details,
  color,
  dark,
  light,
  select,
};

export default canvas;
