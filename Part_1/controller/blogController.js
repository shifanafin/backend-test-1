const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const sharp = require('sharp'); 
// Taking the datas from  blogs.json
const blogsFilePath = path.join(__dirname, '../blogs.json');
let blogsData = [];

// Changing the file to format

try {
    blogsData = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
} catch (error) {
    console.error('Error reading blogs data:', error);
}

//  Adding Datas
const addBlogPost = async (req, res) => {
    const { title, description, main_image, additional_images, date_time } = req.body;
    // title (Min 5 characters, Max 50 characters, No special characters, REQUIRED) and
    if (!title || title.length < 5 || title.length > 50 || /[^a-zA-Z0-9\s]/.test(title)) {
      slugify(title, { lower: true })
        return res.status(400).json({ error: 'Invalid title' });
    }
        //   description (Max 500 characters, REQUIRED)
    if (!description || description.length > 500) {
        return res.status(400).json({ error: 'Invalid description' });
    }
    //  main_image (ONLY jpg, MAX size 1MB, REQUIRED)
    if (!main_image || !/\.(jpeg|jpg)$/.test(main_image) || main_image.length > 1048576) {
        return res.status(400).json({ error: 'Invalid main_image' });
    }
    // additional_images (ONLY jpg, Multiple, MAX size 1MB per image, MAX number of images 5, OPTIONAL)

    if (additional_images) {
        if (!Array.isArray(additional_images) || additional_images.length > 5) {
            return res.status(400).json({ error: `Invalid additional_images ${additional_images}` });
        }

        for (const image of additional_images) {
          if (!/\.(jpg)$/.test(image) || image.length > 1048576) {
            return res.status(400).json({ error: `Invalid additional_images extension ${image}` });
        }
        }
    }
// date_time (should be unix time, and not before now, REQUIRED)

    if (!date_time || date_time <= Math.floor(Date.now() / 1000)) {
        return res.status(400).json({ error: 'Invalid date_time' });
    }

//    Compresses the images by 25%
    const compressImage = async (image) => {
        const compressedImage = await sharp(image)
            .resize({ fit: 'inside', width: 800, height: 800 })
            .toBuffer();
        return compressedImage;
    }

    // Saves images in "images/" folder
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
    //    dds reference number incremented from last blog post in "blogs.json"
        const reference = (parseInt(blogsData[blogsData.length - 1].reference) + 1).toString().padStart(5, '0');
        //  Adds "title_slug" which is a slugified version of the title (ex: My Blog Post -> my_blog_post)
        const title_slug = slugify(title, { lower: true });

        const newBlogPost = {
            reference,
            title,
            description,
            main_image: `images/${mainImageFileName}`,
            additional_images: additionalImageFileNames.map(fileName => `images/${fileName}`),
            date_time,
            title_slug
           
        };
        // Saves the blog post in "blogs.json" file

        blogsData.push(newBlogPost);

        fs.writeFileSync(blogsFilePath, JSON.stringify(blogsData, null, 4), 'utf8');

        return res.json(newBlogPost);
    } catch (error) {
        console.error('Error compressing and saving images:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Reads all blog posts from "blogs.json"

const getAllBlogPosts = (req, res) => {
    // Formats "date_time" from unix time stamp into ISO strin
  const isoDateStringToUnixTimestamp = (isoString) => {
    const date = new Date(isoString);
    return Math.floor(date.getTime() / 1000);
  }
//   Returns blog posts
  const formattedBlogsData = blogsData.map(blog => {
    return {
      ...blog,
      date_time: isoDateStringToUnixTimestamp(blog.date_time),
    };
  });
    
    return res.json(formattedBlogsData);
}

module.exports = { addBlogPost, getAllBlogPosts };
