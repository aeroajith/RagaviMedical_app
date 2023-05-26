import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";

export default class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formSubmitSalary = this.formSubmitSalary.bind(this);
    this.formSubmitBank = this.formSubmitBank.bind(this);
    console.log(this.props.match.params.id)
  }
  state = {
    errorRes: false,
    errorResSalary:false,
    errorResBank:false,
    errorMessage: "",
    errorMessageSalary:"",
    errorMessageBank:"",
    btnMessage: 0,
    btnMessageSalary:0,
    btnMessageBank:0,
    sendData: false,
    sendDataSalary:false,
    sendDataBank:false,
    employeeData: [],
    dataLoaded:false,
    name:"",
    joining_date:"",
    phone:"",
    address:"",
    employeeSalaryList:[],
    employeeBankList:[]
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.editEmployeeData(
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value,
      this.props.match.params.id
      
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
    this.fetchEmploeeDataByID();
  }

  async fetchEmploeeDataByID() {
    this.updateDataInstantly()
    
    
  }
  async updateDataInstantly(){
    var apiHandler = new APIHandler();
    var employeeDataList = await apiHandler.fetchEmployeeById(this.props.match.params.id);
    var employeeSalary = await apiHandler.fetchEmployeeSalary(this.props.match.params.id);
    var employeeBank = await apiHandler.fetchEmployeeBank(this.props.match.params.id);
    console.log(employeeBank)
    this.setState({name:employeeDataList.data.data.name})
    this.setState({joining_date:employeeDataList.data.data.joining_date})
    this.setState({phone:employeeDataList.data.data.phone})
    this.setState({address:employeeDataList.data.data.address})
    this.setState({employeeSalaryList:employeeSalary.data})
    this.setState({employeeBankList:employeeBank.data})
    this.setState({dataLoaded:true})

    
    
  }
  

  async formSubmitSalary(event){
    event.preventDefault();
    this.setState({ btnMessageSalary: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.AddEmployeeSalary(
      event.target.salary_date.value,
      event.target.salary_amount.value,
      this.props.match.params.id
      
    );
    console.log(response);
    this.setState({ btnMessageSalary: 0 });
    this.setState({ errorResSalary: response.data.error });
    this.setState({ errorMessageSalary: response.data.message });
    this.setState({ sendDataSalary: true });
    this.updateDataInstantly()
  }

  async formSubmitBank(event){
    event.preventDefault();
    this.setState({ btnMessageBank: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.AddEmployeeBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_Code.value,
      this.props.match.params.id
      
    );
    console.log(response);
    this.setState({ btnMessageBank: 0 });
    this.setState({ errorResBank: response.data.error });
    this.setState({ errorMessageBank: response.data.message });
    this.setState({ sendDataBank: true });
    this.updateDataInstantly()
  }
  

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE EMPLOYEE</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Edit Company Employee # {this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                   <div className="row">
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                      <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Employee Name"
                          defaultValue={this.state.name}
                        />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Joining Date</label>
                    <div className="form-group">
                      <div className="form-line">
                      
                        <input
                          type="date"
                          id="joining_date"
                          name="joining_date"
                          className="form-control"
                          placeholder="Enter Joining Date"
                          defaultValue={this.state.joining_date}
                        />
                      </div>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                    <label htmlFor="company_name">Phone No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Enter Phone No"
                          defaultValue={this.state.phone}
                        />
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter Employee Address"
                          defaultValue={this.state.address}
                        />
                      </div>
                    </div>
                    </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15  waves-effect" 
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Edit Employee"
                        : "Editing Emploee Data please wait..."}
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
                  <h2>Add Employee Salary # {this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmitSalary}>
                   <div className="row">
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Salary Date</label>
                    <div className="form-group">
                      <div className="form-line">
                      <input
                          type="date"
                          id="salary_date"
                          name="salary_date"
                          className="form-control"
                          placeholder="Enter salary Date"
                          
                        />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Salary Amount</label>
                    <div className="form-group">
                      <div className="form-line">
                      
                        <input
                          type="text"
                          id="salary_amount"
                          name="salary_amount"
                          className="form-control"
                          placeholder="Enter Salary Amount "
                          
                        />
                      </div>
                      </div>
                    </div>
                    </div>
                   
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15  waves-effect" 
                      disabled={this.state.btnMessageSalary === 0 ? false : true}
                    >
                      {this.state.btnMessageSalary === 0
                        ? "Add Employee Salary"
                        : "Adding Emploee Salary please wait..."}
                    </button>
                    <br />
                    {this.state.errorResSalary === false &&
                    this.state.sendDataSalary === true ? (
                      <div className="alert alert-success">
                        <strong>Success! </strong>
                        {this.state.errorMessageSalary}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorResSalary === true &&
                    this.state.sendDataSalary === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessageSalary}
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
                  <h2>All Employee Salary</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Salary Date</th>
                        <th>Salary Amount</th>
                        <th>Added On</th>

          
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeSalaryList.map((salary) => (
                        <tr key={salary.id}>
                          <td>{salary.id}</td>
                          <td>{salary.salary_date}</td>
                          <td>{salary.salary_amount}</td>
                          <td>{new Date(salary.added_on).toLocaleString()}</td>
                          
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
                  <h2>Add Employee Bank # {this.props.match.params.id}</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmitBank}>
                   <div className="row">
                    <div className="col-lg-6">
                    <label htmlFor="company_name">Bank Account No</label>
                    <div className="form-group">
                      <div className="form-line">
                      <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Enter Employee Bank A/C No"
                          
                        />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                    <label htmlFor="company_name">IFSC Code</label>
                    <div className="form-group">
                      <div className="form-line">
                      
                        <input
                          type="text"
                          id="ifsc_Code"
                          name="ifsc_Code"
                          className="form-control"
                          placeholder="Enter IFSC Code"
                          
                        />
                      </div>
                      </div>
                    </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15  waves-effect" 
                      disabled={this.state.btnMessageBank === 0 ? false : true}
                    >
                      {this.state.btnMessageBank === 0
                        ? "Add Employee Bank"
                        : "Adding Emploee Bank please wait..."}
                    </button>
                    <br />
                    {this.state.errorResBank === false &&
                    this.state.sendDataBank === true ? (
                      <div className="alert alert-success">
                        <strong>Success! </strong>
                        {this.state.errorMessageBank}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorResBank === true &&
                    this.state.sendDataBank === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessageBank}
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
                  <h2>All Employee Bank Details</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Bank A/C No</th>
                        <th>IFSC Code</th>
                        <th>Added On</th>

          
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeBankList.map((bank) => (
                        <tr key={bank.id}>
                          <td>{bank.id}</td>
                          <td>{bank.bank_account_no}</td>
                          <td>{bank.ifsc_Code}</td>
                          <td>{new Date(bank.added_on).toLocaleString()}</td>
                          
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
