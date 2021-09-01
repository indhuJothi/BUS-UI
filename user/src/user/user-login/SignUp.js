import React from "react";
import "./LogReg.css";
import data from "../../resources/user.json";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../../common/header/Header";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      mobile: "",
      password: " ",
      confirmPassword: "",
      userNameErr: "",
      emailErr: "",
      passErr: "",
      mobileerr: "",
      confirmpassErr: "",
      login: true,
      alert: null,
      redirectLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const userName = event.target.userName;
    const mobile = event.target.name;
    const password = event.target.password;
    const email = event.target.email;
    const confirmPassword = event.target.confirmPassword;
    this.setState({
      [userName]: event.target.value,
      [email]: event.target.value,
      [mobile]: event.target.value,
      [password]: event.target.value,
      [confirmPassword]: event.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      redirectLogin: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let emailRes = true;
    let mobileRes = true;
    let passwordRes = true;
    let confirmPassRes = true;
    let userNameres = true;
    let nameRegex = /^[a-zA-Z\s]{3,15}$/;
    let emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z.]+$/;
    let mobileRegex = /^[6-9]\d{9}$/;
    let passRegex = /^[A-Za-z0-9@\s]{3,15}$/;
    if (this.state.userName === "") {
      userNameres = true;
      this.setState({
        userNameErr: "Please Enter Your User Name",
      });
    } else {
      if (nameRegex.test(this.state.name)) {
        userNameres = false;
        this.setState({
          userNameErr: " ",
        });
      } else {
        userNameres = true;
        this.setState({
          userNameErr: "User Name Must Be between 3-15 Charachters",
        });
      }
    }

    if (emailRegex.test(this.state.email)) {
      emailRes = false;
      this.setState({
        emailErr: " ",
      });
    } else {
      emailRes = true;
      this.setState({
        emailErr: "Enter a valid email",
      });
    }
    if (mobileRegex.test(this.state.mobile)) {
      mobileRes = false;
      this.setState({
        mobileerr: " ",
      });
    } else {
      mobileRes = true;
      this.setState({
        mobileerr: "Enter a valid mobile",
      });
    }
    if (passRegex.test(this.state.password)) {
      passwordRes = false;
      this.setState({
        passErr: " ",
      });
    } else {
      passwordRes = true;
      this.setState({
        passErr: "Enter a valid password",
      });
    }
    if (this.state.confirmPassword === " ") {
      confirmPassRes = true;
      this.setState({
        confirmpassErr: "Please Enter Your Password",
      });
    } else if (this.state.password === this.state.confirmPassword) {
      confirmPassRes = false;
      this.setState({
        confirmpassErr: " ",
      });
    } else {
      confirmPassRes = true;
      this.setState({
        confirmpassErr: "password are not same",
      });
    }

    if (
      (userNameres ||
        emailRes ||
        mobileRes ||
        passwordRes ||
        confirmPassRes) === false
    ) {
      const getAlert = () => (
        <SweetAlert success title="!" onConfirm={() => this.hideAlert()}>
          You are signed in successfully
          <p>You can now Login</p>
        </SweetAlert>
      );
      this.setState({
        alert: getAlert(),
      });
      const newUser ={
        name:this.state.userName,
        email:this.state.email,
        mobile:this.state.mobile,
        password:this.state.password
        }
       console.log(this.state.password)
        this.registerUser(newUser)
        .then(response => response.data)
         console.log(newUser)
         if(data){
           console.log(data)
        //  const {history}=this.props
        //  history.push('/login')
         }
    }
  }
  hideAlert() {
    this.setState({
      alert: null,
      login:false
    });
    //  const {history}=this.props
    //      history.push('/login')
  }


  registerUser(newUserDetails){
    let apiUrl = 'http://localhost:5000/users/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className="base-container">
            <div class="MainContainer center">
              <button onClick={this.handleLogin} class="button">
                Login
              </button>
              <button class="button">
                Signup
              </button>
              <div className="formheader">Signup</div>
              <div className="form">
                <div>
                  <label htmlFor="email">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="userName"
                    onChange={this.handleChange}
                  />
                  <div class="error">{this.state.userNameErr}</div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="xyz@domain.com"
                    onChange={this.handleChange}
                  />
                  <div class="error">{this.state.emailErr}</div>
                </div>
                <div>
                  <label htmlFor="Mobile">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="MobileNo"
                    onChange={this.handleChange}
                  />
                  <div class="error">{this.state.mobileerr}</div>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                  <div class="error">{this.state.passErr}</div>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    onChange={this.handleChange}
                  />
                  <div class="error">{this.state.confirmpassErr}</div>
                </div>
              </div>
              <div>
                <input type="submit" class="submitbtn"></input>
              </div>
            </div>
          </div>
        </form>
        {this.state.alert}
        {this.state.redirectLogin ? <Redirect to="/login"></Redirect> : null}
        {this.state.login ? null : <Redirect to="/login"></Redirect>}
      </div>
    );
  }
}

export default withRouter(SignUp);
