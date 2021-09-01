import React, { Component } from "react";
import Table from "../../common/table/NewTable";
import "./BuslistTable.css";
import Menu from "../../common/menu/Menu";
import { withRouter } from "react-router";


let storedBusdata;
let getBusdata;
let columns = [
  {
    heading: "Bus Name",
    property: "busname",
  },
  {
    heading: "Bus No",
    property: "busno",
  },
  {
    heading: "Fare",
    property: "fare",
  },
  {
    heading: "From",
    property: "from",
  },
  {
    heading: "Available Seats",
    property: "NoOfSeats",
  },
  {
    heading: "To",
    property: "to",
  },
  {
    heading: "Type",
    property: "type",
  },
  {
    heading: "Book Ticket",
    property: "button",
  },
];

class TableData extends Component {
  constructor(props) {
    super(props);
    {
      this.bookTicket = this.bookTicket.bind(this);
    }
  }
  bookTicket(isTrue) {
    if (isTrue) {
      const { history } = this.props;
      if (history) history.push("/book-seat");
    }
  }


  render() {
    let busdatas = JSON.parse(sessionStorage.getItem("busDetails"));
    let bookTicket = this.bookTicket;
    let busData = this.props.busData
    console.log(busdatas)
    console.log(busData)
    if (sessionStorage.getItem("busDetails")) {
      storedBusdata =JSON.parse(sessionStorage.getItem("busDetails"));
      console.log(storedBusdata)
    storedBusdata.map(elem=>{
      console.log(elem)
    
      getBusdata = [
        {
          from: elem.from,
          to: elem.to,
          busno: elem.busno,
          busname: elem.busname,
          fare: elem.fare,
          type:elem.type,
          NoOfSeats: elem.NoOfSeats,
          button: elem.button,
        },
      ];
    })
    } else {
      getBusdata = [
        {
          from: busData.from,
          to: busData.to,
          busno: busData.busno,
          busname: busData.busname,
          fare: busData.fare,
          type: busData.type,
          NoOfSeats: busData.NoOfSeats,
          button: busData.button,
        },
      ];
    }

    return (
      <>
        <Menu />
        <Table
          columns={columns}
          data={getBusdata}
          bookticket={bookTicket.bind(this)}
        />
      </>
    );
  }
}
export default withRouter(TableData);
