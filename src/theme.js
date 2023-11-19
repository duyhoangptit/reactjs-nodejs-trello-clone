import {experimental_extendTheme as extendTheme} from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// custom style global
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    /*custom light, dark*/
    // light: {
    //   palette: {
    //     primary: {
    //       main: teal[200]
    //     }
    //   },
    //   components: {
    //     // MuiCssBaseline: {
    //     //   styleOverrides: `
    //     //     div {
    //     //       color: red
    //     //     }
    //     //   `
    //     // }
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: teal[500]
    //     }
    //   },
    // }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => ({
          // color: theme.palette.primary.main,
          // fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light,
          //   color: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main,
          //   }
          // },
          '& fieldset': {
            borderWith: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWith: '1px !important'
          },
          '&.Mui-focused fieldset': {
            borderWith: '1px !important'
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // customization scrollbar
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme
