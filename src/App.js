
import './App.css';

import React,{Component} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
   Route,
  Routes
} from "react-router-dom";
export default class App extends Component
{
  apikey=process.env.REACT_APP_NEWS_API;
  render()
  {
    return(
      <div>
      {/* <NavBar/>
      <News  apikey={this.apikey} pageSize={6} country="in" category="general"/> */}
      <Router>
       <NavBar/>
       <Routes>
       <Route path='/' element={<News  apikey={this.apikey} pageSize={6} country="in" category="general"/>}/>
        <Route path='/general' element={ <News  apikey={this.apikey} pageSize={6} country="in" category="general"/>}/>
        <Route path='/business' element={<News  apikey={this.apikey} pageSize={6} country="in" category="business"/>}/>
        <Route path='/entertainment' element={<News  apikey={this.apikey} pageSize={6} country="in" category="entertainment"/>}/>
        <Route path='/health' element={<News  apikey={this.apikey} pageSize={6} country="in" category="health"/>}/>
        <Route path='/sports' element={<News  apikey={this.apikey} pageSize={6} country="in" category="sports"/>}/>
        <Route path='/science' element={<News  apikey={this.apikey} pageSize={6} country="in" category="science"/>}/>
        <Route path='/technology' element={<News  apikey={this.apikey} pageSize={6} country="in" category="technology"/>}/>
       </Routes>
       </Router>
      </div>
    )
  }
}

