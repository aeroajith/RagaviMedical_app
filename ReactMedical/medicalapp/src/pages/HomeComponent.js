import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import CanvasJSReact from "../utils/canvasjs.react"

 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class HomeComponent extends Component {

  constructor(props){
    super(props);
    this.chart = React.createRef()
    
  }

  state={
    customer_request:0,
    bill_count:0,
    medicine_count:0,
    company_count:0,
    employee_count:0,
    total_profit:0,
    sell_price:0,
    pending_request:0,
    completed_request:0,
    profit_amount_today:0,
    sell_amount_today:0,
    medicine_expire:0, 
    profitChartOption:{},
    sellChartOption:{},
    
  }


  componentDidMount() {
    this.fetchHomePageData();
  }

  async fetchHomePageData() {
    var apiHandler = new APIHandler();
    var homeData = await apiHandler.fetchHomePage();
    console.log(homeData)
    this.setState({ customer_request: homeData.data.customer_request });
    this.setState({ bill_count: homeData.data.bill_count });
    this.setState({ medicine_count: homeData.data.medicine_count });
    this.setState({ company_count: homeData.data.company_count });
    this.setState({ employee_count: homeData.data.employee_count });
    this.setState({ total_profit: homeData.data.total_profit });
    this.setState({ sell_price: homeData.data.sell_price });
    this.setState({ pending_request: homeData.data.pending_request });
    this.setState({ completed_request: homeData.data.completed_request });
    this.setState({ sell_amount_today: homeData.data.sell_amount_today });
    this.setState({ profit_amount_today: homeData.data.profit_amount_today });
    this.setState({ medicine_expire: homeData.data.medicine_expire });

    var profitdatalist =[]
    for(var i=0; i<homeData.data.profit_chart.length;i++){
      profitdatalist.push({ x: new Date(homeData.data.profit_chart[i].date), y: homeData.data.profit_chart[i].amt })
    }
    var selldatalist =[]
    for(var i=0; i<homeData.data.sell_chart.length;i++){
      selldatalist.push({ x: new Date(homeData.data.sell_chart[i].date), y: homeData.data.sell_chart[i].amt })
    }
    this.state.profitChartOption={
			animationEnabled: true,
			title:{
				text: "Total Profit of Medicine"
			},
			axisX: {
				valueFormatString: "DD MMM YYYY"
			},
			axisY: {
				title: "Profit (in Rs)",
				prefix: "₹"
			},
			data: [{
				yValueFormatString: "₹#,###",
				xValueFormatString: "DD MMM YYYY",
				type: "spline",
				dataPoints:profitdatalist,
			}]
		}
    this.state.sellChartOption={
			animationEnabled: true,
			title:{
				text: "Total Sales of Medicine"
			},
			axisX: {
				valueFormatString: "DD MMM YYYY"
			},
			axisY: {
				title: "Sales (in Rs)",
				prefix: "₹"
			},
			data: [{
				yValueFormatString: "₹#,###",
				xValueFormatString: "DD MMM YYYY",
				type: "spline",
				dataPoints:selldatalist,
			}]
		}

    this.setState({})

    //this.setState({dataLoaded:true})
  }
  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>DASHBOARD</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">assignment</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.customer_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">assessment</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                   {this.state.bill_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">local_hospital</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL MEDICINES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicine_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">business</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL COMPANY</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.company_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">supervisor_account</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL EMPLOYEE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                   {this.state.employee_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">trending_up</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    <p>Rs.{this.state.total_profit}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">donut_small</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    <p>Rs.{this.state.sell_price}</p>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">today</i>
                </div>
                <div className="content">
                  <div className="text">MEDICINE EXPIRE IN WEEK</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicine_expire}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">beenhere</i>
                </div>
                <div className="content">
                  <div className="text">COMPLETED REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                   {this.state.completed_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">add_alert</i>
                </div>
                <div className="content">
                  <div className="text">PENDING REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.pending_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">forum</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.sell_amount_today}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">timeline</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.profit_amount_today}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Medicine Profit Data</h2>
                </div>
                
                <div className="body">
			<CanvasJSChart options = {this.state.profitChartOption}
				
			/>
      </div>
      </div>
      </div>
      </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Medicine Sales Data</h2>
                </div>
                
                <div className="body">
                <CanvasJSChart options = {this.state.sellChartOption}
				
        />
				
			
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
