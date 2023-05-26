import React, { Component } from 'react'
import "../Components/css/style.css"
import APIHandler from '../utils/APIHandler'

export default class Autocomplete extends Component {
    state={
        onFocus:false,
        dataList:[],

    }

    constructor(props){
        super(props)
        this.loadMedicineData = this.loadMedicineData.bind(this)
        this.inputData = React.createRef();
    }

    

    onFocusChange=()=>{
        this.setState({onFocus:true})
    }
    onBlurChange=()=>{
        this.setState({onFocus:false})
    }

    async loadMedicineData(event){
        var apiHandler = new APIHandler()
        var dataResponse = await apiHandler.fetchAllMedicineByName(event.target.value)
        this.setState({dataList:dataResponse.data})
        
    }

    onShowItem=(item)=>{
       console.log(item)
       this.inputData.current.value = item.name
       this.props.showDataInputs(this.props.itemPosition,item)
       this.onBlurChange()
       
      
    }

  render() {
    return (
      <React.Fragment>
        <input
            type="text"
            id="medicine_name"
            name="medicine_name"
            className="form-control"
            placeholder="Medicine Name "
            autoComplete="none"
            onFocus={this.onFocusChange}
            onChange={this.loadMedicineData}
            ref={this.inputData}
            
        />
         {this.state.onFocus == true ?(
           <div>
            <ul className='dropdown'>
                {this.state.dataList.map((item, index)=>(
                <li className='list_Dropdown'
                 key={index} 
                 onClick={()=>this.onShowItem(item)}
                >
                    {item.name}
                </li>
                ))}
            </ul>
        </div>)
        :("")}
      </React.Fragment>
    )
  }
}
