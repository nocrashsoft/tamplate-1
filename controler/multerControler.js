const multer  = require('multer');
const path = require('path');

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/data/notice/')
    },
    filename:(req,file,cb)=>{
        const fileExt = path.extname(file.originalname);
        const filename= file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-") +"_N_"+ Date.now();
        cb(null,filename+ fileExt)
    }
})


const upload = multer({
    storage: storage,
    limits:{
        fileSize:1000000 * 5 // 5mb
    },
    fileFilter:(req, file, cb)=>{
        if (
            file.mimetype === "application/pdf"|| 
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
            ) {
                cb(null, true)
        }else{
            cb(new Error('only pdf file, (png, jpg or jpeg) image allowed'))
        }
    },
    })

module.exports=upload;
