import React from 'react'

import { BrowserRouter, Link, Route } from 'react-router-dom'
const url = 'http://localhost:9000/studentprojects'
export default class Studentprojectpage extends React.Component {


    render() {
        return (

            <div className="row">
                <div className="col-md-3"><h1 class="foot">Project Page</h1></div>
                <div className="col-md-7"></div>
                <div className="col-md-2"></div>
                <div className="col-md-2"></div>
                <div className="col-md-8" style={{ padding: '0px' }}>
                    <div class="card">
                        
                        <br />
                        
                        <h5 class="card-title">Project name: {this.props.match.params.assignment_name} </h5>
                        <div>Assignment percentage: {this.props.match.params.assignment_percentage} </div>
                        <div>Assignment detail: {this.props.match.params.assignment_desc} </div>
                        <div>Application: {this.props.match.params.application} </div>
                        <div>Link to industry:<a> {this.props.match.params.link_to_industry}</a> </div>
                        <div>Description: {this.props.match.params.description} </div>
                        <div>Scope: {this.props.match.params.scope} </div>
                        <div>Technology use: {this.props.match.params.technology_use} </div>
                        <h5 class="card-title">Created by: {this.props.match.params.student_name}</h5>
                        <div>Student ID: {this.props.match.params.student_id} </div>
                        <div>Student year: {this.props.match.params.student_year} </div>
                        <div>Course Name: {this.props.match.params.course_name}</div>
                        <div>Course ID: {this.props.match.params.course_id}</div>
                        <div>Semester: {this.props.match.params.semester} </div>
                       
                    </div>
                </div>
                <div className="col-md-2" style={{ padding: '0px' }}>
                    <div class="card">

                    </div>
                </div>

            </div>

        )
    }

}