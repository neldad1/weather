// import logo from './logo.svg';
import React, { Component } from 'react';
import Comment from './components/author/Comment';
import Author from './components/author/Author';
import './App.css';
import About from './components/weather/About';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body,
      inputValueBody: '',
    };
  }
  changeBody = () => {
    const newBody = prompt('Please enter body');
    this.setState({
      body: newBody,
    });
  };

  changeBodyOnEdit = (event) => {
    this.setState({ inputValueBody: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      body: this.state.inputValueBody,
      inputValueBody: '',
    });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.props.title}</h1>
        {this.props.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
        <div className="margin10px">
          <button onClick={this.changeBody}>Edit Body by Prompt</button>
          <p>{this.state.body}</p>
        </div>
        <form onSubmit={this.onSubmit}>
          <label>
            Edit Body:
            <input
              className="margin10px"
              type="text"
              value={this.state.inputValueBody}
              onChange={this.changeBodyOnEdit}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Comments:</h3>
        {this.props.authors.map((author, index) => (
          <Author key={index} author={author} />
        ))}
        <About />
      </div>
    );
  }
}

export default App;
