import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";
import { Link } from "react-router-dom";

export default class MedicineAddComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companylist:[],
    medicinedetails:[{
      "salt_name":"",
      "salt_qty":"",
      "description":""
    }]
    
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveMedicineData(
      event.target.name.value,
      event.target.medical_type.value,
      event.target.buy_price.value,
      event.target.sell_price.value,
      event.target.c_gst.value,
      event.target.s_gst.value,
      event.target.batch_no.value,
      event.target.shelf_no.value,
      event.target.expire_date.value,
      event.target.mfg_date.value,
      event.target.company_id.value,
      event.target.description1.value,
      event.target.in_stock_total.value,
      event.target.qty_in_strip.value,
      this.state.medicinedetails
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }
  
  componentDidMount(){
    this.LoadCompany()
  }

  async LoadCompany(){
    var apiHandler = new APIHandler();
    var companyData = await apiHandler.fetchAllCompanyOnly();
    this.setState({ companylist: companyData.data });
    
  }
  
  AddItems=()=>{
    var item ={
      salt_name:"",
      salt_qty:"",
      description:""
    }
    this.state.medicinedetails.push(item)
    this.setState({})
  }
  RemoveItems=()=>{
    if(this.state.medicinedetails.length !=1){
    this.state.medicinedetails.pop(this.state.medicinedetails.length-1)
  }
  this.setState({})
  }
  handleInput=(event)=>{
   var keyName = (event.target.name)
   var value = (event.target.value)
   var index = (event.target.getAttribute("data-index"))
   this.state.medicinedetails[index][keyName] = value
   this.setState({})

   console.log(this.state)
  }
  
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE MEDICINE</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Medicine</h2>
                </div>
                <div className="row">
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="col-lg-4">
                    <label htmlFor="company_name">Medicine Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Medine Name"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Medicine Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_type"
                          name="medical_type"
                          className="form-control"
                          placeholder="Enter Medine type"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Purchase Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Enter Purchase Price"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Selling Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Enter Selling Price"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">CGST%</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="Enter CGST"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">SGST %</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="Enter SGST"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Batch No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="Enter Batch No"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Shelf No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Enter Shelf No"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Expiry Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Enter Expiry Date"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Manufacture Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="Enter Manufacture Date"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description1"
                          name="description1"
                          className="form-control"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-4">
                    <label htmlFor="company_name">In Stock Total</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="Enter Total Stock"
                        />
                      </div>
                    </div>
                    </div>


                    <div className="col-lg-4">
                    <label htmlFor="company_name">Quantity in Strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="Enter Strip Quantity"
                        />
                      </div>
                    </div>
                    </div>


                    <div className="col-lg-4">
                    <div className="form-group">
                    <label htmlFor="company_name">Company</label>
                      <select className="form-control" name="company_id" id="company_id">
                        {this.state.companylist.map((item)=>(
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      </div>
                    </div>
                    
                     <div className="row"></div>
                    <div className="form-group">
                      <div className="col-lg-6">
                        <button className="btn btn-block btn-success" type="button"
                        onClick={this.AddItems}
                        >Add Details</button>
                      </div>
                      <div className="col-lg-6">
                        <button className="btn btn-block btn-danger" type="button"
                        onClick={this.RemoveItems}
                        >Remove Details</button>
                      </div>
                    </div>
                    
                    {this.state.medicinedetails.map((item,index)=>(
                          <div className="form-group row" key={index}>
                          <div className="col-lg-4">
                          <label htmlFor="">Salt Name</label>
                          <div className="form-line">
                          <input
                          type="text"
                          id="salt_name"
                          name="salt_name"
                          className="form-control"
                          placeholder="Enter Salt Name"
                          onChange={this.handleInput}
                          data-index={index}
                        />  
                      </div>
                      </div>

                      <div className="col-lg-4">
                          <label htmlFor="">Salt quantity</label>
                          <div className="form-line">
                          <input
                          type="text"
                          id="salt_qty"
                          name="salt_qty"
                          className="form-control"
                          placeholder="Enter Salt Quantity"
                          onChange={this.handleInput}
                          data-index={index}
                        />  
                      </div>

                      </div><div className="col-lg-4">
                          <label htmlFor="">Description</label>
                          <div className="form-line">
                          <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          onChange={this.handleInput}
                          data-index={index}
                        />  
                      </div>
                      </div>
                      </div>
                      
                    ))}
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect col-lg-12"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Medicine"
                        : "Adding Medicine Data please wait..."}
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
