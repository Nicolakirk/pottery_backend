const { selectAdmins, selectAdminsbyId } = require("../models/admin_model");


exports.getAdmins = (req,res,next)=>{
    selectAdmins().then((admins)=>{
        res.status(200).send({ admins});
    })
    .catch((err)=>{
        next(err);
    })
};

exports.getAdminsById = (req, res, next)=>{
    const { adminname } = req.params
    selectAdminsbyId(adminname).then((admin)=>{
        res.status(200).send({ admin })
    })
    .catch((err)=>{
        next(err);
    })
}