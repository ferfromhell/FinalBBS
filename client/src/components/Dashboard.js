import React, {Component} from "react";
import axios from "axios";
import Post from "./Post";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:null
        }
        axios
        .get("http://localhost:3456/api/showposts")
        .then(posts => {
            console.log(posts);
            this.setState={posts:posts};
        })
    }
    render() {
        return (
        this.state.posts?
        <div>
            {this.state.posts.map(post => {
                return <Post/>
            })};
        </div>
        : <p>No post yet</p>
        );
    }
}
