import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from '../pages/HomeComponent'
import CompanyComponent from '../pages/CompanyComponent'

const NavPage = () => {
  return (
    <React.Fragment>
        <section>
            <Routes>
                <Route path='/home'  element={<HomeComponent/>}/>
                <Route path='/company'  element={<CompanyComponent/>}/>
            </Routes>
        </section>
    </React.Fragment>
  )
}

export default NavPage