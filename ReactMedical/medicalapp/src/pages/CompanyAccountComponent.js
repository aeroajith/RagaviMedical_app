import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";

export default class CompanyAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyAccountData: [],
    companylist:[],
    dataLoaded:false,
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyAccountData(
      event.target.company_id.value,
      event.target.transaction_type.value,
      event.target.transaction_amount.value,
      event.target.transaction_date.value,
      event.target.payment_mode.value
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.updateDataInstantly()
  }
  //This method work when page is ready
  componentDidMount() {
    this.fetchCompanyAccountData();
  }

  async fetchCompanyAccountData() {
    var apiHandler = new APIHandler();
    var companyData = await apiHandler.fetchAllCompanyOnly();
    this.updateDataInstantly()
    this.setState({companylist:companyData.data})
    this.setState({dataLoaded:true})
  }
  async updateDataInstantly(){
    var apiHandler = new APIHandler();
    var companyAccountData = await apiHandler.fetchAllCompanyAccount();
    this.setState({ companyAccountData:companyAccountData.data.data});

  }
  viewCompanyDetails = (company_id) => {
    console.log(company_id);
    console.log(this.props);
    this.props.history.push("/companydetails/" + company_id);
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY ACCOUNT</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Company Account Bill</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                  <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="company_name">Company</label>
                    <div className="form-group">
                      
                      <div className="form-line">
                        
                      <select className="form-control" name="company_id" id="company_id">
                        {this.state.companylist.map((item)=>(
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <label htmlFor="company_name">Transaction Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <select type="text"
                          id="transaction_type"
                          name="transaction_type"
                          className="form-control">
                          
                            <option value="Debit">Debit Card</option>
                            <option value="Credit">Credit Card</option>
                            <option value="Account Transfer">Bank Transfer</option>
                            <option value="UPI Transfer">UPI Transfer</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                    <label htmlFor="company_name">Transaction Amount</label>
                    <div className="form-group">
                      <div className="form-line">
                      
                        <input
                          type="text"
                          id="transaction_amount"
                          name="transaction_amount"
                          className="form-control"
                          placeholder="Enter Transaction amount"
                        />
                      </div>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                    <label htmlFor="company_name">Transaction Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="transaction_date"
                          name="transaction_date"
                          className="form-control"
                          placeholder="Enter Transaction Date"
                        />
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <label htmlFor="company_name">Payment Mode</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="payment_mode"
                          name="payment_mode"
                          className="form-control"
                          placeholder="Enter Payment Mode"
                        />
                      </div>
                    </div>
                    </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15  waves-effect" 
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add Company Account"
                        : "Adding Company Account please wait..."}
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
                  <h2>All Company Account Transactions</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Company Name</th>
                        <th>Transaction Type</th>
                        <th>Transaction Amount</th>
                        <th>Transaction Date</th>
                        <th>Payment Mode</th>

          
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyAccountData.map((companyaccount) => (
                        <tr key={companyaccount.id}>
                          <td>{companyaccount.company.id}</td>
                          <td>{companyaccount.company.name}</td>
                          <td>{companyaccount.transaction_type}</td>
                          <td>{companyaccount.transaction_amount}</td>
                          <td>{companyaccount.transaction_date}</td>
                          <td>{companyaccount.payment_mode}</td>
                          
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
