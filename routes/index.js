var express = require('express');
var blogs = require('../assets/blogs.json')
var router = express.Router();
const fs = require('fs');
const path = require('path');

// Returns the list of all blogs
router.get('/', function(req, res, next) {
  res.json(blogs);
});

// Opens files system to read the Blogs Json File
// and later writes on it with the payload which includes
// the new blog
const filePath = path.join(__dirname, '..', 'assets', 'blogs.json');
router.post('/', function(req,res, next) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    let blogs = JSON.parse(data);

    let newBlog = {
      title: req.body.title,
      author: req.body.author,
      date: req.body.date,
      content: req.body.content
    };

    blogs.push(newBlog);

    let updatedBlogs = JSON.stringify(blogs, null, 2);

    fs.writeFile(filePath, updatedBlogs, (err) => {
      if (err) {
          console.error('Error al escribir en el archivo JSON:', err);
          res.status(500).send('Error interno del servidor');
          return;
    }
      console.log('Blog agregado correctamente');
      res.json(blogs);
    });

    if (err) {
      console.error('Error reading file:', err);
      return;
    }
})
})

module.exports = router
