import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthHandler from '../../utils/AuthHandler'

export default class Logout extends Component {
  render() {
    AuthHandler.logoutUser()
    return (
     
      <Redirect to="/"/>
    )
  }
}
