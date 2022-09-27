// const bcrypt = require('bcrypt'); // uninstalled bcrypt npm form module 
const sessions = require('express-session');

var jwt = require('jsonwebtoken');
const createError=require("http-errors");


const auth_jwt=(req,res,next)=>{
    try {
        // let token =req.cookies[process.env.cookie_name];
        // let decoded = jwt.verify(token, process.env.jwt_secret);
        // console.log("success full auth");
        // next();
        console.log('auth testing');
        if (jwt.verify(req.session.token, process.env.jwt_secret)) {
            console.log("auth"+JSON.stringify(req.session));            
            next();
        } else {
            res.render("./loginadmin",{pageTitle:"login foe supar power", _ORG_NAME:process.env.APPNAME});
        }
    } catch (err) {
        res.render("./loginadmin",{pageTitle:"login foe supar power", _ORG_NAME:process.env.APPNAME});
    }
    
}

//-------------------------------------------------------------
const admin={
    thisIsUsername:"p",
}
const set_token_jwt= async(req,res)=>{
    let username=req.body.username;

    try{
        console.log(req.body);
        console.log(admin);
        // let isValidPassword=await bcrypt.compare(req.body.password, admin[0].password);
        let isValidPassword=req.body.password === admin[username];
        if(isValidPassword) {
            //genaret token
            console.log("toket true");
            let token = jwt.sign({username}, process.env.jwt_secret);
            //session set
            req.session.token=token;
            res.redirect('/notice')
        }else{
           throw createError( "Authetication failed!");
        }
    } catch (err){
        // throw createError( "Authetication failed!");
        res.render("./loginadmin",{pageTitle:"login foe supar power", _ORG_NAME:process.env.APPNAME,
                                            data:{
                                                username:username,
                                            },
                                            error:{
                                                common:{
                                                    msg:err.message,
                                                },
                                            },});

    }

}

module.exports={auth_jwt,set_token_jwt};