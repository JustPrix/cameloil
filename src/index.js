import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";
import Login from "views/Login.js";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import setAuthorizationToken from "variables/setAuthorizationToken";
import rootReducer from "reducers/rootReducer";
import { getUser } from "action/loginAction";

const hist = createBrowserHistory();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ) 
);

if(localStorage.getItem("refreshtoken") != null){
  setAuthorizationToken(localStorage.getItem("refreshtoken"));
  store.dispatch(getUser());
}


ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>     
      <Route path="/login" render={(props) => <Login {...props}/>} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect exact to="/login" />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
