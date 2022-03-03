import React, {Component} from 'react'

class Author extends Component {
  render() {
    return (
      <div>
        Written by {this.props.author}
      </div>
    )
  }
}

export default Author;