import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import App from "./components/App";
import "./index.css";
//import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import { ThemeProvider } from "styled-components";
import MainContextProvider from "../src/components/views/AudioRecord/Sections/MainContext";
import Reducer from "./_reducers";
import theme from "./style/theme/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider
        store={createStoreWithMiddleware(
          Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <MainContextProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MainContextProvider>
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
