import React from "react";
import logo from "../../resources/signlogo.jpg";
import Header from "../../common/header/Header";
import Menu from "../../common/menu/Menu";
import "./userprofile.css";
import data from "../../resources/user.json";
import SweetAlert from "react-bootstrap-sweetalert";
import { userAuthenticated } from "../../service/api";
import axios from "axios";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        prevPassword: "",
        currentPassword: "",
        rePassword: "",
        alert: null,
        update: false,
        passErr: "",
        prevPassErr:"",
        userData: [],
      };
    }
    this.updatePassword = this.updatePassword.bind(this);
  }

  updatePassword(e) {
    e.preventDefault();

    const getAlert = () => (
      <SweetAlert
        success
        title="!"
        timeout="5000"
        onConfirm={() => this.hideAlert()}
      >
        As you changed your password, you are redirected to login page for
        security purpose
        <p>You have to login again</p>
      </SweetAlert>
    );
    if (this.state.currentPassword !== this.state.rePassword) {
      this.setState({
        passErr: "Password are not same",
        alert: null,
      });
    } else {
      if (this.state.currentPassword === "" && this.state.rePassword === "") {
        this.setState({
          alert: null,
          passErr: "Please Enter a Password To Update",
        });
      } else if (this.state.password !== "" && this.state.rePassword !== "") {
      
        const data = {
          password: this.state.currentPassword,
          oldPassword: this.state.prevPassword,
        };
        axios.put("http://localhost:5000/users/updatepassword", data, {
          headers: {
            "Content-Type": "application/json",
            "access-token": sessionStorage.getItem("authToken"),
          },
        }).then((response)=>{
             if(response.data==="error")
             {
               this.setState({
                 prevPassErr:"Please provide a vaild current password",
                 alert:null,
                 update:false
               })
             }
             else{
              this.setState({
                update: true,
                prevPassErr:"",
                alert: getAlert(),
              });
             
             }
        })
      }
    }
  }

  hideAlert() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user")
    
    this.props.history.push("/");
    this.setState({
      alert: null,
    });
  }
  componentDidMount() {
    userAuthenticated().then((response) => {
      this.setState({
        userData: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <Header />
        <div class="profile">
          <>
            <div class="profilepic">
              <img class="profilelogo" alt="logo" src={logo}></img>
              <div class="profileinfo">
              <p class="error">{this.state.prevPassErr}</p>
                <span class="info">
                  Old Password:
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={(e) =>
                      this.setState({ prevPassword: e.target.value })
                    }
                    class="info1"
                  ></input>
                </span>
              </div>
              <form>
                <span class="info">
                  New Password:
                  <input
                    class="info1"
                    type="password"
                    name="currentPassword"
                    placeholder="Password to Update"
                    onChange={(e) =>
                      this.setState({ currentPassword: e.target.value })
                    }
                  />
                 
                </span>
                <span class="info">
                  Re-Type New Password:
                  <input
                    class="info1"
                    type="password"
                    name="rePassword"
                    placeholder="Password to Update"
                    onChange={(e) => {
                      this.setState({ rePassword: e.target.value });
                    }}
                  />
                </span>
              </form>
              <p class="error">{this.state.passErr}</p>
              {this.state.update
                ? data.user.filter((element) => {
                    if (
                      element.password === sessionStorage.getItem("password")
                    ) {
                      if (
                        this.state.currentPassword !== "" &&
                        this.state.currentPassword !== this.state.prevPassword
                      ) {
                        element.password = this.state.currentPassword;
                      }
                    }
                  })
                : null}
              {this.state.alert}
              <button onClick={this.updatePassword}>Save</button>
            </div>
          </>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
