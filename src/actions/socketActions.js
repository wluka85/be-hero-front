export const sendUserConnectedMessage = (user) => ({
    type: 'server/user-connected',
    user: user
});