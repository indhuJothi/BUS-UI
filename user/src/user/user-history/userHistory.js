import React from "react";
import Table from '../../common/table/NewTable';
import "../../common/table/NewTable.css";
import "./userHistory.css";
import { getBushistory } from "../../service/service";
import Header from "../../common/header/Header";
import Menu from "../../common/menu/Menu";
import getuserHistory from '../../service/api'
import axios from 'axios'


let columns = [
  // {
  //   heading:"User Id",
  //   property:"id"

  // },
 
  {
    heading: "Mobile",
    property: "mobile",
  },
  {
    heading: "BusNo",
    property: "busno",
  },
  {
    heading: "Bus Name",
    property: "busname",
  },
  {
    heading: "TotalFare",
    property: "totalfare",
  },
  {
    heading: "Numberofseats",
    property: "numberofseats",
  },
  {
    heading: "Date",
    property: "date",
  },
  {
    heading: "Source",
    property: "from",
  },
  {
    heading: "Destination",
    property: "to",
  },
];


class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        go: false,
        history:[]
      };
    }
    
  }
  gotoSearch() {
    this.setState({
      go: true,
    });
  }
  

  componentDidMount(){
    axios.get("http://localhost:5000/users/getuserhistory",{
      headers:{
        "access-token":sessionStorage.getItem("authToken")
      }
    }).then(response=>{
     
      this.setState({
        history:response.data
      })
    })
  }



  render() {
  
    let go = this.state.go;
    console.log(this.state.history)
    let datalist = [...this.state.history].reverse()
    return (
      <>
        <Header />
        <Table columns={columns} data={datalist} />
        <button class="historyback" onClick={(e)=>this.props.history.goBack()}>
          Back
        </button>
        <button class="searchbtn" onClick={() => this.gotoSearch()}>
          Search
        </button>
        <Menu />

        {go ? this.props.history.push("/search") : null}
        {go ? sessionStorage.removeItem("busdetails") : null}
        {go ? sessionStorage.removeItem("searchdetails") : null}
        {go ? sessionStorage.removeItem("passengerDetails") : null}
        {go ? sessionStorage.removeItem("seats") : null}
        {go ? sessionStorage.removeItem("seatcount") : null}
      </>
    );
  }
}

export default HistoryTable;
