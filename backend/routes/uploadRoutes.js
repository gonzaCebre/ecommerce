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

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/; //Expresion regular con las extensiones que queremos permitir
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if(extname && mimetype){
        cb(null, true)
    } else {
        cb( new Error('Images only!'), false)
    }
}

const upload = multer({storage, fileFilter});
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err){
        if(err){
            res.status(400).send({message: err.message});
        }

        // Configura el encabezado CORS manualmente
        res.header('Access-Control-Allow-Origin', '*');

        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});

export default router;