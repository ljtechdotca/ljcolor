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
  ctx: CanvasRenderingContext2D,
  hsl: string,
  width: number,
  height: number
) => {
  console.log(hsl);
  ctx.fillStyle = hsl;
  ctx.fillRect(0, 0, width, height);
};

const dark = (
  ctx: CanvasRenderingContext2D,
  value: number,
  width: number,
  height: number
) => {
  const dark = ctx.createLinearGradient(0, 0, 0, height);
  dark.addColorStop(0, `rgba(0,0,0,0)`);
  dark.addColorStop(1, `rgba(0,0,0,1)`);
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, width, height);
};

const light = (
  ctx: CanvasRenderingContext2D,
  value: number,
  width: number,
  height: number
) => {
  const light = ctx.createLinearGradient(0, height, width, height);
  light.addColorStop(0, `rgba(255,255,255,1)`);
  light.addColorStop(1, `rgba(255,255,255,0)`);
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, width, height);
};

const canvas = {
  details,
  color,
  dark,
  light,
};

export default canvas;
