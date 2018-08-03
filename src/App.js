import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import NavigationBar from './components/navigation/NavigationBar';
import Home from './components/pages/Home';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import NewEvent from './components/pages/NewEvent';
/* import RequireAuth from './utils/RequireAuth'; */
import FlashMessageLists from './components/flashmessage/FlashMessageLists';
import Logout from './components/pages/Logout';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import Dashboard from './components/pages/Dashboard';
import ChatPage from './components/chat/ChatPage';
import ConfirmPage from './components/pages/ConfirmPage';
import store from './store/Store';
import UserRoute from './utils/UserRoute';
import GuestRoute from './utils/GuestRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <BrowserRouter>
            <div>
              <NavigationBar />
              <FlashMessageLists />
              <Switch>
                <Route path="/" exact component={Home} />
                <GuestRoute path="/signup" component={SignUpPage} />
                <GuestRoute path="/login" component={LoginPage} />
                <GuestRoute path="/forgotpassword" component={ForgotPasswordPage} />
                <GuestRoute path="/reset_password/:token" component={ResetPasswordPage} />
                <GuestRoute path="/confirm_user/:token" component={ConfirmPage} />
                <UserRoute path="/logout" component={Logout} />
                <UserRoute path="/event" component={NewEvent} />
                <UserRoute path="/dashboard" component={Dashboard} />
                <UserRoute path="/chat" component={ChatPage} />
              </Switch>
            </div>
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
