import { getCasesQuery } from "./apiQueries";

const activeCaseCurrentChatSet = (activeCase) => ({
    type: 'CURRENT_CHAT_CASE',
    currentChatCase: activeCase
});

export const setActiveCaseCurrentChat = (activeCaseId) => (dispatch, getState) => {
    let role = getState().accountReducer.role;
    let accessToken = localStorage.getItem('accessToken');
    fetch(getCasesQuery(role) + activeCaseId, {
        method: 'GET',
        headers: {'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'params': {
                caseId: activeCaseId
            }
        },
    })
    .then(res => res.json())
    .then(data => {
        dispatch(activeCaseCurrentChatSet(data.case[0]));
    })
    .catch(error => console.log(error));
}

export const fetchChoosenFreeCase = (caseId) => (dispatch, getState) => {
    let role = getState().accountReducer.role;
    let accessToken = localStorage.getItem('accessToken');
    fetch(getCasesQuery(role) + caseId, {
        method: 'GET',
        headers: {'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'params': {
                caseId: caseId
            }
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // dispatch(activeCaseCurrentChatSet(data.case[0]));
    })
    .catch(error => console.log(error));
}