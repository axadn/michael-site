import React from "react";
import axios from "axios";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {error: ""};
        this.handleLogin = this.handleLogin.bind(this);
    }

    render(){
        return <div className="login-component">
            <div> {this.state.error}</div>
            <form className="login-form" onSubmit={this.handleLogin}>
                <div className = "form-row">
                    <label>email</label>
                        <input ref={email=>this.email = email} 
                            type="text" name="email"/>
                </div>
                <div className = "form-row">
                    <label>password</label>
                        <input ref={password=>this.password = password} 
                            type="password" name="password"/>
                </div>
                <div className="form-row">
                    <input type="submit"/>
                </div>
            </form>
        </div>;
    }

    handleLogin(e){
        e.preventDefault();
        axios.post('/api/session.json', {email: this.email.value, password: this.password.value})
        .then(result=>{
            this.props.dispatch_log_in();
            window.location = "/admin#/products";
        })
        .catch(error=>{
            this.setState({error: "failed to log in"});
        });
    }
}