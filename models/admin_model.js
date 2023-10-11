const { ident } = require("pg-format");
const { use } = require("../app");
const db = require("../db/connection");


exports.selectAdmins =()=>{
    return db.query(`SELECT * FROM admins`,[])
    .then((result)=>{
        return result.rows
    })
}

exports.selectAdminsbyId =(id)=>{

    return db.query(`SELECT * FROM admins
    WHERE admins.adminname = $1`,[id])
    .then((result)=> {
        if(result.rows.length === 0 ){
            return Promise.reject({
                status:404,
                msg:"user/password can not be found",
              })
             
        }else{
            return result.rows[0]
        }
    })
};