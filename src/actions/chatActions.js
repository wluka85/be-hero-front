const messageAddedToChat = (message) => ({
    type: 'MESSAGE_ADDED_TO_CHAT',
    message: message
});

export const addMessageToChat = (message)  => (dispatch, getState) => {
    const content = {
        contents: message, 
        author: getState().accountReducer.user.name, 
        timeStamp: new Date(Date.now()).toISOString()
    }
    dispatch(messageAddedToChat(content));
}