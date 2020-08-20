import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./components/App/App.css";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import dragReducer from "./components/store/reducers/drag";

const rootReducer = combineReducers({
	dragReducer: dragReducer,
});

function loadFromLocal() {
	try {
		const state = localStorage.getItem("state");
		if (state === null) return undefined;
		return JSON.parse(state);
	} catch (err) {
		console.log(err);
	}
}

const persistedState = loadFromLocal();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
	saveToLocal(store.getState());
});

function saveToLocal(statex) {
	try {
		const state = JSON.stringify(statex);
		localStorage.setItem("state", state);
	} catch (err) {
		console.log(err);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);
