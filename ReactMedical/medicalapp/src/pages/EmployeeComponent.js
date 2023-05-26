import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import "../Components/css/style.css";

export default class EmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    
    
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    employeeData: [],
    dataLoaded:false,
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveEmployeeData(
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value,
      
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
    this.fetchEmploeeData();
  }

  async fetchEmploeeData() {
    this.updateDataInstantly()
    
    
  }
  async updateDataInstantly(){
    var apiHandler = new APIHandler();
    var employeeDataList = await apiHandler.fetchEmployee();
    this.setState({ employeeData:employeeDataList.data.data});
    console.log(employeeDataList)
    this.setState({dataLoaded:true})

  }

  showEmployeeDetails=(eid)=>{
    this.props.history.push(
        "/employeedetails/"+ eid)
  }


  viewCompanyDetails = (company_id) => {
    console.log(company_id);
    
    this.props.history.push("/companydetails/" + company_id);
  };

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
                  <h2>Add Employee</h2>
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
                        ? "Add Employee"
                        : "Adding Emploee Data please wait..."}
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
                  <h2>All Employee Data</h2>
                </div>
                <div className="body table-responsive">
                  <table id="company" className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Employee Name</th>
                        <th>Joined Date</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Added On</th>
                        <th>Action</th>

          
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeData.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.joining_date}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.address}</td>
                          <td>{new Date(employee.added_on).toLocaleString()}</td>
                          <td><button className="btn btn-warning"
                          onClick={()=>this.showEmployeeDetails(employee.id)}
                          >View</button></td>
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
