type ColorShades = {
  [key: number]: { value: string };
};

export type Colors = {
  primary: ColorShades;
  secondary: ColorShades;
  blue: ColorShades;
  red: ColorShades;
  overlay: ColorShades;
};

const colors: Colors = {
  primary: {
    50: { value: "#5dffe1" },
    100: { value: "#35ffda" },
    200: { value: "#0dffd3" },
    300: { value: "#03e1b8" },
    400: { value: "#03ba99" },
    500: { value: "#079e82" },
    600: { value: "#0b836d" },
    700: { value: "#0c6a59" },
    800: { value: "#0d5245" },
    900: { value: "#0c3b33" },
  },

  secondary: {
    50: { value: "#fff1da" },
    100: { value: "#ffd8ae" },
    200: { value: "#ffbf7d" },
    300: { value: "#ffa64c" },
    400: { value: "#ff8c1a" },
    500: { value: "#F6A724" },
    700: { value: "#813f00" },
    800: { value: "#4f2500" },
    900: { value: "#200b00" },
  },
  red: {
    500: { value: "#ec2f4e" },
  },
  blue: { 500: { value: "#3b82f6" } },
  overlay: {
    500: { value: "#000000" },
  },
};

const getColor = (color: keyof Colors = "primary", opacity: number = 500) =>
  colors[color]?.[opacity]?.value;

/**
 * Get the color with the specified opacity.
 * The color in the theme.
 * The opacity value (0 to 100).
 * @returns The RGBA color string with the specified opacity.
 */
const hexToRGB = (color: keyof Colors, alpha?: number, op?: number) => {
  const hex = getColor(color, op);
  const r = parseInt(hex?.slice(1, 3), 16);
  const g = parseInt(hex?.slice(3, 5), 16);
  const b = parseInt(hex?.slice(5, 7), 16);

  return `rgba(${r},${g},${b}${alpha ? `, ${alpha}` : ""})`;
};

export { colors, hexToRGB, getColor };
