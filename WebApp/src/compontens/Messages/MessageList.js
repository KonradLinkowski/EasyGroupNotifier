import React from 'react';

import { MessageItem } from './MessageItem';

export const MessageList = ({
  authUser,
  messages,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);
