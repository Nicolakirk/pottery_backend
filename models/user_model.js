const { ident } = require("pg-format");
const { use } = require("../app");
const db = require("../db/connection");


exports.selectUsers =()=>{
    return db.query(`SELECT * FROM USERS`,[])
    .then((result)=>{
        return result.rows
    })
}

exports.selectUsersbyId =(id)=>{
   
    return db.query(`SELECT * FROM users 
    WHERE users.username = $1`,[id])
    .then((result)=> {
        if(result.rows.length === 0 ){
            return Promise.reject({
                status:404,
                msg:"Product can not be found",
              })
             
        }else{
            return result.rows[0]
        }
    })
};