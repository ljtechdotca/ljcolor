import { ChangeEvent, useEffect, useRef, useState } from "react";
import canvas from "../helpers/canvas";
import format from "../helpers/format";

const useCanvas = (height: number) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [light, setLight] = useState(50);

  const positionRef = useRef<Record<string, number>>({});
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
        positionRef.current = { x: gradientCanvas.offsetWidth, y: 0 };
        gradientCanvas.height = height;
        gradientCanvas.width = gradientCanvas.offsetWidth;
        swatchCanvas.height = height;
        swatchCanvas.width = gradientCanvas.offsetWidth;
        const gradientContext = gradientCanvas.getContext("2d");
        const swatchContext = swatchCanvas.getContext("2d");
        if (gradientContext && swatchContext) {
          gradientContext.fillStyle = "red";
          gradientContextRef.current = gradientContext;
          swatchContextRef.current = swatchContext;
          canvas.color(
            gradientContext,
            format.hsl(hue, saturation, light),
            gradientCanvas.offsetWidth,
            height
          );
          canvas.light(gradientContext, 0, gradientCanvas.offsetWidth, height);
          canvas.dark(gradientContext, 0, gradientCanvas.offsetWidth, height);
          canvas.color(
            swatchContext,
            format.hsl(hue, saturation, light),
            swatchCanvas.offsetWidth,
            height
          );
          canvas.select(
            gradientContext,
            positionRef.current.x,
            positionRef.current.y
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

          positionRef.current.x = x;
          positionRef.current.y = y;

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

          gradientContext.clearRect(0, 0, gradientCanvas.offsetWidth, height);
          canvas.color(
            gradientContext,
            format.hsl(hue, 100, 50),
            gradientCanvas.offsetWidth,
            height
          );
          canvas.light(
            gradientContext,
            hue,
            gradientCanvas.offsetWidth,
            height
          );
          canvas.dark(gradientContext, hue, gradientCanvas.offsetWidth, height);
          canvas.color(
            swatchContext,
            format.hsl(hue, saturation, light),
            swatchCanvas.offsetWidth,
            height
          );
          canvas.select(gradientContext, x, y);
        });
      }
      return () => {};
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
      canvas.select(
        gradientContext,
        positionRef.current.x,
        positionRef.current.y
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
