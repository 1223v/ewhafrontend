import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import persistedReducer from './_reducers';
import { CookiesProvider } from 'react-cookie';
//import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import Reducer from './_reducers';
import MainContextProvider from './components/views/AudioRecordPage/Sections/contexts/MainContext.js';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CookiesProvider>
		<BrowserRouter>
			<Provider
				store={createStoreWithMiddleware(
					Reducer,
					window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
				)}
			>
				<MainContextProvider>
					<App />
				</MainContextProvider>
			</Provider>
		</BrowserRouter>
	</CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals