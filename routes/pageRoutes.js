// require express rourer function
const route = require('express').Router();
const { set_token_jwt, auth_jwt } = require('../controler/jwt');
const upload = require('../controler/multerControler');

// require controler files
const pControner=require('../controler/pageControler')

// start get routes
    route.get('/',pControner.homePage)
    route.get('/contact',pControner.contactPage)
    route.get('/about',pControner.aboutPage)
    route.get('/notice',pControner.noticePage)
    route.get('/loaout',pControner.logout)
// set aute

route.get("/admin", auth_jwt, (req,res)=>{
    res.redirect('/notice')
})
    route.post("/loginadmin", set_token_jwt)

// start post rutes
    route.post('/notice', auth_jwt,upload.single('notice'),pControner.addNewNoticeCb)


// start delete route
    route.delete('/notice/:fname',auth_jwt,pControner.deleteNotice)
// expori route
module.exports=route;