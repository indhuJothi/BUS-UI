import React, { Component } from "react";
import Ticket from '../bus/ticket/Ticket';
import Menu from "../common/menu/Menu";
import Profile from '../user/profile/userprofile';
import SeatList from "../bus/seats/SeatPage";
import TicketForm from "../bus/ticketform/TicketForm";
import PrivateRoute from "./private";
import HistoryTable from "../user/user-history/userHistory";
import Search from "../bus/search/Search";
import Login from "../user/user-login/Login";
import signUp from "../user/user-login/SignUp";
import { userContext } from "../context/Context";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ChangePassword from "../user/profile/userPassword"

class RouteTable extends Component {
  constructor() {
    super();
    {
      this.state = {
        isUserLoggedin: false,
        password: "",
        userName: "",
        email: "",
        mobile: "",
      };
      this.getPassword = this.getPassword.bind(this);
    }
  }

  getPassword(password, userName, email, mobile) {
    this.setState({
      password: password,
      userName: userName,
      email: email,
      mobile: mobile,
    });
  }
  render() {
    let getPassword = this.getPassword;
    let password = this.state.password;
    let userName = this.state.userName;
    let email = this.state.email;
    let mobile = this.state.mobile;
    let userDetails = {
      username: userName,
      email: email,
      mobile: mobile,
      password: password,
    };
    return (
      <userContext.Provider value={userDetails}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>
            <Route path="/login">
              <Login isuserpass={getPassword.bind(this)} />
            </Route>
            <Route exact path="/register" component={signUp} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/book-seat" component={SeatList} />
            <PrivateRoute path="/ticket-form" component={TicketForm} />
            <PrivateRoute path="/ticket" component={Ticket} />
            <Route exact path="/user-history" component={HistoryTable} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute exact path='/password' component={ChangePassword}/>
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    );
  }
}

export default RouteTable;
