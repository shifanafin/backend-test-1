const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const generateImageToken=(req, res)=> {
    const { image_path } = req.body;
    try{

    const token = jwt.sign({ image_path }, 'secret_key', { expiresIn: '5m' });

    return res.json({ token });
  }
  catch(error){
    console.log(error)

  }
}

const getImageByToken = (req, res) => {
  const { image_path, token } = req.body;

  try {
      const decoded = jwt.verify(token, 'secret_key');

      
      if (decoded.image_path !== image_path) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      
      const imageFilePath = path.join(__dirname, '..', image_path);

 
      if (!fs.existsSync(imageFilePath)) {
          return res.status(404).json({ error: 'Image not found' });
      }

      const imageBuffer = fs.readFileSync(imageFilePath);

      
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(imageBuffer);
  } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { generateImageToken, getImageByToken };
