import AppLayout from './components/layout/AppLayout'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { amber } from '@material-ui/core/colors';
import Home from './pages/Home';
import Products from './pages/Products';
import Routes from './routes';
import { RemoveCurrentUserIfTokenHasExpired } from './shared/autentication';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8795a1',
      dark: '#3d4852',
      light: '#dae1e7',
      contrastText: '#fff'
    },
    secondary: amber
    
  },
  typography: {
    fontFamily: 'Dosis',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {

  //Removes/logout current user from localstorage if token has expired
  RemoveCurrentUserIfTokenHasExpired();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppLayout>
          <Routes />
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
