export const sendUserConnectedMessage = (user) => ({
    type: 'server/user-connected',
    user: user
});

export const sendUserDisconnectedMessage = (user) => ({
  type: 'server/user-disconnected',
  user: user
})

export const chatMessageSent = (message) => ({
    type: 'server/message-sent',
    message: message
});

export const createdCaseSent = (message) => ({
    type: 'server/case-created',
    message: message
});

export const userTyping = (isTyping, messageReciever, messageSender) => ({
  type: 'server/user-is-typing',
  isTyping: isTyping,
  messageReciever: messageReciever,
  messageSender: messageSender
});

export const sendUserTyping = (isTyping) => (dispatch, getState) => {
  const reciever = getReciever(getState);
  const sender = getSender(getState);
  dispatch(userTyping(isTyping, reciever, sender));
}

export const sendChatMessage = (message) => (dispatch, getState) => {
    console.log('state of message: ', getState())
    // const role = getState().accountReducer.user.role;
    // const currentChatCase = getState().casesReducer.currentChatCase;
    // const reciever = role === 'needer' ? currentChatCase.heroId : currentChatCase.neederId;
    const reciever = getReciever(getState);
    const content = {
        contents: message, 
        // sender: sender,
        reciever: reciever,
        author: getState().accountReducer.user.name,
        caseId: getState().casesReducer.currentChatCase._id
    }
    dispatch(chatMessageSent(content))
};

const getReciever = (getState) => {
  const role = getState().accountReducer.user.role;
  const currentChatCase = getState().casesReducer.currentChatCase;
  return (role === 'needer') ? currentChatCase.heroId : currentChatCase.neederId;
}

const getSender = (getState) => {
  const role = getState().accountReducer.user.role;
  const currentChatCase = getState().casesReducer.currentChatCase;
  return (role === 'needer') ? currentChatCase.neederId : currentChatCase.heroId;
}

export const sendCreatedCase = (description) => (dispatch, getState) => {
    const user = getState().accountReducer.user;
    const content = {
        description: description, 
        user: user
    }
    console.log('content ', content)
    dispatch(createdCaseSent(content))
};