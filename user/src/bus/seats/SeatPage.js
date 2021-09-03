import React from "react";
import "./SeatPage.css";
import Menu from "../../common/menu/Menu";
import Header from '../../common/header/Header';
import seat from   "../../resources/seat.jpg";
import { withRouter } from "react-router";


class SeatList extends React.Component {
  constructor() {
    super();
    {
      this.state = {
        values:sessionStorage.getItem("seats")?JSON.parse(sessionStorage.getItem("seats")):[],
        showTicket: false,
        letsShow: true,
        error: " ",
        userData:[]
      };
      this.getValue = this.getValue.bind(this);
      this.validate = this.validate.bind(this);
      this.goBack = this.goBack.bind(this);
    }
  }
  getValue(i, e) {
    const values = this.state.values;
    let index;
    if (e.target.checked) {
      values.push(+e.target.value);
    } else {
      index = values.indexOf(+e.target.value);
      values.splice(index, 1);
    }
    this.setState({ values: values });
    sessionStorage.setItem("seats", JSON.stringify(this.state.values));
  }
  validate(e) {
    let seatcount = this.state.values.length;
    if (seatcount <= 0) {
      this.setState({
        error: "No seats were selected",
      });
    } else {
      e.preventDefault();
      this.setState({
        showticket: true,
        letsShow: false,
        error: " ",
      });
      sessionStorage.setItem("seatcount", seatcount);
      const { history } = this.props;
      if (history) history.push("/ticket-form");
    }
  }

  goBack() {
    this.props.history.push("/search");
  }

  render() {
    let busdocument = JSON.parse(sessionStorage.getItem("busdetails"));
    let seatsLength = [];
    for (let i = 0; i <busdocument.NoOfSeats; i++) {
        
      seatsLength.push(i);
    }
 
    return (
      <div>
        <Header/>
        <Menu />
        <div class="booktable">
          <button class="back" onClick={this.goBack}>
            GO BACK
          </button>
          {seatsLength.map((element, index) => {
            if (sessionStorage.getItem("seats")) {
              let seatVal = JSON.parse(sessionStorage.getItem("seats"));
              {
                return (
                  <label class="main">
                    <input
                      type="checkbox"
                      checked={seatVal.includes(element + 1) && "checked" }
                      value={element + 1}
                      onClick={this.getValue.bind(this, index)}
                    />
                    <span class="checkmark check">
                      <span class="number">{element + 1}</span>
                      <img src={seat} alt="seat" class="seat"></img>
                    </span>
                  </label>
                );
              }
            } 
            else
            {
          return (
                <label class="main">
                  <input
                    type="checkbox"
                    value={element + 1}
                    onClick={this.getValue.bind(this, index)}
                  />
                  <span class="checkmark check">
                    <span class="number">{element + 1}</span>
                    <img src={seat} class="seat"></img>
                  </span>
                </label>
              );
          }
          })}
          <br></br>
          <span class="err">{this.state.error}</span>
          <button type="submit" class="seatbutton" onClick={this.validate}>
            Book Seats
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SeatList);
