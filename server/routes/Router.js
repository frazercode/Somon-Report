module.exports = (app) => {
    app.use('/user', require('./UserRouter'));
    
    app.use('/report', require('./ReportRouter'));
};

