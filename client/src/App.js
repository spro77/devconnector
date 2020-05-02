import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Route exact path='/'>
        <Landing />
      </Route>
      <section className='container'>
        <Alert />
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
  </Provider>
)

export default App
