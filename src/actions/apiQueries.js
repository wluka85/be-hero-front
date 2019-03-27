// export const url = 'http://localhost:4000/';
export const url = 'https://beheroback.herokuapp.com/';

export const loginQuery = url + 'signin';
export const registerQuery = url + 'signup';
export const heroSelfCasesQuery = url + 'hero-main/my-cases';
export const neederSelfCasesQuery = url + 'needer-main/my-cases';
export const getCasesQuery = (role) => {
    return url + role + '-main/my-cases/';
}