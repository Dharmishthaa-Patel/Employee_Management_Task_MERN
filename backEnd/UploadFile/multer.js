const multer = require('multer');
const path = require('path');


module.exports = multer({
    storage: multer.diskStorage({ 
        // ============= For add Extension ========
                filename: (req, file, cb) => {
                cb(null, file.fieldname + '--' + Date.now()
                + path.extname(file.originalname))
            }
    }),
    limits: {
            fieldNameSize: 200,
            fileSize: 5 * 1024 * 1024,  //5MB
        },
    // fileFilter: (req, file, cb) => {

    //     let ext = path.extname(file.originalname)

    //     if(ext === '.png' || ext === '.jpg' || ext === 'jpeg' || 
    //        ext === '.doc' || ext === '.docx' || ext === '.txt' || 
    //        ext === '.pdf' || ext === '.xml'){
    //         cb(null, true)
    //     } else {
    //         cb(new Error("This Type of File is Not supported"), false)
    //         return
    //     }
    // }
});
