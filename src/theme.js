import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#1364A6'},
    secondary: {main: '#F5A623'},
    info: {main: '#D0DDE8'},
    warning: {main: '#57a757'},
    grey1: {main: '#898888'},
    grey2: {main: '#8E8E93'},
    white: {main: '#FFFFFF'},
    black: {main: '#000000'}
  },

  typography: {
    fontFamily: [
      '"Noto Sans"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    h3: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    h4: {
      fontSize: 14
    },
    h5: {
      fontSize: 12,
      fontWeight: 'light'
    }
  }
})

export default theme
