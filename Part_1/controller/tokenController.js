const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
//  Generate timed token for images API
const generateImageToken=(req, res)=> {
  // The API should accept these inputs:1) image_path

    const { image_path } = req.body;
    try{
// Generates a token that will expire after 5 minutes for this exact image_path
    const token = jwt.sign({ image_path }, 'secret_key', { expiresIn: '5m' });

    return res.json({ token });
  }
  catch(error){
    console.log(error)

  }
}
/**## Get image by token API

The API should accept these inputs:
1) image_path
2) token
**/
const getImageByToken = (req, res) => {
  const { image_path, token } = req.body;

  try {
      const decoded = jwt.verify(token, 'secret_key');

      
      if (decoded.image_path !== image_path) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      
      const imageFilePath = path.join(__dirname, '..', image_path);
/** 1) Checks if token is valid (not expired, and is made for the input "image_path"), if invalid then send back an error
2) Sends back the image in a way that browser can display the image (not download it)**/
 
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
