import data from "../resources/user.json";
import busdata from "../resources/bus.json";
import bushistory from "../resources/bushistory.json";
import userhistory from "../resources/userhistory.json";





export default function validateLogin(mobilenum, valpassword) {
  let returnval;
  data.user.filter((element) => {
    if (
      element.mobile === parseInt(mobilenum) &&
      element.password === valpassword
    ) {
      returnval = true;
    }
  });
  return returnval;
}

export function getPassword(mobilenum, valpassword) {
  let jsonpass;
  data.user.filter((element) => {
    if (
      element.mobile === parseInt(mobilenum) &&
      element.password === valpassword
    ) {
      jsonpass = element.password;
    }
  });
  return jsonpass;
}

export function getMobile(mobilenum, valpassword) {
  let jsonmobile;
  data.user.filter((element) => {
    if (
      element.mobile === parseInt(mobilenum) &&
      element.password === valpassword
    ) {
      jsonmobile = element.mobile;
    }
  });
  return jsonmobile;
}

export function getEmail(mobilenum, valpassword, email) {
  let jsonemail;
  data.user.filter((element) => {
    if (
      element.mobile === parseInt(mobilenum) &&
      element.password === valpassword &&
      element.email === email
    ) {
      jsonemail = element.email;
    }
  });
  return jsonemail;
}

export function getUsername(mobilenum) {
  let username;
  data.user.filter((element) => {
    if (element.mobile === parseInt(mobilenum)) {
      username = element.name;
    }
   
  });
  return username;
}

export function getUseremail(mobilenum) {
  let useremail;
  data.user.filter((element) => {
    if (element.mobile === parseInt(mobilenum)) {
      useremail = element.email;
    }
  });
  return useremail;
}

export function getBusdetails(from, to) {
  let busdatas = [];
  busdata.bus.forEach((element) => {
    if (element.from === from && element.to === to) {
      busdatas = element;
    }
  });

  return busdatas;
}

export function getBushistory() {
  let bushistoryjson;
  return (bushistoryjson = bushistory.userbusbooking);
}

export function getFinaldata() {
  let finaldata;
  return (finaldata = userhistory.buspassanger);
}

export function seatCount(busno, selectedseat) {
  let busseatcount;
  busdata.bus.map((element) => {
    if (element.busno == busno) {
      element.NoOfSeats = element.NoOfSeats - selectedseat;
      busseatcount = element.NoOfSeats;
    }
  });

  return busseatcount;
}
