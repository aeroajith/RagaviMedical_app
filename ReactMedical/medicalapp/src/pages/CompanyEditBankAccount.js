import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";
import { Link } from "react-router-dom";

export default class CompanyEditBankAccount extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    accounts_holder_name:"",
    bank_account_no:"",
    ifsc_Code:""
    
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyBankData(
      event.target.accounts_holder_name.value,
      event.target.bank_account_no.value,
      event.target.ifsc_Code.value,
      this.props.match.params.company_id,
      this.props.match.params.id

      
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }
  componentDidMount(){
    this.fetchCompanyBankData()
  }

  async fetchCompanyBankData(){
    var apiHandler = new APIHandler()
    var companyData = await apiHandler.fetchCompanyBankDetails(this.props.match.params.id)
    console.log(companyData)
    this.setState({accounts_holder_name:companyData.data.data.accounts_holder_name})
    this.setState({bank_account_no:companyData.data.data.bank_account_no})
    this.setState({ifsc_Code:companyData.data.data.ifsc_Code})
   
    this.setState({dataLoaded:true})
    //this.setState({companyDataList:companyData.data.data})
  
  }


  
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY BANK</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Edit Company Bank #{this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="company_name">Account Holders Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="accounts_holder_name"
                          name="accounts_holder_name"
                          className="form-control"
                          placeholder="Enter Account Holder Name"
                          defaultValue={this.state.accounts_holder_name}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Account No</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Enter Bank Account No"
                          defaultValue={this.state.bank_account_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">IFSC Code</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="ifsc_Code"
                          name="ifsc_Code"
                          className="form-control"
                          placeholder="Enter IFSC Code"
                          defaultValue={this.state.ifsc_Code}
                        />
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Edit Company Bank"
                        : "Editing Company Bank please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success! </strong>
                        {this.state.errorMessage}
                        <Link to={"/companydetails/" +this.props.match.params.company_id}
                        className="btn btn--info">Back to company details</Link>
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
