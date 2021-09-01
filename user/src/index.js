import React from "react";
import ReactDOM from "react-dom";
import RouteTable from "../src/service/routeprocess";
import Header from "./common/header/Header";
import "./index.css";



ReactDOM.render(
  <React.StrictMode>
    
    <RouteTable/>
  </React.StrictMode>,
  document.getElementById("root")
);
