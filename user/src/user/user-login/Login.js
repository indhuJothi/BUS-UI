import React from "react";
import "./LogReg.css";
import validateLogin from "../../service/service";
import { getPassword } from "../../service/service";
import { getMobile } from "../../service/service";
import { getUsername } from "../../service/service";
import { getUseremail } from "../../service/service"
import { Redirect, withRouter } from "react-router-dom";
import { userContext } from "../../context/Context";
import Header from "../../common/header/Header";
import '../../common/header/Header.css'
import baseURL from '../../service/api'
import Swal from "sweetalert2";




class Login extends React.Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      boolean: false,
      search: false,
      register: false,
      mobileErr: "",
      passErr: "",
      userName: "",
      userEmail: "",
      gotoRegister:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(e) {
    e.preventDefault();
    this.setState({
      register: true,
    });
  }
  handleChange(event) {
    event.preventDefault();
    const mobile = event.target.name;
    const password = event.target.password;
    this.setState({
      [mobile]: event.target.value,
      [password]: event.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    let result, password, mobile, name, email;
    let mobileResult,passwordResult
    let mobileRegex = /^[6-9]\d{9}$/;
    let passRegex = /^[A-Za-z0-9@\s]{3,15}$/;
 
    if (passRegex.test(this.state.password)) {
      this.setState({
        passErr: "",
        gotoRegister:""
      });
      passwordResult=false
    }
    else{
      passwordResult=true
      this.setState({
        passErr:"Please Enter a valid password",
        gotoRegister:""
      })
    }
    if (mobileRegex.test(this.state.mobile)) {
      mobileResult = false
      this.setState({
        mobileErr: "",
        gotoRegister:""
      });
    }
    else{
      mobileResult=true
      this.setState({
        mobileErr:"Please Enter a valid mobile number",
        gotoRegister:""
      })
    }
    let newUserDetails = {
      mobile:parseInt(this.state.mobile),
      password: this.state.password,
    };
     let data
    if((mobileResult ===false) && (passwordResult===false))
    {
     this.loginUser(newUserDetails)
      .then((response) => data=response.data)
      .then((data) => {
        let token  = data.token;
        let user = data.user
       
        if(data !=="error" && data!=="Not found")
        {
          console.log(data.user)
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("user",user)
         this.setState({
           search:true,
           mobileErr:"",
           passErr:""
         })
         this.props.history.push('/search')
        }
        else if(data ==="Not found")
        {
          this.setState({
            gotoRegister:"You don't have an account please register and then login",
            search:false
          })
          
        }
        else {
          this.setState({
            mobileErr:"",
            passErr:"Please enter a valid password",
            gotoRegister:""
          })
        }
     
        });
    }
  }
  loginUser(newUserDetails) {
    let apiUrl = "/users/login";
    
    return baseURL.post(apiUrl, newUserDetails, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  
  render() {
  
    let user = this.props.isuserpass;
 
    return (
      <div>
        <Header />
        {sessionStorage.getItem("authToken") ?
         (
          <Redirect to="/search"></Redirect>
         ) : (
          <form
            onSubmit={(e) => {
              this.submit(e);
            }}
          >
            <div className="base-container">
              <div class="MainContainer center">
                <button
                  class="button"
                >
                  Login
                </button>
                <button
                  onClick={(e) => {
                    this.handleSignup(e);
                  }}
                  class="button"
                >
                  Signup
                </button>
                <div className="formheader">Login</div>
                <p class="error">{this.state.gotoRegister}</p>
                <div className="form">
                  <div>
                    <label htmlFor="Mobile">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="MobileNo"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <div class="error">{this.state.mobileErr}</div>
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(event) => {
                        this.handleChange(event);
                      }}
                    />
                    <div class="error">{this.state.passErr}</div>
                  </div>
                </div>
                <div>
                  <input type="submit" class="submitbtn"></input>
                </div>
              </div>
            </div>
          </form>
        )}
        {this.state.register && <Redirect to="/register"></Redirect> }
        {/* {this.state.search && <Redirect to="/search" />} */}
        {/* {this.state.search && user(this.state.password,this.state.userName, this.state.userEmail, this.state.mobile)} */}
      </div>
    );
  }
}

export default withRouter(Login);
