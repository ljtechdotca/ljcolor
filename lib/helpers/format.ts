const hsl = (hue: number, saturation: number, light: Number) => {
  return `hsl(${hue},${saturation}%,${light}%)`;
};

const hexToRgb = (hex: string) => {
  var match = hex.split("#")[1].match(/.{1,2}/g) as RegExpMatchArray;
  return `${parseInt(match[0], 16)}, ${parseInt(match[1], 16)}, ${parseInt(
    match[2],
    16
  )}`;
};

const hslToHex = (hue: number, saturation: number, light: number) => {
  light /= 100;
  const x = (saturation * Math.min(light, 1 - light)) / 100;
  const encode = (value: number) => {
    const y = (value + hue / 30) % 12;
    const color = light - x * Math.max(Math.min(y - 3, 9 - y, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${encode(0)}${encode(8)}${encode(4)}`;
};

const rgbToHsl = (red: number, green: number, blue: number) => {
  red /= 255;
  green /= 255;
  blue /= 255;
  const light = Math.max(red, green, blue);
  const saturation = light - Math.min(red, green, blue);
  const hue = saturation
    ? light === red
      ? (green - blue) / saturation
      : light === green
      ? 2 + (blue - red) / saturation
      : 4 + (red - green) / saturation
    : 0;
  return [
    ~~(60 * hue < 0 ? 60 * hue + 360 : 60 * hue),
    ~~(
      100 *
      (saturation
        ? light <= 0.5
          ? saturation / (2 * light - saturation)
          : saturation / (2 - (2 * light - saturation))
        : 0)
    ),
    ~~((100 * (2 * light - saturation)) / 2),
  ];
};

const format = {
  hexToRgb,
  hsl,
  hslToHex,
  rgbToHsl,
};

export default format;
