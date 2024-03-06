import React from 'react'
import LoginAdmin from './pages/LoginAdmin'
import RegisterAdmin from './pages/RegisterAdmin'
import DashboardAdmin from './pages/DashboardAdmin'
import { AuthRoute, NonAuthRoute } from './ProtectedRoute/RoutesProtect';
import {BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute/>}>
          <Route path='/' element={<DashboardAdmin/>}/>
        </Route>
        <Route element={<NonAuthRoute/>}>
          <Route path='/login' element={<LoginAdmin />}/>
          <Route path='/register' element={<RegisterAdmin />}/>
        </Route>
       </Routes>   
      </BrowserRouter>
    </div>
  )
}

export default App
