import request from "./Request"

const getReports = async (page,rowsPerPage) => {
    return await request('GET', 'report', {page,rowsPerPage});
}

export {
    getReports
}