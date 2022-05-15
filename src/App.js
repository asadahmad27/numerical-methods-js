import styles from './App.module.css';

import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Menu from "./components/menu/Menu";
import NotFound from "./components/NotFound";
import categories from "./constants/categories";
import { generatePath } from "./components/utils";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {
  Switch,
  Route,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e0e0e0'
    }
  }
});
function App() {

  const styleClasses = useStyles();

  return (

    <MuiThemeProvider theme={theme}>

      <CssBaseline />
      <Container>
        <div className={styleClasses.root}>
          <ErrorBoundary>
            <Switch>
              <Route exact path={generatePath()}>
                <Menu />
              </Route>
              {
                categories?.map((category, i) => (
                  category?.methods.map((method, j) => (
                    <Route key={i + j} exact path={generatePath('allMethods', method.path)}
                      component={
                        () => <method.component methodName={method.name} markdown={method.markdown} />
                      } />
                  ))
                )).reduce((previous, next) => previous.concat(next), [])
              }
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;