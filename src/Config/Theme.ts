import config from ".";

const colors = {
  light: {
    //light theme colors
  },
  dark: {
    //dark theme colors
  }
} as const;

export type ColorType =  keyof typeof colors | undefined
export default colors[config.theme as ColorType || (config.darkMode ? "dark" : "light")];
