import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  palette: {
    colors: {
      darks: {
        backgrounds: {},
        texts: {},
      },
      lights: {
        backgrounds: {
          appBackground: "rgba(255,255,255,1)",
          aqua: "rgba(7, 137, 179, 1)",
          purple: "rgba(51, 47, 68, 1)",
          black: "rgba(0,0,0,1)",
          gray: "rgba(245, 245, 245, 1)",
        },
        texts: { black: "rgba(0,0,0,0.8)", white: "rgba(255,255,255,1)", aqua: "rgba(7, 137, 179, 1)", purple: "rgba(51, 47, 68, 1)" },
        disabled: {
          gray: "rgba(202, 201, 201, 0.7)",
          aqua: "rgba(7, 137, 179, 0.5)",
          purple: "rgba(51, 47, 68, 1)",
        },
        errors: {
          red: "rgba(227 ,6 ,19 ,1)",
        },
      },
    },
  },
  fonts: {
    sizes: {
      xs: "10px",
      s: "12px",
      m: "16px",
      l: "18px",
      xl: "20px",
      subtitle: "24px",
      title: "30px",
    },
    weights: { xs: 300, s: 400, m: 500, l: 600, xl: 700, xxl: 900 },
    styles: {},
    latterSpacings: {},
    colors: {},
  },
  spaces: {
    xs: "4px",
    s: "8px",
    m: "24px",
    l: "32px",
    xl: "50px",
  },
  border: {
    colors: {
      black: "rgba(0,0,0,1)",
      aqua: "rgba(7, 137, 179, 1)",
      aquaAlpha5: "rgba(7, 137, 179, 0.5)",
      purple: "rgba(51, 47, 68, 1)",
      gray: "rgba(202, 202, 202, 1)",
      white: "rgba(255,255,255,1)",
    },
    width: { m: "1px", l: "2px" },
    radiuses: { m: "6px", l: "10px", xl: "16px" },
    style: {
      regular: "solid",
    },
  },
  inputs: {
    textarea: {
      sizes: {
        m: { height: "126px", width: "80%" },
      },
    },
    sizes: {
      m: { height: "42px", width: "80%" },
      s: { height: "32px", width: "80%" },
    },
    text: {
      labels: { sizes: { m: "16px" }, weights: { m: 700 } },
    },
    placeholders: {
      colors: { blackAlpha7: "rgba(0,0,0,0.7)", purpleAlpha7: "rgba(51, 47, 68, 0.7)" },
    },
  },
  icons: {
    sizes: { m: 22, xl: 40 },
    colors: {
      aqua: "rgba(7, 137, 179, 1)",
      aquaDisabled: "rgba(7, 137, 179, 0.5)",
      white: "rgba(255,255,255,1)",
      purple: "rgba(51, 47, 68, 1)",
      black: "rgba(0,0,0,1)",
      gray: "rgba(202, 202, 202, 1)",
    },
  },
};
