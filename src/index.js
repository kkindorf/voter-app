import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import Signin from './components/auth/sign-in';
import Signout from './components/auth/sign-out';
import Signup from './components/auth/sign-up';
import UserProfile from './components/user-profile/profile';
import Poll from './components/poll/poll.js';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
//if we have a token, consider user to be signed in
if(token) {
  //we need to update application state
  store.dispatch({ type: AUTH_USER })
}
ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="signin" component={Signin}/>
      
      <Route path="signup" component={Signup}/>
      <Route path="user/:id" component={RequireAuth(UserProfile)}/>
      <Route path="poll/:id" component={Poll}/>
    </Route>
  </Router>
  </Provider>
  , document.querySelector('.container'));
