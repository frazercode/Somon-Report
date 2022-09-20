const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const add = async (req,res) => {
    if (!req.session.user?.isAdmin) return res.status(401).send({message:"Not authorized"});
    const {firstName,lastName,username,email,password,occupation,nationality,contactPhone,birthDay,birthMonth,birthYear} = req.body;
    if (await UserModel.findOne({username})) return res.status(409).send({message:"User already exists"});
    let hashedPassword = bcrypt.hashSync(password,10);
    let newUser = await new UserModel({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        occupation,
        nationality,
        contactPhone,
        dateOfBirth: {
            day:birthDay,
            month:birthMonth,
            year:birthYear,
        }
    }).save();
    res.send(newUser);
}

const update = async (req,res) => {
    if (!req.session.user?.isAdmin) return res.status(401).send({message:"Not authorized"});
    const {username,password,firstName,lastName,email,occupation,contactPhone,isAdmin} = req.body;
    let user = await UserModel.findOne({username});
    if (!user) return res.status(404).send({message: "User not found"});
    if (password !== undefined){
        let hashedPassword = bcrypt.hashSync(password,10);
        user.password = hashedPassword;
    } 
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (occupation !== undefined) user.occupation = occupation;
    if (contactPhone !== undefined) user.contactPhone = contactPhone;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    res.send(await user.save());
}

const remove = async (req,res) => {
    if (!req.session.user?.isAdmin) return res.status(401).send({message:"Not authorized"});
    const {username} = req.body;
    res.send(await UserModel.deleteOne({username}));
}

const list = async (req,res) => {
    if (!req.session.user?.isAdmin) return res.status(401).send({message:"Not authorized"});
    res.send(await UserModel.find({}));
}

const login = async (req,res) => {
    const {username,password} = req.body;
    let user = await UserModel.findOne({username});
    if (!user) return res.status(404).send({message:"Login failed (user not found)"});
    if (!bcrypt.compareSync(password,user.password)) return res.status(401).send({message: "Incorrect password"});
    req.session.user = user;
    req.session.save();
    res.send(user);
}

const logout = async (req,res) => {
    req.session.destroy();
    res.send({message: "Logged out"});
}

const me = async (req,res) => {
    if (!req.session.user) return res.send({});
    res.send(req.session.user);
}

module.exports = {
    add,remove,update,list,login,logout,me
}