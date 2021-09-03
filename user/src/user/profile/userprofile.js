import React from "react";
import { userContext } from "../../context/Context";
import logo from "../../resources/signlogo.jpg";
import "./userprofile.css";
import Menu from "../../common/menu/Menu";
import Header from "../../common/header/Header";
import { withRouter } from "react-router";
import { userAuthenticated } from "../../service/api";
import axios from "axios";


class Profile extends React.Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    {
      this.state = {
        isUpdate: true,
        name: "",
        email: "",
        pass: "",
        mobile: "",
        changePassword: false,
        isupdateData: true,
        isinputShow: false,
        userData:[]
       
      };
    }
    this.getForm = this.getForm.bind(this);
    this.getName = this.getName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.close = this.close.bind(this);
  }
  getName(e) {
    const name = e.target.name;
    const email = e.target.email;
    const mobile = e.target.mobile;
    this.setState({
      [name]: e.target.value,
      [email]: e.target.value,
      [mobile]: e.target.value,
    });
  }
  updateUser(e) {
    this.setState({
      isupdateData: false,
      isinputShow: false,
      changePassword: false,
    });
    sessionStorage.user= this.state.name===""?this.state.userData.name:this.state.name
    const data ={
    
      name : this.state.name===""?this.state.userData.name:this.state.name,
      mobile:this.state.mobile===""?this.state.userData.mobile:this.state.mobile,
      email:this.state.email===""?this.state.userData.email:this.state.email,
    }
    axios.put('http://localhost:5000/users/updateuser',data,{
      headers:{
        "Content-Type": "application/json",
        "access-token":sessionStorage.getItem("authToken")
      }
    })
  }

  getForm() {
    this.setState({
      isUpdate: false,
      isinputShow: true,
    });
  }
  close() 
  {      //  window.location.reload(true)
      this.props.history.goBack();
    
  }

  componentDidMount()
  {
    userAuthenticated().then((response)=>{
      this.setState({
        userData:response.data
      })
      
   })
  

  }
  render() {
    console.log(this.state.userData.password)
    let contextValue = this.context;
    let userName = localStorage.getItem("name");
    let userEmail = localStorage.getItem("email");
    let userMobile = localStorage.getItem("mobile")
    let isinputShow = this.state.isinputShow;
    let isupdateData = this.state.isupdateData;
    let isUpdate = this.state.isUpdate;

    return (
      <div>
        <div>
          <Menu />
          <Header />
          <div class="profile">
            <>
              <div class="profilepic">
                <img class="profilelogo" alt="logo" src={logo}></img>
              </div>
              <button onClick={this.getForm}>Edit</button>
              <button onClick={this.close}>Close</button>
              <button
                onClick={() => {
                  this.props.history.push("/password");
                }}
              >
                ChangePassword
              </button>
              <div class="profiledetails">
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Name: <span class="info1">{this.state.userData.name}</span>
                    </span>
                  </div>
                ) : this.state.name === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Name:<span class="info1">{this.state.userData.name}</span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Name:<span class="info1">{this.state.name}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Email:<span class="info1">{this.state.userData.email}</span>
                    </span>
                  </div>
                ) : this.state.email === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Email:<span class="info1">{this.state.userData.email}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Email:<span class="info1">{this.state.email}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div class="profileinfo">
                    <span class="info">
                      Mobile:<span class="info1">{this.state.userData.mobile}</span>
                    </span>
                  </div>
                ) : this.state.mobile === "" ? (
                  <div class="profileinfo">
                    <span class="info">
                      Mobile:<span class="info1">{this.state.userData.mobile}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span class="info">
                      Mobile:<span class="info1">{this.state.mobile}</span>
                    </span>
                  </div>
                )}
              </div>
            
              <div class="updatedetails">
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={this.state.userData.name}
                    type="text"
                    placeholder="Name to Upadte"
                    name="name"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={this.state.userData.email}
                    type="text"
                    name="email"
                    placeholder="Email to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    class="inputdetail"
                    defaultValue={this.state.userData.mobile}
                    type="text"
                    name="mobile"
                    placeholder="Mobile No to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <button class="inputbutton" onClick={this.updateUser}>
                    Save
                  </button>
                ) : null}
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
