import React, { Component } from 'react';
import axios from "axios";
axios.defaults.withCredentials= true;
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state= {
            pssword:"",
            email:"",
            error: null,
            valerrors: null
        };
        this.changeHandler= this.changeHandler.bind(this);
        this.submitHandler= this.submitHandler.bind(this);
    };
    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    submitHandler(e){
        e.preventDefault();
        axios
        .post("http://localhost:3456/api/login",this.state)
        .then(result => {
            if (result.data.error) {
                return this.setState({ error: result.data.message });
            }
            if (result.data.errors) {
                return this.setState({ valerrors: result.data.errors });
            }
            return (window.location="/dashboard");
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}    
                <form onSubmit={this.submitHandler}>
                    {this.state.valerrors && this.state.valerrors.email && (<p>{this.state.valerrors.email.msg}</p>)}
                    <input type="email" onChange={this.changeHandler} name="email" id="email"></input>
                    {this.state.valerrors && this.state.valerrors.password && (<p>{this.state.valerrors.password.msg}</p>)}
                    <input type="password" onChange={this.changeHandler} name="password" id="password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    };
}
