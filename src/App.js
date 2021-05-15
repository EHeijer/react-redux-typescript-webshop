import AppLayout from './components/layout/AppLayout'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { amber } from '@material-ui/core/colors';
import Home from './pages/Home';
import Products from './pages/Products';
import Routes from './routes';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#515151',
      dark: '#262626',
      light: '#dedede',
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppLayout>
          <Routes />
          {/* <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
          </Switch> */}
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
