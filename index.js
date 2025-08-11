const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS
app.use(cors());

// Configuración multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando en Railway!');
});

// Endpoint para recibir foto
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió foto' });
  }
  console.log('Foto recibida:', req.file.originalname, req.file.size, 'bytes');
  res.json({ message: 'Foto recibida correctamente', filename: req.file.originalname });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
