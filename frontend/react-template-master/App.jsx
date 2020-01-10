import React from 'react'
import Login from './login.jsx';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom'
import Studentprojectpage from './studentprojectpage.jsx';
import Studentproject from './studentproject.jsx';
import Non_admin from './non_admin.jsx';

 
export default class App extends React.Component{
 
  constructor(){
    super()
    this.state = {authenticated: 0
    
    
    }
  }
 
  componentWillMount(){
    this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
  }
 
  logout(){
    window.sessionStorage.setItem('authenticated', 0)
    window.sessionStorage.setItem('token', 0,null)
    this.setState({isAuthenticated: window.sessionStorage.getItem('authenticated')})
  }

    render(){
        return(
          <div>
         
          {window.sessionStorage.getItem('authenticated')==1 ?
            

          <div>
                <BrowserRouter>
                
              <div class="card">
              
              <button style={{fontSize: '30px',textAlign:'left'}} class="text-light bg-dark"   onClick={this.logout.bind(this)}> Logout</button>
                      
                        <Link style={{fontSize: '30px'}} class="text-light bg-dark" to='/Studentproject'>Student project List</Link>
                
                </div>
                <Switch>
                         <Route exact path='/' component={Studentproject} />
                         <Route path='/Login' component={Studentproject} />
                      
                        <Route path='/Studentproject' component={Studentproject} />
                    

                        <Route path={`/Studentprojectpage/:student_id/:application/:link_to_industry/:description/:scope/:technology_use/:assignment_percentage/:assignment_desc/:assignment_name/:semester/:course_name/:course_id/:student_year/:student_name`} component={Studentprojectpage}
                        />

                    </Switch>

              
              </BrowserRouter>
           
          </div>  
          :
          
          <div>
              <BrowserRouter>
             
              <div class="card">
                <Link style={{fontSize: '30px'}} class="text-light bg-dark" to='/Login'>Login</Link>
                     
                    
                        <Link style={{fontSize: '30px'}} class="text-light bg-dark" to='/Studentproject'>Student project List</Link>
                
                </div>
                <Switch>
                         <Route exact path='/' component={Non_admin} />
                         <Route path='/Login' component={Login} />
                       
                        <Route path='/Studentproject' component={Non_admin} />
                      >

                      <Route path={`/Studentprojectpage/:student_id/:application/:link_to_industry+/:description/:scope/:technology_use/:assignment_percentage/:assignment_desc/:assignment_name/:semester/:course_name/:course_id/:student_year/:student_name`} component={Studentprojectpage}
                        />

                    </Switch>
              
              </BrowserRouter>
          </div>
        }    
        </div>

        )
    }
}