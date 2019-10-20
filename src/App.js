/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-19 13:54:38
 * @LastEditTime: 2019-10-19 18:53:15
 * @LastEditors: Please set LastEditors
 */
import React,{Component} from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
export default class App extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </HashRouter>
    )
  }
}