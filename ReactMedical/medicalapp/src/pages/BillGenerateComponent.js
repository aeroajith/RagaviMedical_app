import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";
import { Link } from "react-router-dom";
import Autocomplete from "./Autocomplete";

export default class BillGenerateComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    medicineDetails:[{
      sr_no:1,
      id:0,
      medicine_name:"",
      quantity:"",
      quantity_type:"",
      unit_price:"",
      amount:"",
      c_gst:"",
      s_gst:""


    }],
    currentSrno:1
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var customer_name = event.target.name.value
    var customer_phone = event.target.phone.value
    var customer_address = event.target.address.value
    var apiHandler = new APIHandler();
        var response = await apiHandler.generateBill(
          event.target.name.value,
          event.target.phone.value,
          event.target.address.value,
          this.state.medicineDetails
    
          
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.billGeneratePrint(customer_name,customer_phone,customer_address,this.state.medicineDetails)
  }
  billGeneratePrint(customer_name,customer_phone,customer_address,medicineDetails){
    var billDetails = "<style>table{width:100%;border-collapse:collapse;} td{padding:5px} th{padding:5px}</style><div>"
    billDetails += "<table border='1'>"
    billDetails += "<tr>"
    billDetails += "<td style='text-align:center' colspan='8'>"
    billDetails += "Bill For Customer"
    billDetails += "</td>"
    billDetails += "</tr>"
    billDetails += "<tr>"
    billDetails += "<td colspan='2'>"
    billDetails+= "Name : " +customer_name
    billDetails += "</td>"
    billDetails += "<td colspan='3'>"
    billDetails+= "Phone No : " +customer_phone
    billDetails += "</td>"
    billDetails += "<td colspan='2'>"
    billDetails+= "Address : " +customer_address
    billDetails += "</td>"
    billDetails += "</tr>"
    billDetails += "<tr>"
    billDetails += "<th>"
    billDetails += "SR.No"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "Medicine Name"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "Quantity"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "Quantity Type"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "Unit Price"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "C GST %"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "S GST %"
    billDetails += "</th>"
    billDetails += "<th>"
    billDetails += "Amount"
    billDetails += "</th>"
    billDetails += "</tr>"
    var totalamt=0;




    for(var i = 0; i < medicineDetails.length;i++){
      billDetails += "<tr>"
      billDetails += "<td>"
      billDetails += ""+ medicineDetails[i].sr_no
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].medicine_name
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].quantity
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].quantity_type
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].unit_price
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].c_gst
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].s_gst
      billDetails += "</td>"
      billDetails += "<td>"
      billDetails += ""+medicineDetails[i].amount
      billDetails += "</td>"
      billDetails += "</tr>"
      totalamt += parseInt(medicineDetails[i].amount)
    }

    billDetails += "<tr>"
    billDetails += "<td colspan='8 '>";
    billDetails += 'Total Amount : Rs. ' + totalamt
    billDetails += "</td>"
    billDetails += "</tr>"
    billDetails += "</table>"
    billDetails += "</div>"


    var mywindow = window.open(
      "",
      "Bill Print",
      "height=650&width=900&top=100&left=100"
    )
    mywindow.document.write(billDetails)
    var button = mywindow.document.createElement("button")
    button.text = "Print"
    mywindow.document.body.appendChild(button)
    mywindow.print()
  }

  AddMdicineDetails=()=>{
    this.state.currentSrno = this.state.currentSrno + 1
    var srno = this.state.currentSrno
    this.state.medicineDetails.push({
      sr_no:srno,
      medicine_name:"",
      quantity:"",
      quantity_type:"",
      unit_price:"",
      amount:"",
      c_gst:"",
      s_gst:""
    })
    this.setState({})
  }

  RemoveMdicineDetails=()=>{
    this.state.currentSrno = this.state.currentSrno - 1
    if (this.state.medicineDetails.length > 1){
      this.state.medicineDetails.pop()
    
    }
    this.setState({})
    
  }
  showDataInputs = (index,item)=>{
    console.log(index)
    console.log(item)
    this.state.medicineDetails[index].id = item.id
    this.state.medicineDetails[index].quantity = 1
    this.state.medicineDetails[index].quantity_type = "Pieces"
    this.state.medicineDetails[index].unit_price = item.sell_price
    this.state.medicineDetails[index].c_gst = item.c_gst
    this.state.medicineDetails[index].s_gst = item.s_gst
    this.state.medicineDetails[index].medicine_name = item.name
    this.state.medicineDetails[index].amount = parseInt(item.sell_price) + ( ((parseInt(item.c_gst) + parseInt(item.s_gst))/100) * (parseInt(item.sell_price)))
    this.setState({})

  }

  quantyChange=(event)=>{
    var value = (event.target.value)
    var index = (event.target.dataset.index)
    this.state.medicineDetails[index].quantity = value
    
    this.state.medicineDetails[index].amount = (parseInt(this.state.medicineDetails[index].unit_price) + ((parseInt(this.state.medicineDetails[index].c_gst)+parseInt(this.state.medicineDetails[index].s_gst))/100) * (parseInt(this.state.medicineDetails[index].unit_price)))*value
    this.setState({})
  }
  
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE BILL</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Manage Bill For Customer</h2>
                </div>
                <div className="row">
                <div className="body">
                  <form onSubmit={this.formSubmit}>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Customer Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Customer Name"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Phone No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Enter Phone No"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>
                    </div>

                    <br />
                    <div className="row"></div>
                    <h4>Medicine Details</h4>

                    {this.state.medicineDetails.map((item, index)=>(
                    <div className="row" key={index}>

                      <div className="col-lg-1">
                      <label htmlFor="company_name">SR.No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sr_no"
                          name="sr_no"
                          className="form-control"
                          placeholder="Enter SR No"
                          defaultValue={index + 1}
                        />
                      </div>
                    </div>
                    </div>


                      <div className="col-lg-2">
                      <label htmlFor="company_name">Medicine Name</label>
                    <div className="form-group">
                      <div className="form-line">
                       <Autocomplete 
                       itemPosition={index}
                       showDataInputs={this.showDataInputs}
                       /> 
                      </div>
                    </div>
                    </div>


                    <div className="col-lg-2">
                      <label htmlFor="company_name">Quantity</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="quantity"
                          name="quantity"
                          className="form-control"
                          placeholder="Enter Quantity"
                          defaultValue={item.quantity}
                          data-index={index}
                          onChange={this.quantyChange}
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                      <label htmlFor="company_name">Quantity Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="quantity_type"
                          name="quantity_type"
                          className="form-control"
                          placeholder="Enter Qty Type "
                          defaultValue={item.quantity_type}
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-2">
                      <label htmlFor="company_name">Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="unit_price"
                          name="unit_price"
                          className="form-control"
                          placeholder="Enter Price "
                          defaultValue={item.unit_price}
                        />
                      </div>
                    </div>
                    </div>


                    <div className="col-lg-3">
                      <label htmlFor="company_name">Amount (GST Included)</label>
                    <div className="form-group">
                      <div className="form-line">
                        
                      
                        <input
                          type="text"
                          id="amount"
                          name="amount"
                          className="form-control"
                          placeholder="Enter Amount "
                          defaultValue={item.amount}
                          
                        />
                      </div>
                    </div>
                    </div>
                    </div>

                      ))}

                      <div className="row">
                        <div className="col-lg-6">
                          <button className="btn btn-block btn-success"
                          onClick={this.AddMdicineDetails} type="button"
                          >Add Medicine Details</button>
                        </div>

                          <div className="col-lg-6">
                          <button className="btn btn-block btn-danger"
                          onClick={this.RemoveMdicineDetails} type="button"
                          >Remove Medicine Details</button>
                          </div>
                        
                      </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Generate Bill"
                        : "Generating Bill please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success! </strong>
                        {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
