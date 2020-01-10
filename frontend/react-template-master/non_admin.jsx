import React from 'react'

import { BrowserRouter, Link, Route } from 'react-router-dom'

const url = 'http://localhost:3001/users/getall'
export default class Non_admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            userproject:[],
            _id:"",
              username: "",
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
    filehandler(event){
        console.log(event.target.files[0]);
        this.setState({  selectedfile:event.target.files[0]})
      
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
                
                let responseData = json.filter(searchString)
                this.setState({studentprojects: responseData})
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
    }

    componentWillMount() {
        this.fetchData()
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
            </div>
        )
    }

}
