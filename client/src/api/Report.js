import request from "./Request"

const getReports = async (page,rowsPerPage,user) => {
    return await request('GET', 'report', {page,rowsPerPage,user});
}

export {
    getReports
}