import React, { Component } from "react";
import axios from "axios";
//import { set } from "mongoose";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            firstname:"",
            lastname: "",
            password: "",
            passwordConf: "",
            userdata: null,
            success: false
        };
        this.changeHandler= this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitHandler(e){
        e.preventDefault();
        axios
        .post('http://localhost:3456/api/register',this.state)
        .then(result =>{
            console.log(result.data);
            if(result.data.errors){
                return this.setState(result.data);
            }
            return this.setState({
                userdata: result.data,
                errors: null,
                succes: true
            });
        });
    }
    render() {
        return (
        <div>
            {this.state.success && <p>You are successfully registerated!</p>}
            <form onSubmit={this.submitHandler}>
                <input type="text" onChange={this.changeHandler} placeholder="Username" name="username" id="username"/>
                {this.state.errors && this.state.errors.username && (<p>{this.state.errors.username.msg}</p>)}
                <input type="email" onChange={this.changeHandler} placeholder="Email" name="email" id="email"/>
                {this.state.errors && this.state.errors.email && <p>{this.state.errors.email.msg}</p>}
                <input type="text" onChange={this.changeHandler} placehlder="First name" name="firstname" id="firstname"/>
                {this.state.errors && this.state.errors.firstname && (<p>{this.state.errors.firstname.msg}</p>)}
                <input type="text" onChange={this.changeHandler} placeholder="Last name" name="lastname" id="lastname"/>
                {this.state.errors && this.state.errors.lastname && (<p>{this.state.errors.lastname.msg}</p>)}
                <input type="password" onChange={this.changeHandler} placeholder="Password" name="password" id="password"/>
                {this.state.errors && this.state.errors.password && (<p>{this.state.errors.password.msg}</p>)}
                <input type="password" onChange={this.changeHandler} placeholder="Password confirmation" name="passwordConf" id="passwordConf"/>
                {this.state.errors && this.state.errors.password_con && (<p>{this.state.errors.password_con.msg}</p>)}
                <button type="submit">Register</button>
            </form>
            
        </div>
        )
    }
}
