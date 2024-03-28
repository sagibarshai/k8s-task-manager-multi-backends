import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      colors: {
        darks: {
          backgrounds: {};
          texts: {};
        };
        lights: {
          backgrounds: { appBackground: string; aqua: string; black: string; purple: string; gray: string };
          texts: { white: string; black: string; aqua: string; purple: string };
          disabled: {
            gray: string;
            aqua: string;
            purple: string;
          };
          errors: {
            red: string;
          };
        };
      };
    };
    fonts: {
      sizes: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        subtitle: string;
        title: string;
      };
      weights: {
        xs: number;
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
      };
      styles: {};
      latterSpacings: {};
      colors: {};
    };
    spaces: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    border: {
      colors: { black: string; aqua: string; aquaAlpha5: string; purple: string; gray: string; white: string };
      width: { m: string; l: string };
      radiuses: { m: string; l: string; xl: string };
      style: {
        regular: string;
      };
    };
    inputs: {
      sizes: {
        m: { height: string; width: string };
        s: { height: string; width: string };
      };
      text: {
        labels: {
          sizes: {
            m: string;
          };
          weights: { m: number };
        };
      };
      placeholders: {
        colors: { blackAlpha7: string; purpleAlpha7: string };
      };
      textarea: {
        sizes: {
          m: { height: string; width: string };
        };
      };
    };
    icons: {
      sizes: { m: number; xl: number };
      colors: { aqua: string; aquaDisabled: string; white: string; purple: string; black: string; gray: string };
    };
  }
}
