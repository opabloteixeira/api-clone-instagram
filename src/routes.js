const express = require("express")
const PostControllers = require('./controllers/PostController')
const LikeControllers = require('./controllers/LikeController')
const multer = require('multer')
const uploadConfig = require('./config/upload')


const routes = new express.Router()
const upload = multer(uploadConfig)


routes.get('/posts', PostControllers.index)
routes.post('/posts', upload.single('image'), PostControllers.store)
routes.post('/posts/:id/like', LikeControllers.store)

//passar paramentros por get
/* app.get('/', (req, res) => {
    return res.send(`Hello ${req.query.name}`)
}) */

module.exports = routes