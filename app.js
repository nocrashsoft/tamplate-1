// require extarnal npm
const express= require('express');
const multer = require('multer');
const sessions = require('express-session');
const app=express();

// require internal files
const pRoutes=require('./routes/pageRoutes')

// session 
    app.use(sessions({
        secret:process.env.SESS_SECRET,
        saveUninitialized:true,
    // cookie:{},
        resave: false
    }));

// set view wngin
    app.set("view engine","ejs")

// prepayaring using app
    app.use(express.static("public"))
    app.use(express.urlencoded({extended:true}))

// prepayaring internal route files
    app.use(pRoutes)
    
//---------------route not found error-----------------------
app.use((req,res,next)=>{
    res.status(500).json({message:"route not found"});      
});

// default error handler
app.use((err,req,res,next)=>{
    console.log(err);
    if (err) {
        if (err instanceof multer.MulterError) {
                    res.status(500).json({'err': err})
        }
        res.status(500).render('err',{err,pageTitle:'!error', _ORG_NAME:process.env.APPNAME})
        // res.status(500).json({'err':err})
    } else {
        res.status(500).render('err',{err:err.message,pageTitle:'!error', _ORG_NAME:process.env.APPNAME})
        // res.status(500).json({'err':err.message})
    }
})


// exporis this app
module.exports=app;