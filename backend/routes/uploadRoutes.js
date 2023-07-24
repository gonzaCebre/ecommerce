import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router();

//Debemos decirle de donde va a venir la imagen
const storage = multer.diskStorage({ 
    destination(req, file, cb) {
        cb(null, 'uploads/'); //'null' es para un error. 'uploads' es donde se va a guardar
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        //El nombre del archivo va a ser nombre-fecha-extensionOriginalDelArchivo
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/; //Expresion regular con las extensiones que queremos permitir
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({storage});

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: `/${req.file.path}`
    })
})

export default router;