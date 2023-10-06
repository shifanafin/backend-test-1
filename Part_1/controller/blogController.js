const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const sharp = require('sharp'); 

const blogsFilePath = path.join(__dirname, '../blogs.json');
let blogsData = [];

try {
    blogsData = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
} catch (error) {
    console.error('Error reading blogs data:', error);
}


const addBlogPost = async (req, res) => {
    const { title, description, main_image, additional_images, date_time } = req.body;
    
    if (!title || title.length < 5 || title.length > 50 || /[^a-zA-Z0-9\s]/.test(title)) {
      slugify(title, { lower: true })
        return res.status(400).json({ error: 'Invalid title' });
    }

    if (!description || description.length > 500) {
        return res.status(400).json({ error: 'Invalid description' });
    }

    if (!main_image || !main_image.endsWith('.jpg') || main_image.length > 1048576) {
        return res.status(400).json({ error: 'Invalid main_image' });
    }

    if (additional_images) {
        if (!Array.isArray(additional_images) || additional_images.length > 5) {
            return res.status(400).json({ error: `Invalid additional_images ${additional_images}` });
        }

        for (const image of additional_images) {
          if (!/\.(jpeg|jpg)$/.test(image) || image.length > 1048576) {
            return res.status(400).json({ error: `Invalid additional_images extension ${image}` });
        }
        }
    }

    if (!date_time || date_time <= Math.floor(Date.now() / 1000)) {
        return res.status(400).json({ error: 'Invalid date_time' });
    }

   
    const compressImage = async (image) => {
        const compressedImage = await sharp(image)
            .resize({ fit: 'inside', width: 800, height: 800 })
            .toBuffer();
        return compressedImage;
    }

    
    const saveImage = async (image, fileName) => {
        fs.writeFileSync(`images/${fileName}`, image, 'binary');
    }

    try {
        const compressedMainImage = await compressImage(main_image);
        const mainImageFileName = `main_image_${Date.now()}.jpg`;
        await saveImage(compressedMainImage, mainImageFileName);

        const compressedAdditionalImages = await Promise.all(
            additional_images.map(async (image) => await compressImage(image))
        );
        const additionalImageFileNames = compressedAdditionalImages.map((_, index) => `additional_image_${index}_${Date.now()}.jpg`);
        await Promise.all(additionalImageFileNames.map(async (fileName, index) => await saveImage(compressedAdditionalImages[index], fileName)));

        const reference = (parseInt(blogsData[blogsData.length - 1].reference) + 1).toString().padStart(5, '0');
        
        const title_slug = slugify(title, { lower: true });

        const newBlogPost = {
            reference,
            title:title_slug,
            description,
            main_image: `images/${mainImageFileName}`,
            additional_images: additionalImageFileNames.map(fileName => `images/${fileName}`),
            date_time,
           
        };

        blogsData.push(newBlogPost);

        fs.writeFileSync(blogsFilePath, JSON.stringify(blogsData, null, 4), 'utf8');

        return res.json(newBlogPost);
    } catch (error) {
        console.error('Error compressing and saving images:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllBlogPosts = (req, res) => {
  const isoDateStringToUnixTimestamp = (isoString) => {
    const date = new Date(isoString);
    return Math.floor(date.getTime() / 1000);
  }
  const formattedBlogsData = blogsData.map(blog => {
    return {
      ...blog,
      date_time: isoDateStringToUnixTimestamp(blog.date_time),
    };
  });

    return res.json(formattedBlogsData);
}

module.exports = { addBlogPost, getAllBlogPosts };
