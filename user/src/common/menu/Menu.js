import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import "./Menu.css";
import { withRouter } from "react-router";
import { userAuthenticated } from "../../api";

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Router>
            <ul>
              <li class="li">
                <NavLink
                  class="link"
                  activeStyle={{ color: "red" }}
                  to="/search"
                  onClick={()=>{this.props.history.push('/search')}}
                >
                  Search
                </NavLink>
              </li>
              <li class="li">
                <NavLink
                  class="link"
                  activeStyle={{ color: "red" }}
                  to="/user-history"
                  onClick={()=>{this.props.history.push('/user-history')}}
                >
                  User History
                </NavLink>
              </li>
            </ul>
          </Router>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
