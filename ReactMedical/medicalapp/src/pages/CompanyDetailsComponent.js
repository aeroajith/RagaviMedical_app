import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css"

export default class CompanyDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    console.log(props.match.params.id)
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBank:[],
    name:"",
    license_no:"",
    address:"",
    contact_no:"",
    email:"",
    description:"",
    dataLoaded:false,
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyData(
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }
//This method work when page is ready
  componentDidMount(){
    this.fetchCompanyData()
  }

  async fetchCompanyData(){
    var apiHandler = new APIHandler()
    var companyData = await apiHandler.fetchCompanyDetails(this.props.match.params.id)
    console.log(companyData)
    this.setState({companyBank:companyData.data.data.company_bank})
    this.setState({name:companyData.data.data.name})
    this.setState({license_no:companyData.data.data.license_no})
    this.setState({address:companyData.data.data.address})
    this.setState({contact_no:companyData.data.data.contact_no})
    this.setState({email:companyData.data.data.email})
    this.setState({description:companyData.data.data.description})
    this.setState({dataLoaded:true})
    //this.setState({companyDataList:companyData.data.data})
  }

  viewCompanyDetails = (company_id)=>{
  console.log(company_id)
  console.log(this.props)
  }
 
  addCompanyBank=()=>{
    this.props.history.push("/addcompanybank/"+ this.props.match.params.id)
  }
  editCompanyBank=(company_bank_id)=>{
    console.log(company_bank_id)
    this.props.history.push("/editcompanybank/"+this.props.match.params.id +"/" + company_bank_id)
   
  }


  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE COMPANY</h2>
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
                  <h2>Edit Company</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="company_name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter company name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">License No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Enter licesnse no"
                          defaultValue={this.state.license_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter company address"
                          defaultValue={this.state.address}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Contact No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Enter company contact no"
                          defaultValue={this.state.contact_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter company email"
                          defaultValue={this.state.email}
                        />
                      </div>
                    </div>
                    <label htmlFor="company_name">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter company description"
                          defaultValue={this.state.description}
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
                        ? "Edit Company"
                        : "Editing Company please wait..."}
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
                  <h2>
                    Company Bank
                  </h2>
                  <div className="header-dropdown m-r--5">
                      <button className="btn btn-info"
                      onClick={this.addCompanyBank}
                      >Add Company</button>
                  </div>
                </div>
                <div className="body table-responsive" >
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Account Holders Name</th>
                        <th>Account No</th>
                        <th>IFSC Code</th>
                        <th>Action</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                     {this.state.companyBank.map((company)=>(
                      <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.accounts_holder_name}</td>
                        <td>{company.bank_account_no}</td>
                        <td>{company.ifsc_Code}</td>
                        <td>
                          <button className="btn btn-block btn-warning"
                          onClick={()=>this.editCompanyBank(company.id)}
                          >Edit</button>
                          <button className="btn btn-block btn-danger"
                          
                          >Delete</button>
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
