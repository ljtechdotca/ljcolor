import { ChangeEvent, useEffect, useRef, useState } from "react";
import canvas from "../helpers/canvas";
import format from "../helpers/format";

const useCanvas = (height: number) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [light, setLight] = useState(50);

  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);
  const gradientContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const swatchCanvasRef = useRef<HTMLCanvasElement>(null);
  const swatchContextRef = useRef<CanvasRenderingContext2D | null>(null);

  /**
   * Initialize Reference Objects
   */
  useEffect(
    function initRefObjects() {
      const gradientCanvas = gradientCanvasRef.current;
      const swatchCanvas = swatchCanvasRef.current;
      if (gradientCanvas && swatchCanvas) {
        gradientCanvas.height = height;
        gradientCanvas.width = gradientCanvas.offsetWidth;
        swatchCanvas.height = height;
        swatchCanvas.width = gradientCanvas.offsetWidth;
        const gradientCtx = gradientCanvas.getContext("2d");
        const swatchCtx = swatchCanvas.getContext("2d");
        if (gradientCtx && swatchCtx) {
          gradientCtx.fillStyle = "red";
          gradientContextRef.current = gradientCtx;
          swatchContextRef.current = swatchCtx;
          canvas.color(
            gradientCtx,
            format.hsl(hue, saturation, light),
            gradientCanvas.offsetWidth,
            height
          );
          canvas.light(gradientCtx, 0, gradientCanvas.offsetWidth, height);
          canvas.dark(gradientCtx, 0, gradientCanvas.offsetWidth, height);
          canvas.color(
            swatchCtx,
            format.hsl(hue, saturation, light),
            swatchCanvas.offsetWidth,
            height
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [height]
  );

  /**
   * Initialize / Cleanup Event Listeners
   */
  useEffect(
    function initEventListeners() {
      const { gradientCanvas, gradientContext, swatchCanvas, swatchContext } =
        canvas.details(
          gradientCanvasRef,
          gradientContextRef,
          swatchCanvasRef,
          swatchContextRef
        );

      if (gradientCanvas && gradientContext && swatchCanvas && swatchContext) {
        gradientCanvas.addEventListener("click", (event) => {
          const rect = (event.target as any).getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const imgData = gradientContext.getImageData(x, y, 1, 1);
          const [red, green, blue] = [
            imgData.data[0],
            imgData.data[1],
            imgData.data[2],
          ];
          const [hue, saturation, light] = format.rgbToHsl(red, green, blue);
          setHue(hue);
          setSaturation(saturation);
          setLight(light);
          canvas.color(
            swatchContext,
            format.hsl(hue, saturation, light),
            swatchCanvas.offsetWidth,
            height
          );
        });
      }
      return () => {
        gradientCanvas.removeEventListener("click", (event) => {
          const rect = (event.target as any).getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const imgData = gradientContext.getImageData(x, y, 1, 1);
          const [red, green, blue] = [
            imgData.data[0],
            imgData.data[1],
            imgData.data[2],
          ];
          const [hue, saturation, light] = format.rgbToHsl(red, green, blue);
          setHue(hue);
          setSaturation(saturation);
          setLight(light);
          canvas.color(
            swatchContext,
            format.hsl(hue, saturation, light),
            swatchCanvas.offsetWidth,
            height
          );
        });
      };
    },
    [height]
  );

  const changeHue = (event: ChangeEvent<HTMLInputElement>) => {
    const { gradientCanvas, gradientContext, swatchCanvas, swatchContext } =
      canvas.details(
        gradientCanvasRef,
        gradientContextRef,
        swatchCanvasRef,
        swatchContextRef
      );

    if (
      event.target instanceof HTMLInputElement &&
      gradientCanvas &&
      gradientContext &&
      swatchCanvas &&
      swatchContext
    ) {
      const hue = Number(event.target.value);
      setHue(hue);
      canvas.color(
        gradientContext,
        format.hsl(hue, 100, 50),
        gradientCanvas.offsetWidth,
        height
      );
      canvas.light(gradientContext, hue, gradientCanvas.offsetWidth, height);
      canvas.dark(gradientContext, hue, gradientCanvas.offsetWidth, height);
      canvas.color(
        swatchContext,
        format.hsl(hue, saturation, light),
        swatchCanvas.offsetWidth,
        height
      );
    }
  };

  return {
    gradientCanvasRef,
    swatchCanvasRef,
    hue,
    saturation,
    light,
    changeHue,
  };
};

export default useCanvas;
