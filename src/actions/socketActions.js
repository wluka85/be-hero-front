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

export const sendChatMessage = (message) => (dispatch, getState) => {
    const content = {
        contents: message, 
        // sender: sender,
        // reciever: reciever,
        author: getState().accountReducer.user.name,
        caseId: getState().casesReducer.currentChatCase._id
    }
    dispatch(chatMessageSent(content))
};