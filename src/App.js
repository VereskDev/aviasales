import React from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./reduxComponents/store";
import { fetchTickets } from "./reduxComponents/ticketActions";
import Logo from "./logo/logo";
import LeftUl from "./LeftUl/LeftUl";
import MainUl from "./MainUl/MainUl";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="App">
      <Logo />
      <LeftUl />
      <MainUl />
    </div>
  );
}

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
