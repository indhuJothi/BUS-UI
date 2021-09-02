import React from "react";
import bushistory from "../../resources/bushistory.json";
import Menu from "../../common/menu/Menu";
import "./Ticket.css";
import { withRouter } from "react-router-dom";
import Header from "../../common/header/Header";
import userdata from '../../resources/userhistory.json'
import { userAuthenticated } from "../../service/api";




class Ticket extends React.Component {
  constructor() {
    super();
    {
      this.state = { isbool: true,
                     userData:[] };
    }
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  submit() {
    let bushistoryPushDetails;
    let busDetails = JSON.parse(sessionStorage.getItem("busdetails"));
    let searchDetails = JSON.parse(sessionStorage.getItem("searchdetails"));
    let passengerName = JSON.parse(sessionStorage.getItem("PassengerName"));
    busDetails.NoOfSeats =busDetails.NoOfSeats - sessionStorage.getItem("seatcount");
    bushistoryPushDetails = {
      id: searchDetails.id,
      mobile: this.state.userData.mobile,
      userId: searchDetails.userid,
      busno: busDetails.busno,
      busname: busDetails.busname,
      totalfare: sessionStorage.getItem("seatcount") * busDetails.fare,
      numberofseats: sessionStorage.getItem("seatcount"),
      date: searchDetails.date,
      from: busDetails.from,
      to: busDetails.to,
    };
    bushistory.userbusbooking.push(bushistoryPushDetails);
    let setReservedseats = JSON.parse(sessionStorage.getItem("seats"));
    let userpushDetails;
    userpushDetails = {
      userbusbookingid: searchDetails.id,
      name:passengerName ,
      mobile: this.state.userData.mobile
    };
    userdata.buspassanger.push(userpushDetails)
    this.setState({
      isbool: false,
    });
    this.props.history.push('/user-history')
  }

  goBack() {
    this.props.history.goBack();
  }

   componentDidMount(){
    userAuthenticated().then((response)=>{
      this.setState({
        userData:response.data
      })
      
   })
   }
  render() {
    let passenger;
    let busDetails = JSON.parse(sessionStorage.getItem("busdetails"));
    let searchDetails = JSON.parse(sessionStorage.getItem("searchdetails"));
    let passengerName = JSON.parse(sessionStorage.getItem("PassengerName"));
    return (
      <div>
        <Header />
        <Menu />
        <div class="ticket">
          <button class="goBack" onClick={this.goBack}>
            BACK
          </button>
          <h1>Booking Details</h1>
          <label class="info">
            Userbookingid:<span class="info1"> {searchDetails.userid}</span>
          </label>

          <br></br>
          <label class="info">
            Name:
            <span class="info1">
              {
                (passenger = passengerName.map((elem, i) => {
                  return i + 1 + "." + elem + " ";
                }))
              }
            </span>
          </label>
          <br></br>
          <label class="info">
            Mobile:<span class="info1">{this.state.userData.mobile}</span>
          </label>
          <br></br>
          <label class="info">
            Seatno:<span class="info1">{sessionStorage.getItem("seats")}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Date:<span class="info1">{searchDetails.date}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Fare:
            <span class="info1">
              {sessionStorage.getItem("seatcount") * busDetails.fare}
            </span>{" "}
          </label>
          <br></br>
          <label class="info">
            From:<span class="info1">{busDetails.from}</span>
          </label>
          <br></br>
          <label class="info">
            To:<span class="info1">{busDetails.to}</span>
          </label>
          <br></br>
          <label class="info">
            Bus No:<span class="info1"> {busDetails.busno}</span>
          </label>
          <br></br>
          <label class="info">
            Bus name:<span class="info1"> {busDetails.busname}</span>
          </label>
          <br></br>
          <button onClick={this.submit}> proceed to pay</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Ticket);
