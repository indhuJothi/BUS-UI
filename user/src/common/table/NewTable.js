import React, { Component } from "react";
import "./NewTable.css";

class Table extends Component {
  constructor(props)
  {
    super(props)
    {
      this.state={
        show : false
      }
    }
  }
  showTable()
   {
     this.setState({
       show :true
     })
   }
  buildTable = (columns, data) => {
    let headerRow = [];
    let dataRows = [];
    // let length = this.props.data.length;
 
    columns.forEach((col) => {
      headerRow.push(<th class="heading">{col.heading}</th>);
    });

    data.forEach((item) => {
      let dataCells = [];

      columns.forEach((col) => {
    
        if(item[col.property]===undefined)
        {
          dataRows.push(<td>-</td>)
        }
        else 
        {
          if(item[col.property]===true)
          dataRows.push(<td><button onClick={this.showTable.bind(this)}>Book</button></td>)
          else
          dataRows.push(
          <td>{item[col.property]}</td>);
          
      }
       });
   
      dataRows.push(
      <tr>{dataCells}</tr>);
    });
    return (
      <>
        <thead class="thead">
          <tr class="trow">{headerRow}</tr>
        </thead>
        <tbody class="tbody">{dataRows}</tbody>
      </>
    );
    };

  render() {
    const { columns, data } = this.props;
    const bookticket=this.props.bookticket;
    return (
      <div>
        <table className="table">{this.buildTable(columns, data)}</table>
        {this.state.show ? bookticket(true) : false}
      </div>
    );
  }
}

export default Table;
