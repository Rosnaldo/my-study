import {
  alpha,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider as MaterialThemeProvider
} from '@material-ui/core';
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { env } from '~/helpers/env';
import { transition, vh } from '~/helpers/style';
import GTUltraRegular from '~/assets/fonts/GT-Ultra-Regular.ttf';
import GTUltraBold from '~/assets/fonts/GT-Ultra-Bold.ttf';
import GTUltraLight from '~/assets/fonts/GT-Ultra-Light.ttf';
import GTUltraThin from '~/assets/fonts/GT-Ultra-Thin.ttf';
import GaramondPremrPro from '~/assets/fonts/GaramondPremrPro.ttf';
import HwAtlanticMedium from '~/assets/fonts/HWAtlantic-Medium.ttf';
import HwAtlanticLight from '~/assets/fonts/HWAtlantic-Light.ttf';

export const palette = {
  primary: '#001E60',
  primaryDark: '#001E60',
  background: '#001E60',
  paper: '#001E60',
  white: '#fff',
  black: '#001E60',
  floor: '#ece8e5',
  error: 'red'
};

export const theme = responsiveFontSizes(
  createTheme({
    shape: {
      borderRadius: 0
    },
    palette: {
      background: {
        default: palette.background,
        paper: palette.paper
      },
      divider: palette.primaryDark,
      text: {
        primary: palette.white
      },
      primary: {
        main: palette.white,
        dark: palette.primaryDark
      },
      common: {
        white: palette.white,
        black: palette.black
      }
    },
    typography: {
      fontFamily: 'GT Ultra'
    },
    breakpoints: {
      values: {
        '4k': 2560,
        '1080p': 1800,
        xl: 1920,
        lg: 1280,
        md: 960,
        sm: 600,
        xs: 0
      }
    },
    overrides: {
      MuiButton: {
        contained: {
          background: palette.paper,
          color: 'white',

          '&:hover': {
            backgroundColor: alpha(palette.primaryDark, 0.9),
            boxShadow: 'none',
            '@media (hover: none)': {
              backgroundColor: alpha(palette.primaryDark, 0.9),
              boxShadow: 'none'
            }
          }
        },
        outlined: {
          border: `solid 1px ${palette.paper}`,
          color: palette.paper,
          boxShadow: 'none'
        }
      },
      MuiTypography: {
        colorPrimary: {
          color: palette.paper
        }
      },
      MuiCheckbox: {
        colorSecondary: {
          '&$checked': palette.primaryDark
        }
      },
      MuiAccordion: {
        root: {
          '&$expanded': {
            margin: 'auto'
          }
        },
        expanded: {}
      },
      MuiAccordionSummary: {
        root: {
          '&$expanded': {
            minHeight: 48
          }
        },
        content: {
          '&$expanded': {
            margin: 0
          }
        }
      },
      MuiAccordionDetails: {
        root: {
          padding: '1em 1.5em'
        }
      }
    }
  })
);

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "GT Ultra";
      src: url(${GTUltraBold}) format("truetype");
      font-weight: 600;
    } 

    @font-face {
      font-family: "GT Ultra";
      src: url(${GTUltraRegular}) format("truetype");
      font-weight: 400;
    }

    @font-face {
      font-family: "GT Ultra";
      src: url(${GTUltraLight}) format("truetype");
      font-weight: 300;
    }

    @font-face {
      font-family: "GT Ultra";
      src: url(${GTUltraThin}) format("truetype");
      font-weight: 200;
    }

    @font-face {
      font-family: "Garamond";
      src: url(${GaramondPremrPro}) format("truetype");
      font-weight: 400;
    }

    @font-face {
      font-family: "Hw Atlantic";
      src: url(${HwAtlanticMedium}) format("truetype");
      font-weight: 400;
    }

    @font-face {
      font-family: "Hw Atlantic";
      src: url(${HwAtlanticLight}) format("truetype");
      font-weight: 200;
    }

    html,
    body,
    #root {
      transition: ${transition('height', '0.2s')};
      height: ${vh(100)};
      font-size: ${vh(1.6)};
    }
    body {
      overflow: hidden;
    }
    .MuiButton-root: {
      color: 'white';
    }
    .MuiButton-root.MuiButton-contained {
      border-width: 0.2em;
    }
    .MuiButton-root.MuiButton-outlined {
      border-width: 0.2em;
    }
    .MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary {
      border-width: 0.2em;
    }
    *::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    *::-webkit-scrollbar-thumb {
      background: #7774;
      border-radius: 0px;
    }
    *::-webkit-scrollbar-thumb:hover {
      background: #7777;
      border-radius: 0px;
    }
    *::-webkit-scrollbar-track {
      background: transparent;
    }

    * {
      -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -o-user-select: none;
      user-select: none;
    }

    .horizontal-filter-set-menu-popover {
      .MuiDivider-root.horizontal-filter-set-divider {
        background-color: white;
        margin-left: -1rem;
        margin-right: -1rem;
      }

      .MuiPopover-paper {
        width: 18rem;
        background: ${palette.paper};

        #horizontal-filter-set-interior-sqft {
          margin: 0;
        }
      }
    }

    #horizontal-filter-set-menu-popover-search-lines,
    #horizontal-filter-set-menu-popover-search-floor {
      .MuiPopover-paper {
        padding-top: 0.5rem;
        width: 12rem;
        height: 25rem;
        scrollbar-gutter: stable;
        scrollbar-width: none;

        .MuiButton-root {
          padding: .5rem 1rem;
        }
      }
    }

    #horizontal-filter-set-menu-popover-search-options {
      .MuiPopover-paper {
        width: 18rem;
        scrollbar-gutter: stable;
        scrollbar-width: none;

        .MuiButton-root {
          padding: .5rem 1.5rem;
        }
      }
    }

    #horizontal-filter-set-interior-sqft,
    #horizontal-filter-set-exterior-sqft {
      margin: 1rem 0 !important;

      .MuiSlider-thumb {
        width: 1.2rem;
        height: 1.2rem;
        background: ${palette.paper};
        border: 0.1rem solid white;
        margin-top: -0.5rem;
      }
    }
  `;

const CompanionGlobalStyle = createGlobalStyle`
  * {
    cursor: none;
  }

  html, body {
    cursor: none;
  }
`;

const generateClassName = createGenerateClassName({
  productionPrefix: 'c'
});

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    function handleResize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // sometimes ipad doesn't trigger a window resize when changing the orientation
    // this tries to detect the new viewport height after changing the orientation
    function handleOrientationChange() {
      let tries = 0;
      const interval = setInterval(() => {
        handleResize();
        if (tries >= 20) clearInterval(interval);
        tries++;
      }, 50);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('deviceorientation', handleOrientationChange);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('deviceorientation', handleOrientationChange);
    };
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        {env.IS_COMPANION && <CompanionGlobalStyle />}
        {children}
      </MaterialThemeProvider>
    </StylesProvider>
  );
};
