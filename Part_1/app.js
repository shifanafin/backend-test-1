const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());

// Read blogs data from JSON file
const blogsFilePath = path.join(__dirname, 'blogs.json');
let blogsData = [];

try {
    blogsData = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
} catch (error) {
    console.error('Error reading blogs data:', error);
}

const PORT = process.env.PORT || 3000;


const blogRoutes = require('./routes/blogRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
app.get('/',(req,res)=>{
    res.send('<h1>Blog API</h1> <a href="/api/blogs">Blogs</a>')
})
// Use CORS middleware
app.use(cors());

app.use('/api/blogs', blogRoutes);
app.use('/api/tokens', tokenRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});
