import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";
import { Link } from "react-router-dom";

export default class ManageMedicineComponent extends Component {
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
    medicinedetails:[],
    dataLoaded:false,
    MedicineDataList:[],
        name:"",
        medical_type:"",
        buy_price:"",
        sell_price:"",
        c_gst:"",
        s_gst:"",
        batch_no:"",
        shelf_no:"",
        expire_date:"",
        mfg_date:"",
        company_id:"",
        description1:"",
        in_stock_total:"",
        qty_in_strip:"",
        total_salt_list:0,
        medicine_id:0,
       
    
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.editMedicineData(
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
      this.state.medicinedetails,
      this.state.medicine_id,
      
    );
    
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }
  
  componentDidMount(){
    this.LoadIntialMedicineData()
  }

  async LoadIntialMedicineData(){
    var apiHandler = new APIHandler();
    var companyData = await apiHandler.fetchAllCompanyOnly();
    var medicineData = await apiHandler.fetchAllMedicine();
    this.setState({ companylist: companyData.data });
    this.setState({MedicineDataList:medicineData.data.data})
    this.setState({dataLoaded:true})
    console.log(medicineData)
    
  }
  
  AddItems=()=>{
    var item ={
      salt_name:"",
      salt_qty:"",
      description:"",
      id:0,
    }
    this.state.medicinedetails.push(item)
    this.setState({})
  }
  RemoveItems=()=>{
    if(this.state.medicinedetails.length != this.state.total_salt_list){
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

   
  }

  viewMedicineDetails=(index)=>{
    console.log(this.state.MedicineDataList[index])
        this.setState({medicine_id:this.state.MedicineDataList[index].id})
        this.setState({name:this.state.MedicineDataList[index].name})
        this.setState({medical_type:this.state.MedicineDataList[index].medical_type})
        this.setState({buy_price:this.state.MedicineDataList[index].buy_price})
        this.setState({sell_price:this.state.MedicineDataList[index].sell_price})
        this.setState({c_gst:this.state.MedicineDataList[index].c_gst})
        this.setState({s_gst:this.state.MedicineDataList[index].s_gst})
        this.setState({batch_no:this.state.MedicineDataList[index].batch_no})
        this.setState({shelf_no:this.state.MedicineDataList[index].shelf_no})
        this.setState({expire_date:this.state.MedicineDataList[index].expire_date})
        this.setState({mfg_date:this.state.MedicineDataList[index].mfg_date})
        this.setState({company_id:this.state.MedicineDataList[index].company_id})
        this.setState({description:this.state.MedicineDataList[index].description})
        this.setState({in_stock_total:this.state.MedicineDataList[index].in_stock_total})
        this.setState({qty_in_strip:this.state.MedicineDataList[index].qty_in_strip})
        this.setState({total_salt_list:this.state.MedicineDataList[index].medicine_details.length})
        this.setState({medicinedetails:this.state.MedicineDataList[index].medicine_details})
        
        console.log(this.state.total_salt_list)
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
                  {this.state.dataLoaded===false?(
                  <div className="text-center">
                    <div className="preloader pl-size-xs">
                      <div className="spinner-layer pl-red-grey">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ):""}
                  <h2>All Companies</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Medicine Name</th>
                        <th>Medical Type</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>C GST</th>
                        <th>S GST</th>
                        <th>Batch No</th>
                        <th>Shelf No</th>
                        <th>Expire Date</th>
                        <th>Mfg Date</th>
                        <th>Description</th>
                        <th>Total Stocks</th>
                        <th>Strip Quantity</th>
                        <th>Company</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.MedicineDataList.map((medicine,index) => (
                        <tr key={medicine.id}>
                          <td>{medicine.id}</td>
                          <td>{medicine.name}</td>
                          <td>{medicine.medical_type}</td>
                          <td>{medicine.buy_price}</td>
                          <td>{medicine.sell_price}</td>
                          <td>{medicine.c_gst}</td>
                          <td>{medicine.s_gst}</td>
                          <td>{medicine.batch_no}</td>
                          <td>{medicine.shelf_no}</td>
                          <td>{medicine.expire_date}</td>
                          <td>{medicine.mfg_date}</td>
                          <td>{medicine.description}</td>
                          <td>{medicine.in_stock_total}</td>
                          <td>{medicine.qty_in_strip}</td>
                          <td>{medicine.company.name}</td>
                          <td>{new Date(medicine.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() =>
                                this.viewMedicineDetails(index)
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Manage Medicine</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="company_name">Medicine Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Medine Name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    
                    <label htmlFor="company_name">Medical Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_type"
                          name="medical_type"
                          className="form-control"
                          placeholder="Enter Medine type"
                          defaultValue={this.state.medical_type}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Purchase Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Enter Purchase Price"
                          defaultValue={this.state.buy_price}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Selling Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Enter Selling Price"
                          defaultValue={this.state.sell_price}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">CGST%</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="Enter CGST"
                          defaultValue={this.state.c_gst}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">SGST %</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="Enter SGST"
                          defaultValue={this.state.s_gst}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Batch No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="Enter Batch No"
                          defaultValue={this.state.batch_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Shelf No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Enter Shelf No"
                          defaultValue={this.state.shelf_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Expiry Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Enter Expiry Date"
                          defaultValue={this.state.expire_date}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Manufacture Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="Enter Manufacture Date"
                          defaultValue={this.state.mfg_date}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description1"
                          name="description1"
                          className="form-control"
                          placeholder="Enter Description"
                          defaultValue={this.state.description        }
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">In Stock Total</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="Enter Total Stock"
                          defaultValue={this.state.in_stock_total}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Quantity in Strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="Enter Strip Quantity"
                          defaultValue={this.state.qty_in_strip}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="company_name">Company</label>
                      <select className="form-control" name="company_id" id="company_id">
                        {this.state.companylist.map((item)=>(
                          <option key={item.id} value={item.id}
                          selected={(item.id==this.state.company_id ? true :false)}
                          >{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <br />
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
                          value={item.salt_name}
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
                          value={item.salt_qty}
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
                          value={item.description}
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
                        ? "Update Medicine"
                        : "Updating Medicine Data please wait..."}
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
      </section>
    );
  }
}
