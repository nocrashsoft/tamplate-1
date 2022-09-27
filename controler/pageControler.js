const notishDataDir = './public/data/notice';
const fs = require('fs');
var jwt = require('jsonwebtoken');

const isAdmin=(req)=>{
    try {
        if (jwt.verify(req.session.token, process.env.jwt_secret)) {
            return(true);
        }else{
            return(false);
        }
    } catch (error) {
        // console.log(error);
        return(false);
    }
}
// defaind a page controler object
const pControner={
    homePage:async(req,res)=>{
        res.status(200).render("index",{pageTitle:process.env.APPNAME, _ORG_NAME:process.env.APPNAME, _admin:isAdmin(req)})
    },
    contactPage:async(req,res)=>{
        res.status(200).render("contact",{pageTitle:'contact -' + process.env.APPNAME, _ORG_NAME:process.env.APPNAME, _admin:isAdmin(req)})
    },
    aboutPage:async(req,res)=>{
        res.status(200).render("about",{pageTitle:'about -' + process.env.APPNAME, _ORG_NAME:process.env.APPNAME, _admin:isAdmin(req)})
    },
    noticePage:async(req,res)=>{
        try {
            console.log(isAdmin(),isAdmin(),isAdmin(),isAdmin(),isAdmin());
        if(isAdmin(req)===true) {
            console.log("show admin ok ");
            fs.readdir(notishDataDir, async(err, files) => {
                res.status(200).render("noticeforAdmin",{pageTitle:'notice -' + process.env.APPNAME, _ORG_NAME:process.env.APPNAME, files, _admin:isAdmin(req)})
            });
        } else {
            fs.readdir(notishDataDir, async(err, files) => {
                res.status(200).render("notice",{pageTitle:'notice -' + process.env.APPNAME, _ORG_NAME:process.env.APPNAME, files:files, _admin:isAdmin(req)})
            });
        }
        } catch (error) {
            fs.readdir(notishDataDir, async(err, files) => {
                res.status(200).render("notice",{pageTitle:'notice -' + process.env.APPNAME, _ORG_NAME:process.env.APPNAME, files:files, _admin:isAdmin(req)})
            });
        }
    },
// control post method for notice add
    addNewNoticeCb:async(req,res)=>{
        res.redirect('/notice')
    },
    deleteNotice:async(req,res)=>{
        try {
            const fname=req.params.fname;
            fs.rm(`${notishDataDir}/${fname}`, { recursive:true }, (err) => {
                if(err){
                    // File deletion failed
                    console.log(err.message);
                    res.status(500).json({err:'something was wrong'})
                }else{
                    console.log("File deleted successfully");
                    res.json({message:"File deleted successfully"})
                }
            })
        } catch (error) {
            res.status(500).json({err:'something was wrong'})
        }
     
          
    },
    logout:async(req,res)=>{
        try {
            console.log("logout");
            req.session.destroy();
            // res.redirect('/login');
            console.log("logout success");
            res.redirect('/')
        } catch (err) {
            res.status(500).send(err)
            res.redirect('/')
        }
    },
};

// export page controner Object
module.exports=pControner;