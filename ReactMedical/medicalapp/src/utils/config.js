class Config{
    static loginURL="http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/"
    static companyApiUrl = "http://127.0.0.1:8000/api/company/"
    static companyOnlyUrl = "http://127.0.0.1:8000/api/companyonly/"
    static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/"
    static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/"
    static medicineByNameApiUrl = "http://127.0.0.1:8000/api/medicinebyname/"
    static companyAccountApiUrl = "http://127.0.0.1:8000/api/companyaccount/"
    static employeeApiUrl = "http://127.0.0.1:8000/api/employee/"
    static employeeSalaryApiUrl = "http://127.0.0.1:8000/api/employee_all_salary/"
    static employeeBankApiUrl = "http://127.0.0.1:8000/api/employee_all_bank/"
    static employeeSalaryByIDApiUrl = "http://127.0.0.1:8000/api/employee_salaryby_id/"
    static employeeBankByIDApiUrl = "http://127.0.0.1:8000/api/employee_bankby_id/"
    static generateBIllApiUrl = "http://127.0.0.1:8000/api/generate_bill/"
    static customerRequestApiUrl = "http://127.0.0.1:8000/api/customer_request/"
    static homepageApiUrl = "http://127.0.0.1:8000/api/home_api/"
    static homeUrl="/home";
    static logoutPageUrl="/logout"

    static sidebarItem = [
        {index:"0",title:"Home",url:"/home",icons:"home"},
        {index:"1",title:"Company",url:"/company",icons:"assessment"},
        {index:"2",title:"Medicine",url:"/addmedicine",icons:"assessment"},
        {index:"3",title:"Manage Medicine",url:"/managemedicine",icons:"assessment"},
        {index:"4",title:"Manage Company Account",url:"/companyaccount",icons:"assessment"},
        {index:"5",title:"Manage Employee",url:"/manageemployee",icons:"assessment"},
        {index:"6",title:"Generate Bill",url:"/generatebill",icons:"assessment"},
        {index:"7",title:"Customer Request",url:"/customer_request",icons:"assessment"}
    ]
}

export default Config

