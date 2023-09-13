const { selectUsers, selectUsersbyId } = require("../models/user_model")

exports.getUsers = (req,res,next)=>{
    selectUsers().then((users)=>{
        res.status(200).send({ users });
    })
    .catch((err)=>{
        next(err);
    })
};

exports.getUsersById = (req, res, next)=>{
    const { username } = req.params
    selectUsersbyId(username).then((user)=>{
        res.status(200).send({ user })
    })
    .catch((err)=>{
        next(err);
    })
}