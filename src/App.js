import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from './store';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import LoginPage from './components/LoginPage';
import MainComponent from './components/MainComponent';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={getPersistor()}>
        <Router>
          <HeaderComponent />
          <div className="main-component">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/list" component={MainComponent} />
            </Switch>
          </div>
          <FooterComponent />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
