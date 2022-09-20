const ReportModel = require('../models/ReportModel');
const uuid = require('uuid');
const fs = require('fs');
const pathNode = require('path');

const add = async (req,res) => {
    if (!req.session.user?.username) return res.status(401).send({message:"Not authorized"});
    const {title,details,type} = req.fields;
    let filesArr = [];
    let files = req.files.list;
    // console.log(files);
    if (!Array.isArray(files) && files.path){
        files = [req.files.list];
    }
    if (Array.isArray(files)){
        for (let file of files){
            let path = file.path;
            let name = file.name;
            let size = file.size;
            if (size === 0) continue;
            let mongoPath = `${Date.now()}-${name}`;
            let newPath = `./files/${mongoPath}`;
            fs.copyFileSync(path,newPath);
            fs.unlinkSync(path);
            filesArr.push({
                name,
                path: mongoPath
            });
        }
    }
    let newReport = await new ReportModel({
        id: uuid.v1(),
        title,
        details,
        type,
        date: Date.now(),
        user: req.session.user.username,
        files: filesArr          
    }).save();
    res.send(newReport);
}

const remove = async (req,res) => {
    if (!req.session.user?.isAdmin) return res.status(401).send({message:"Not authorized"});
    const {id} = req.body;
    res.send(await ReportModel.deleteOne({id}));
}

const list = async (req,res) => {
    if (!req.session.user?.username) return res.status(401).send({message:"Not authorized"});
    const {page,rowsPerPage,type} = req.query;
    let query = {};
    if (!req.session.user.isAdmin) query.user = req.session.user.username;
    if (type) query.type = new RegExp(type,'i'); 
    res.send(await ReportModel.find(query).sort({date:'desc'}).skip(page*rowsPerPage).limit(rowsPerPage));
}

const serveFile = async (req,res) => {
    if (!req.session.user?.username) return res.status(401).send("");
    let decodedPath = decodeURIComponent(req.params.path);
    console.log(decodedPath);
    res.sendFile(pathNode.join(__dirname,'../files/',`${decodedPath}`))
}

module.exports = {
    add,remove,list,serveFile
}