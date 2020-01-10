import React from 'react'

import { BrowserRouter, Link, Route } from 'react-router-dom'

const url = 'http://localhost:3001/users/getall'

export default class Studentproject extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userproject:[],
            _id:"",
              username: "",
                password:"",
                student_id: "",
                photo: "",
            application: "",
            link_to_industry: "",
            description: "",
            scope: "",
            technology_use: "",
            assignment_percentage: "",
            assignment_desc: "",
            assignment_name: "",
            semester: "",
            course_name: "",
            course_id: "",
            student_year: "",
            student_name: "",
            role: "",
            addNew: true,
            currentPage: 1,
            todosPerPage: 4,
            query: '',
            searchString: [],
            displayMenu: false,
      
        
        };
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    }

    
    handleInputChange(event) {
        this.setState({
            query: event.target.value
            
        });
       
    }
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
      }
    
      hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
    
      }
    
    searchData() {
        fetch(url)      
            .then(response => response.json())
            .then(json => {
                let searchString = this.state.query;
                
                let responseData = json.filter(s => String(s.technology_use).startsWith(searchString))
                this.setState({userproject: responseData})
              
            })
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    filterbyop1() {
        fetch(url).then(res => res.json())
            .then(json => {
                let list = json.filter(s => String(s.technology_use).startsWith('C++'))
                this.setState({ userproject: list })

            })
    }
    filterbyop2() {
        fetch(url).then(res => res.json())
            .then(json => {
                let list = json.filter(s => String(s.technology_use).startsWith('Syphony'))
                this.setState({userproject: list })
             
            })
    }
    filterbyop3() {
        fetch(url).then(res => res.json())
            .then(json => {
                let list = json.filter(s => String(s.technology_use).startsWith('Arduino'))
                this.setState({ userproject: list })
            
            })
    }
    filterbyop4() {
        fetch(url).then(res => res.json())
            .then(json => {
                let list = json.filter(s => String(s.technology_use).startsWith('android'))
                this.setState({ userproject: list })
              
            })
    }
    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({userproject: json }))
            const { currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            let currentTodos = this.state.userproject.slice(indexOfFirstTodo, indexOfLastTodo);

    }

    componentWillMount() {
        this.fetchData()
    }
    
  
    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    save(id) {
        var formData = new FormData();
        var fileField = document.querySelector("input[type='file']");
        formData.append(photo, fileField.files[0]);
        if(window.sessionStorage("token",null)){
            alert("you are not authorized")
        }
        
    else{    if (this.state.addNew === true) {
            fetch("http://localhost:3001/users/signup", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                },
                body: 
                JSON.stringify({
                    username: this.state.username,
                    password:this.state.password,
                    student_id: this.state.student_id,
                    photo: this.state.photo,
                    application:this.state.application,
                    link_to_industry: this.state.link_to_industry,
                    description: this.state.description,
                    scope: this.state.scope,
                    technology_use: this.state.technology_use,
                    assignment_percentage: this.state.assignment_percentage,
                    assignment_desc: this.state.assignment_desc,
                    assignment_name: this.state.assignment_name,
                    semester:this.state.semester,
                    course_name: this.state.course_name,
                    course_id: this.state.course_id,
                    student_year: this.state.student_year,
                    student_name: this.state.student_name,
                    role: this.state.role,
                }) 
            }).then(res => res.json())
                .then( this.fetchData())
            alert('A project was uploaded: ' + this.state.assignment_name);
        }
        else {
            fetch('http://localhost:3001/users/update'+'/'+id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password:this.state.password,
                    student_id: this.state.student_id,
                    photo: this.state.photo,
                    application:this.state.application,
                    link_to_industry: this.state.link_to_industry,
                    description: this.state.description,
                    scope: this.state.scope,
                    technology_use: this.state.technology_use,
                    assignment_percentage: this.state.assignment_percentage,
                    assignment_desc: this.state.assignment_desc,
                    assignment_name: this.state.assignment_name,
                    semester:this.state.semester,
                    course_name: this.state.course_name,
                    course_id: this.state.course_id,
                    student_year: this.state.student_year,
                    student_name: this.state.student_name,
                    role: this.state.role,
                })
            }).then(res => res.json())
                .then( this.fetchData())
            
        }
    }
    }

    delete(id) {
        if(window.sessionStorage("token",null)){
            alert("you are not authorized")
        }
        if (confirm('Do you want to delete?')) {
            fetch('http://localhost:3001/users/delete' + "/" + id, {
                method: 'delete',
                headers:{
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
                }
            }).then(res => res.json())
                .then(this.fetchData())
                alert('delete successful. please reload your page')
        }

    }
    edit(_id,username,password,student_id,photo, application, link_to_industry, description, scope,technology_use,assignment_percentage,assignment_desc,assignment_name,semester,course_name,course_id,student_year,student_name,role) {

        this.setState({
            _id:_id,
            username: username,
            password:password,
            student_id: student_id,
            photo: photo,
            application:application,
            link_to_industry: link_to_industry,
            description: description,
            scope: scope,
            technology_use: technology_use,
            assignment_percentage: assignment_percentage,
            assignment_desc: assignment_desc,
            assignment_name: assignment_name,
            semester: semester,
            course_name: course_name,
            course_id: course_id,
            student_year: student_year,
            student_name: student_name,
            role: role,
            addNew: false
        })
      
    }
    add() {
        this.setState({
            username: "",
            password:"",
            student_id: "",
            photo: "",
        application: "",
        link_to_industry: "",
        description: "",
        scope: "",
        technology_use: "",
        assignment_percentage: "",
        assignment_desc: "",
        assignment_name: "",
        semester: "",
        course_name: "",
        course_id: "",
        student_year: "",
        student_name: "",
        role: "",
            addNew: true
        })
    }
   
    render() {
        const { currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = this.state.userproject.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map(s => {
            return <li >{s}</li>;
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.userproject.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }


        return (


            <div >

             
                <div className="row">
                    <div className="col-md-3"><h1 class="foot">Project list</h1></div>
                    <div className="col-md-7"></div>
                    <div className="col-md-2">
                    <div className="searchForm">
                                <form>
                                    <input type="text" id="filter" value={this.state.query} placeholder="Search for student projects" onChange={this.handleInputChange.bind(this)} />
                                   
                                    <button className='btn btn-dark' onClick={this.searchData.bind(this)}>search</button>
                                </form>
                            </div>
      <div  className="dropdown" style = {{background:"#343a40",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Filter </div>

          { this.state.displayMenu ? (
          <ul>
         <li> <button className='btn btn-dark' onClick={this.fetchData.bind(this)}>All</button></li>
         <li><button className='btn btn-dark' onClick={this.filterbyop1.bind(this)}>C++</button></li>
         <li><button className='btn btn-dark' onClick={this.filterbyop2.bind(this)}>Syphony</button></li>
         <li> <button className='btn btn-dark' onClick={this.filterbyop3.bind(this)}>Arduino</button></li>
         <li><button className='btn btn-dark' onClick={this.filterbyop4.bind(this)}>Android</button></li>

          </ul>
        ):
        (
          null
        )
        }
       
                            </div>
                            </div>
                    <br />
                    <br/>

                    {currentTodos.map(s => (
                        <div className="col-md-3"  >
                            <div className="product" >
                            
                                <img srcSet={s.photo} className='productimg' />
                               
                                <div class="productname"> {s.student_name}</div>
                               
                                
                                <Link to={`/Studentprojectpage/${s.student_id}/${s.application}/${s.link_to_industry}/${s.description}/${s.scope}/${s.technology_use}/${s.assignment_percentage}/${s.assignment_desc}/${s.assignment_name}/${s.semester}/${s.course_name}/${s.course_id}/${s.student_year}/${s.student_name}`}>
                                    <button className='buybutton'>Details</button>
                                </Link>

                                <button className='buybutton' onClick={this.delete.bind(this, s._id)}>Delete</button>

                                <button className='buybutton' onClick={this.edit.bind(this, s._id,  
                                                                                            s.username,
                                                                                            s.password,
                                                                                            s.student_id,
                                                                                            s.photo,
                                                                                            s.application,
                                                                                            s.link_to_industry,
                                                                                        s.description,
                                                                                        s.scope,
                                                                                        s.technology_use,
                                                                                        s.assignment_percentage,
                                                                                        s.assignment_desc,
                                                                                        s.assignment_name,
                                                                                        s.semester,
                                                                                        s.course_name,
                                                                                        s.course_id,
                                                                                        s.student_year,
                                                                                        s.student_name,
                                                                                        s.role,
                                   )}>Edit</button>

                           


                            </div>
                        </div>
                  )  )}

                </div >
                <div className="col-md-6"></div>

                <div className="pagination" >

                {pageNumbers.map(number =>
                    <div >

                        <button type="button" class="btn btn-dark" key={number}
                            id={number}
                            onClick={this.handleClick.bind(this)}
                        >

                            {number}
                        </button>
                    </div>

                )}

                </div>

                <div className="row" className="container" >
                <div className="card bg-light text-dark">
                        <div className="card-header">
                            <h2>Manage user</h2>
                        </div>
                        <div className="card-body">
                        <div className="form-group">
                                <label>Username:</label>
                                <br/>
                               
                                <input className="form-control" type="text" id="username" name="username" value={this.state.username||''}
                                    onChange={this.handleChange.bind(this)} />
                                    
                               
                            </div>
                            <div className="form-group">
                                <label >Password:</label>
                                <input className="form-control" type="text" id="password" name="password" value={this.state.password||''}
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            
                        </div>
                    </div>
                    <div className="card bg-light text-dark">
                        <div className="card-header">
                            <h2>Manage student projects</h2>
                        </div>
                        <div className="card-body">
                          
                            <div className="form-group">
                                <label>Student id:</label>
                                <input className="form-control" type="text" id='student_id' name="student_id" value={this.state.student_id}
                                    onChange={this.handleChange.bind(this)}
                                />

                            </div>
                            <div className="form-group">
                                <label>Photo:</label>
                                <input className="form-control" type="text" id="photo" name="photo" value={this.state.photo}
                                    onChange={this.handleChange.bind(this)}
                                />
                                 <input  type='file'  />
                            </div>
                            <div className="form-group">
                                <label>Application:</label>
                                <input className="form-control" type="text" id="application" name="application" value={this.state.application}
                                    onChange={this.handleChange.bind(this)}
                                />

                            </div>
                            <div className="form-group">
                                <label>Link to industry:</label>
                                <input className="form-control" type="text" id="link_to_industry" name="link_to_industry" value={this.state.link_to_industry}
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label >Description:</label>
                                <input className="form-control" type="text" id="description" name="description" value={this.state.description}
                                    onChange={this.handleChange.bind(this)} />

                            </div>

                            <div className="form-group">
                                <label>Scope:</label>

                                <input className="form-control" type="text" id="scope" name="scope" value={this.state.scope} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Technology use:</label>

                                <input className="form-control" type="text" id="technology_use" name="technology_use" value={this.state.technology_use} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Assignment percentage:</label>

                                <input className="form-control" type="text" id="assignment_percentage" name="assignment_percentage" value={this.state.assignment_percentage} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Assignment description:</label>

                                <input className="form-control" type="text" id="assignment_desc" name="assignment_desc" value={this.state.assignment_desc} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Assignment name:</label>

                                <input className="form-control" type="text" id="assignment_name" name="assignment_name" value={this.state.assignment_name} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Semester:</label>

                                <input className="form-control" type="text" id="semester" name="semester" value={this.state.semester}
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Course name:</label>

                                <input className="form-control" type="text" id="course_name" name="course_name" value={this.state.course_name}
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Course ID:</label>

                                <input className="form-control" type="text" id="course_id" name="course_id" value={this.state.course_id}  
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Student year:</label>

                                <input className="form-control" type="text" id="student_year" name="student_year" value={this.state.student_year} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Student name:</label>

                                <input className="form-control" type="text" id="student_name" name="student_name" value={this.state.student_name} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>
                            <div className="form-group">
                                <label>Role:</label>

                                <input className="form-control" type="text" id="role" name="role" value={this.state.role} 
                                    onChange={this.handleChange.bind(this)} />

                            </div>

                            <button className='btn btn-dark' onClick={this.save.bind(this,this.state._id)}>Save</button>
                            <button className='btn btn-dark' onClick={this.add.bind(this)}>Add new</button>

                       



                        </div>
                    </div>

                </div>
            </div>
        )
    }

}
