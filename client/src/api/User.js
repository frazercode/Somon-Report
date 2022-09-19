import request from "./Request"

const login = async (username, password) => {
    return await request('POST', 'user/login', {username,password});
}

const me = async () => {
    return await request('GET', 'user/me');
}

const logout = async () => {
    return await request('POST', 'user/logout');
} 

export { 
    login,me,logout
}