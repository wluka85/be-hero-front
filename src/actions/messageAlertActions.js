export const handleDisplayAlertMessage = (message) => ({
    type: 'DISPLAY_MESSAGE',
    alertMessage: message
});

export const handleCloseActionAlertMessage = () => ({
    type: 'CLOSE_MESSAGE',
});