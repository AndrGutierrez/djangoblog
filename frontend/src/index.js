import React from "react";
import reactDOM from "react-dom";
import App from "./routes/App";
import "./assets/styles/index.css";
import reducers from "./store";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const MyApp = document.getElementById("App");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers, //all the reducers
  composeEnhancers(applyMiddleware())
);

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MyApp
);
