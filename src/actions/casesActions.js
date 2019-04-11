import { getCasesQuery } from "./apiQueries";
import { element } from "prop-types";

const activeCaseCurrentChatSet = (activeCase) => ({
    type: 'CURRENT_CHAT_CASE',
    currentChatCase: activeCase
});

const currentCaseDescription = (caseDescription) => ({
    type: 'CURRENT_CASE_DESCRIPTION',
    chosenCase: caseDescription
});

const activeCaseDisplayed = (activeCases) => ({
    type: 'ACTIVE_CASE_DISPLAYED',
    activeCases: activeCases
});

const activeCaseDialogRead = (activeCases, currentActiveCase) => ({
    type: 'ACTIVE_CASE_DIALOG_READ',
    activeCases,
    currentActiveCase
});

export const setActiveCaseCurrentChat = (activeCaseId) => (dispatch, getState) => {
    const activeCases = getState().casesReducer.activeCases;
    const currentActiveCase = activeCases.find(activeCase => activeCase._id === activeCaseId);
    if (currentActiveCase) {
        dispatch(activeCaseCurrentChatSet(currentActiveCase));
    } else {
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
        dispatch(currentCaseDescription(data.case[0]));
    })
    .catch(error => console.log(error));
}

export const setActiveCaseDisplayed = (caseId) => (dispatch, getState) => {
    const activeCases = getState().casesReducer.activeCases;
    let activeCase = activeCases.find( element => element._id === caseId);
    activeCase.caseStatusChanged = false;
    dispatch(activeCaseDisplayed(activeCases));
}

export const setActiveCaseDialogRead = (caseId) => (dispatch, getState) => {
    let role = getState().accountReducer.role;
    let activeCases = JSON.parse(JSON.stringify(getState().casesReducer.activeCases));
    let currentActiveCase = activeCases.find(activeCase => activeCase._id === caseId);
    role === 'hero' ? currentActiveCase.heroNewMessages = 0 : currentActiveCase.neederNewMessages = 0;
    dispatch(activeCaseDialogRead(activeCases, currentActiveCase));
}