import React, { Component } from 'react';
import axios from 'axios';


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.voteHandler = this.voteHandler.bind(this);
  }
  voteHandler(){
    axios.post('http://localhost:3456/api/postupvote/'+ this.props.info._id)
    .then(res => {
      //console.log(res);
      return this.props.getposts();
    });
  }
  render() {
    var post= this.props.info;
    return (
      <div>
        <ul>
          <li>{post.post}</li>
          <li>Likes: {post.vote}</li>
          <li>{post.user.username}</li>
        </ul>
        <button onClick={this.voteHandler}>Like</button>
      </div>
    )
  }
}
