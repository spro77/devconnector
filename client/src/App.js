import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => (
  <Router>
    <Navbar />
    <Route exact path='/'>
      <Landing />
    </Route>
    <section className='container'>
      <Switch>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
    </section>
  </Router>
)

export default App
