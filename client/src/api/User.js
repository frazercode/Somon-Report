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

const listUsers = async () => {
    return await request('GET', 'user');
}

const addUser = async (userInfo) => {
    return await request('PUT', 'user', userInfo);
}

const deleteUser = async(username) => {
    return await request('DELETE', 'user', {username});
}

const updateUser = async(userInfo) => {
    return await request('POST', 'user', userInfo);
}

export { 
    login,me,logout,listUsers,addUser,deleteUser,updateUser
}