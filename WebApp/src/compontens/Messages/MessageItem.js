import React, { Component } from 'react';

export class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { authUser, message, onRemoveMessage } = this.props;

    return (
      <li>
        <span>
          <strong>{message.userId}</strong> {message.text}
        </span>
        {authUser.uid === message.userId && (
          <button onClick={() => onRemoveMessage(message.uid)}>Delete</button>
        )}
      </li>
    );
  }
}
