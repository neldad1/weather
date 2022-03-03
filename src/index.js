import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import RandomUser from './components/RandomUser';

const post = {
  title: 'Dinosaurs are awesome',
  authors: ['Stealthy Stegosaurus', 'JK Rowling', 'Edgar Allan Poe'],
  body: 'Check out this body property!',
  comments: ['First!', 'Great post', 'Hire this author now!'],
};

ReactDOM.render(
  /* <React.StrictMode>
    <App />
  </React.StrictMode>, */
  <App
    title={post.title}
    author={post.author}
    body={post.body}
    comments={post.comments}
    authors={post.authors}
  />,
  /* <RandomUser />, */
  document.getElementById('root')
);
