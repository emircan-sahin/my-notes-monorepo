import instance from "./../helpers/Instance"

const path = '/note';

const get = async ({ id }) => {
    return await instance.get(path + '/get/' + id);
}

const getAll = async () => {
    return await instance.get(path + '/getAll');
}

const create = async ({ title, content }) => {
    return await instance.post(path + '/create', { title, content });
}

const update = async ({ id, title, content }) => {
    return await instance.put(path + '/update/' + id, { title, content });
}

const remove = async({id}) => {
    return await instance.delete(path + '/remove/' + id);
}

export const NoteService = {
    get,
    getAll,
    create,
    update,
    remove
}