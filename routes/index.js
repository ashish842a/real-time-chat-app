const express = require('express');
const router = express();
const userModel = require('./users');
const multer = require('multer');

// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");  
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9) + ".jpg";
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/photo', upload.single('image'), async function (req, res, next) {
  try {
    let photo = await userModel.create({
      photo: `/images/uploads/${req.file.filename}`
    });

    let imgUrl = `/images/uploads/${req.file.filename}`;
    
    // console.log("image", imgUrl);
    res.status(200).json({data: imgUrl});
    
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

router.get("/data",(req,res)=>{
  res.json("daata");
})



module.exports = router;
