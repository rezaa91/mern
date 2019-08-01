import React from 'react';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  async renderPosts() {
    try {
      const blogs = await axios.get('/api/posts');

      this.setState({
        posts: blogs.data.map((blog, index) => (
          <div className="blog-container" key={index}>
            <h2>{ blog.title }</h2>
            <p>{ blog.body }</p>
            <small>{ blog.author }</small>
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
