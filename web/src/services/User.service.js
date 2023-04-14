import instance from "./../helpers/Instance"

const path = '/user';

const login = async ({ email, password }) => {
    return await instance.post(path + '/login', { email, password });
}

const register = async ({ email, firstName, lastName, password }) => {
    return await instance.post(path + '/register', { email, firstName, lastName, password });
}

export const UserService = {
    login,
    register
}