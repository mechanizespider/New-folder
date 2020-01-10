import React from 'react'
 
export default class Login extends React.Component{
 
    constructor(props){
        super(props)
        this.state = {
            username: '',
             password: '',
             token:'',
            }
    }
 
 
    changeHandlder(e){
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
 
    login(){
 
        var user = {username: this.state.username, password: this.state.password}
        fetch('http://localhost:3001/users/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.result === 'authenticated'){
                alert('Login successfully')
                this.setState({token:data.bearer})
                window.sessionStorage.setItem('authenticated', 1)
                window.sessionStorage.setItem('token', this.state.token)
                window.location.reload()
            }  
            else{
                alert('Wrong username and password')
                window.sessionStorage.setItem('authenticated', 0)
            }
        }
        )
       
    }
 
 
    render(){
        return(
            <div className="row" className="container" >
			<br/>
			<br/>
			<br/>
			<br/>
		<div className="card bg-light text-dark">
			<div className="card-header">
				<h2>Log in</h2>
			</div>
			<div className="card-body">
				<div className="form-group">
					<label htmlFor="">User name</label>
					<input className="form-control" type="text" id="username" name="username" value={this.state.username}
						onChange={this.changeHandlder.bind(this)}/>
		
				</div>
				<div className="form-group">
					<label htmlFor="" >Password</label>
					<input className="form-control" type="password" id="password" name="password"value={this.state.password}
						onChange={this.changeHandlder.bind(this)} />
		
				</div>
			
		
		
				<button className='btn btn-primary' onClick={this.login.bind(this)}>Login</button>
                </div>
		</div>
		
		</div>
       )
    }
 
}