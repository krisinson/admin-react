/*
应用根组件 
 */
import React,{Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './containers/login/Login'
import Admin from './containers/admin/Admin'
export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}