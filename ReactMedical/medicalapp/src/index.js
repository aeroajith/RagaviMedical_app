import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Logout from "./pages/auth/Logout";
import { PrivateRouteNew } from "./utils/PrivateRouteNew";
import HomeComponent from "./pages/HomeComponent";
import CompanyComponent from "./pages/CompanyComponent";
import CompanyDetailsComponent from "./pages/CompanyDetailsComponent";
import Config from "./utils/config";
import CompanyAddBankComponent from "./pages/CompanyAddBankComponent";
import CompanyEditBankAccount from "./pages/CompanyEditBankAccount";
import MedicineAddComponent from "./pages/MedicineAddComponent";
import ManageMedicineComponent from "./pages/ManageMedicineComponent";
import CompanyAccountComponent from "./pages/CompanyAccountComponent";
import EmployeeComponent from "./pages/EmployeeComponent";
import EmployeeDetails from "./pages/EmployeeDetails";
import BillGenerateComponent from "./pages/BillGenerateComponent";
import CustomerRequest from "./pages/CustomerRequest";




ReactDOM.render(

  <Router>
  <Switch>
      
      <Route exact path="/" component={Signin}/>
          <Route
            exact path={Config.logoutPageUrl} component={Logout}/>

          <PrivateRouteNew
            exact path="/home" activepage="0" page={HomeComponent}/>

          <PrivateRouteNew
            exact path="/company" activepage="1" page={CompanyComponent}/>

          <PrivateRouteNew
            exact path="/companydetails/:id" activepage="1" page={CompanyDetailsComponent}/>

          <PrivateRouteNew
            exact path="/addcompanybank/:id" activepage="1" page={CompanyAddBankComponent}/>

          <PrivateRouteNew
            exact path="/editcompanybank/:company_id/:id" activepage="1" page={CompanyEditBankAccount}/>
          
          <PrivateRouteNew
            exact path="/addmedicine" activepage="2" page={MedicineAddComponent}/>
          <PrivateRouteNew
            exact path="/managemedicine" activepage="3" page={ManageMedicineComponent}/>

          <PrivateRouteNew
            exact path="/companyaccount" activepage="4" page={CompanyAccountComponent}/>

          <PrivateRouteNew
            exact path="/manageemployee" activepage="5" page={EmployeeComponent}/>

          <PrivateRouteNew
            exact path="/employeedetails/:id" activepage="5" page={EmployeeDetails}/>

          <PrivateRouteNew
            exact path="/generatebill" activepage="6" page={BillGenerateComponent}/>

          <PrivateRouteNew
            exact path="/customer_request" activepage="7" page={CustomerRequest}/>
   </Switch>
  </Router>,
  document.getElementById("root")
);