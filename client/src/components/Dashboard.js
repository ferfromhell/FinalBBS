import React, {Component} from "react";
import axios from "axios";
import Post from "./Post";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:null,
            post:"",
            isloggedin:true
        };
        this.getPosts();
        axios
        .get("http://localhost:3456/api/isloggedin")
        .then(res => {
            if (!res.data) {
            return this.setState({ isloggedin: false });
            }
        });
        this.getPosts = this.getPosts.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    getPosts(){
        axios
        .get("http://localhost:3456/api/showposts")
        .then(posts => { 
            this.setState({posts: posts.data});
        });
    }
    submitHandler(e){
        e.preventDefault();
        axios
        .post("http://localhost:3456/api/addpost",{post: this.state.post})
        .then(res => {
            console.log(res.data);
            this.getPosts();
        })
    }
    changeHandler(e){
        this.setState({post:e.target.value});
    }
    render() {
        return this.state.isloggedin ? (
          <div>
            <button
              onClick={() =>
                axios
                  .get("http://localhost:3456/api/logout")
                  .then(res => (window.location = "/"))
              }
            >Logout</button>
            <form onSubmit={this.submitHandler}>
              <input value={this.state.post} placeholder="post" onChange={this.changeHandler} type="text" name="post" id="post"/>
              <button type="submit">submit</button>
            </form>
            {this.state.posts &&
              this.state.posts.map(post => {
                return <Post getposts={this.getPosts} key={post._id} info={post} />;
              })}
          </div>
        ) : (
          <h3>Please login</h3>
        );
      }
}
