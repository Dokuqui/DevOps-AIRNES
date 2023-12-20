import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const rootElement = document.getElementById('root');
const root = rootElement.createRoot ? rootElement.createRoot() : ReactDOM;
root.render(<App />, rootElement);