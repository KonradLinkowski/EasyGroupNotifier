import React, { Component } from 'react';

import { AuthContext } from '../../services/AuthContext';
import { withFirebase } from '../../services/FirebaseContext';
import { MessageList } from './MessageList';

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: []
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.listener = this.props.firebase
      .messages()
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        if (snapshot.docs.length) {
          const messages = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              uid: doc.id
            }
          })

          this.setState({
            messages,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    if (this.listener) {
      this.listener();
      delete this.listener;
    }
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().add({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.firestore.Timestamp.fromDate(new Date),
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).delete();
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export const Messages = withFirebase(MessagesBase);
