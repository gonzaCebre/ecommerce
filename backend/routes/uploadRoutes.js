import path from 'path'
import express from 'express'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js';
import { promises as fsPromises } from 'fs';


const router = express.Router();
/* 
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
    uploadSingleImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // MulterError es un error específico de multer
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // Otro tipo de error
            return res.status(500).json({ message: err.message });
        }

        // Verifica que req.file esté definido antes de acceder a req.file.path
        if (req.file) {
            res.status(200).json({
                message: 'Image uploaded successfully',
                image: `/${req.file.path}`,
            });
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }
    });
}); */

/* router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err){
        if(err){
            res.status(400).send({message: err.message});
        }

        // Verifica que req.file esté definido antes de acceder a req.file.path
        if (req.file) {
            res.status(200).send({
                message: 'Image uploaded successfully',
                image: `/${req.file.path}`,
            });
        } else {
            res.status(400).send({ message: 'No file uploaded' });
        }
    });
}); */



// Configura multer para manejar la carga de archivos
/* const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para manejar la carga de imágenes
router.post('/', upload.single('image'), async (req, res) => {
    try {
      const file = req.file;
  
      // Sube el búfer directamente a Cloudinary
      const result = await cloudinary.uploader.upload(file.buffer, {
        resource_type: 'auto',
        public_id: 'tu_prefijo/' + file.originalname
      });
  
      const imageUrl = result.secure_url; // Obtén la URL segura de la imagen
      console.log(imageUrl);
  
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      res.status(500).send('Error al cargar la imagen: ' + error.message);
    }
  }); */



const storage = multer.memoryStorage();
const multerUploads = multer({ storage: storage }).single('file');

app.post('/upload', multerUploads, async (req, res) => {
  try {
    if (req.file) {
      const cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "temp" }, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ msg: "Error al cargar la imagen en Cloudinary" });
        }

        console.log(result);
        res.json({ public_id: result.public_id, url: result.secure_url });
      });

      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    } else {
      return res.status(400).json({ msg: "No se ha proporcionado ningún archivo." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
});

export default router;