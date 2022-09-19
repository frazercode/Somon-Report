import request from "./Request"

const login = async (username, password) => {
    return await request('POST', 'user/login', {username,password});
}

const me = async () => {
    return await request('GET', 'user/me');
} 

export { 
    login,me
}