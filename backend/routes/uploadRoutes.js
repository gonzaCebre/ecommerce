import path from 'path'
import express from 'express'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js';
import { promises as fsPromises, mkdir } from 'fs';


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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para manejar la carga de imágenes
router.post('/', upload.single('image'), async (req, res) => {
    try {
      const file = req.file;
  
      // Ruta del directorio temporal
      const tempDirectory = '../../temp/'; // Ajusta la ruta según tus necesidades  
 
      // Ruta completa del archivo temporal
      const tempFilePath = `${tempDirectory}/${file.originalname}`;
  
      // Guarda temporalmente el búfer en un archivo
      await fsPromises.writeFile(tempFilePath, file.buffer);
  
      // Sube el archivo temporal a Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: 'auto',
        public_id: 'tu_prefijo/' + file.originalname
      });
  
      const imageUrl = result.secure_url; // Obtén la URL segura de la imagen
      console.log(imageUrl);
  
      // Elimina el archivo temporal después de subirlo
      await fsPromises.unlink(tempFilePath);
  
      res.status(200).send({
        message: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      res.status(500).send('Error al cargar la imagen: ' + error.message);
    }
  });

export default router;