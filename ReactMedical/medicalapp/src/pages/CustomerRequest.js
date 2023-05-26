import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";
import ModalImage from "react-modal-image";

export default class CustomerRequest extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.completeCustomerRequestDetails = this.completeCustomerRequestDetails.bind(this);
    this.formRef = React.createRef()
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    customerRequestDataList: [],
    dataLoaded:false,
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCustomerRequestData(
      event.target.customer_name.value,
      event.target.phone.value,
      event.target.medicine_details.value,
      event.target.prescription.files[0]
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.fetchcustomerRequestData();
    this.formRef.current.reset();
    
  }
  //This method work when page is ready
  componentDidMount() {
    this.fetchcustomerRequestData();
  }

  async fetchcustomerRequestData() {
    var apiHandler = new APIHandler();
    var customerRequestData = await apiHandler.fetchAllCustomerRequest();
    //console.log(customerRequestData)
    this.setState({ customerRequestDataList: customerRequestData.data.data });
    this.setState({dataLoaded:true})
  }

  async completeCustomerRequestDetails (customer_id,customer_name,phone,medicine_details,prescription){
    console.log(customer_id);
    var apiHandler = new APIHandler();
    var customerRequestData = await apiHandler.updateCustomerRequest(
      customer_id,customer_name,phone,medicine_details,prescription);

    this.fetchcustomerRequestData()
  
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE CUSTOMER REQUEST DETAILS</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Customer Request</h2>
                </div>
              <div className="row">
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Customer Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          className="form-control"
                          placeholder="Enter Customer Name"
                        />
                      </div>
                    </div>
                    </div>


                    <div className="col-lg-6">
                    <label htmlFor="company_name">Phone</label>
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

                    <div className="col-lg-6">
                    <label htmlFor="company_name">Medicine Details</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Enter Medicine Details"
                        />
                      </div>
                    </div>
                    </div>

                    <div className="col-lg-6">
                    <label htmlFor="company_name">Prescription</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="file"
                          id="prescription"
                          name="prescription"
                          className="form-control"
                          placeholder="Upload the prescription file"
                        />
                      </div>
                    </div>
                    </div>

                    <br/>
                    <div className="row"></div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Customer Request"
                        : "Adding Customer Request please wait..."}
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
                  <h2>All Customer Meidicne Requests</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Customer Name</th>
                        <th>Phone No.</th>
                        <th>Medicine_details</th>
                        <th>Prescription</th>
                        <th>Status</th>
                        <th>Added On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map((request) => (
                        <tr key={request.id}>
                          <td>{request.id}</td>
                          <td>{request.customer_name}</td>
                          <td>{request.phone}</td>
                          <td>{request.medicine_details}</td>
                        
                          <td>
                          {request.prescription === null ? "Null" :
                            <ModalImage  style={{width:"10px",height:"10px"}} small={request.prescription}
                            large={request.prescription}
                            
                            />}
                          </td>
                          <td>
                            {request.status == 0 ? "Pending" :"Completed"}
                            </td>  
                          <td>{new Date(request.added_on).toLocaleString()}</td>
                          <td>
                            {request.status == 0 ?
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() =>
                                this.completeCustomerRequestDetails(request.id,request.customer_name,request.phone,request.medicine_details)
                              }
                            >
                              Complete
                            </button> :(<button
                              className="btn btn-block btn-success">COMPLETED</button>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
