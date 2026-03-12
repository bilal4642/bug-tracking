const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:any){
        cb(null, "uploads/bug");
    },
    filename: function (req:any, file:any, cb:any){
        const uniqueName = Date.now()+path.extname(file.originalname);
        cb(null,uniqueName)
    }
});

const upload = multer({storage})

module.exports = upload;