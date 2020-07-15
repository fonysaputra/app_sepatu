import React, { Component } from "react";

import AppReducer from "./src/Reducer/Index";
import Routes from "./src/Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import promise from "redux-promise-middleware";

const middlewares = applyMiddleware(logger, promise);

export default class App extends Component {
  store = createStore(AppReducer, middlewares);
  render() {
    return (
      <Provider store={this.store}>
        <Routes />
      </Provider>
    );
  }
}
