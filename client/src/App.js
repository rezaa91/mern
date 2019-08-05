import React from 'react';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      posts: null,
      email: '',
      password: '',
      token: '',
      username: ''
    }

    this.renderPosts = this.renderPosts.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
  }

  componentDidMount() {
    this.renderPosts();
  }

  // once authenticated - this method reveals the username of the logged in user
  // by passing the token received from logging in to access the protected route
  async getUser() {
    const { token } = this.state;
    const user = await axios.get('/api/users', {
      headers: {
        'x-auth-token': token
      }
    });

    this.setState({username: user.data.username});
  }

  async login() {
    const { email, password } = this.state;

    const tokenRequest = await axios.post('/api/auth', { email, password });
    const token = tokenRequest.data.token;

    this.setState({token});
  }

  handleOnChange(e, field) {
    const obj = {};
    obj[field] = e.target.value;

    this.setState(obj);
  }

  async deleteBlog(id) {
    const { token, posts } = this.state;

    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });

      if (!response.data || !response.data.success) {
        throw new Error('Post cannot be deleted');
      }

      this.setState({
        posts: posts.filter(post => post.key !== id)
      });
    } catch (err) {
      console.log(err);
    }
  }

  async renderPosts() {
    try {
      const blogs = await axios.get('/api/posts');

      this.setState({
        blogs,
        posts: blogs.data.map((blog) => (
          <div className="blog-container" key={blog._id}>
            <h2>{ blog.title }</h2>
            <p>{ blog.body }</p>
            <small>{ blog.author }</small>
            <button onClick={() => this.deleteBlog(blog._id)}>Delete</button>
          </div>
        ))
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { posts, email, password, username } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>MY BLOG</p>
        </header>
        <p className="login-container">
          <input type="text" value={email} placeholder="email" onChange={(e) => this.handleOnChange(e, 'email')} />
          <input type="password" value={password} placeholder="password" onChange={(e) => this.handleOnChange(e, 'password')} />
          <button onClick={this.login}>Login</button>
        </p>
        { posts }

        <p>
          <button onClick={this.getUser}>MY DETAILS</button>
        </p>
        <p>{ username }</p>
      </div>
    );
  }
}
