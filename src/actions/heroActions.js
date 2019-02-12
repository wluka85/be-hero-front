import { heroSelfCasesQuery } from './apiQueries'

const setHeroSelfCases = (cases) => ({
    type: 'HERO_CASES_LOADED',
    heroSelfActiveCases: cases
});

export const fetchHeroSelfCases = () => {
    let accessToken = localStorage.getItem('accessToken');
        return dispatch => {
            fetch(heroSelfCasesQuery, {
                method: 'GET',
                headers: {'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
            })
            .then(res => {
                let statusCode = res.status;
                if (statusCode !== 200) {

                } else {
                    return res.json();
                }

            })
            .then(data => {
                dispatch(setHeroSelfCases(data.cases.activeCases));

            })
            .catch(error => console.log(error));
        }
}