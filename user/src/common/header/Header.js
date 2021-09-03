import React from "react";
import "./Header.css";
import { userAuthenticated } from "../../service/api";
import { Redirect, withRouter } from "react-router-dom";
class Header extends React.Component {

  constructor(props)
  {
    super(props)
    {
      this.state={
        profile:false,
        // userData:[],
        logOut:false
      }
    }
  }
  // componentDidMount(){
  //   userAuthenticated().then((response)=>{
  //     this.setState({
  //       userData:response.data
  //     })
      
  //  })
  // }
  setprofile()
  {
    this.setState({
      profile:true
    })
  }
  logOut(){
   this.setState({
     logOut:true
   })
  }
  render(){
  return (
    <div>
      <div class="body">
        <div class="header">
          <span class="apptitle">Bus Booking App</span>
        </div>
        
        {sessionStorage.getItem("authToken") && (
          <a class="logobut">
            <span class="username">{sessionStorage.getItem("user")}</span>
            <span class="pro" onClick={(e) => this.setprofile()}>
              Profile
            </span>
            {this.state.profile ? this.props.history.push('/profile') : null}
            <button
              onClick={(e) => {
               this.logOut()
               
              }}
              class="signuplogo"
            >
            <p>Logout</p>
            </button>
          </a>
        ) }
        
        {this.state.logOut&&<Redirect to="/login"/>}
        {this.state.logOut&&sessionStorage.clear()}
      </div>
    </div>
  );
}
}

export default withRouter(Header)