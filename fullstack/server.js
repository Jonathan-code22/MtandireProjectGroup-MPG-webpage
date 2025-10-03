const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) 
  fs.mkdirSync(uploadDir);

app.use(express.static(path.join(__dirname,'public')));

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination:function(req,file,cb) {
  cb(null, 'uploadDir');
}, filename: function(req,file,cb){
  cb(null, Date.now() + '-' + file.originalname);},
});

const allowed = '/\.(jpg|jpeg|png|gif|pdf|doc|docx|mp4|avi|mov)$i';

const upload = multer({storage,
  limits: {
    fileSize: 500*1024*1024,
  },
  fileFilter: function(req,file,cb){
    if (allowed.test(file.originalname)){
      cb(null,true);
    } else {
      cb(new Error('only images, PDFs, Word docs or Videos are allowed'));
    }
  },

});

app.post('/upload', 
  upload.array('myFiles', 10), (req,res) =>  {
    res.json({success: true, files:
      req.files.map(f=>f.filename)});
});

app.get('/files', (req,res) => {
  fs.readdir(uploadDir,(err,files) => {
    if (err) return
    res.status(500).json({success: false,
      message: err.message      
    });
    res.json({success: true, files});
  });
});

app.use((err,req,res,next) => {
  if (err instanceof multer.MulterError || err.message)
  {
    return 
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next(err);
});


app.listen(PORT, () => console.log(`server running on http://localhost: ${PORT}`));