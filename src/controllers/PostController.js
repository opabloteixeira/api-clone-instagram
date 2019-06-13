const Post = require('../models/Post')
const sharp = require('sharp')
const fs = require('fs') //depedencia do node file system
const path = require('path') // dependencia do node para caminhos

module.exports = {

    async index(req, res) {
        const posts = await Post.find().sort('-createdAt') //busca os itens decrescente 
        return res.json(posts)
    },

    //salva o arquivo e 
    async store(req, res){
        console.log(req.body)
        console.log(req.file)

        const {author, place, description, hashtags} = req.body
        const {filename: image} = req.file

        const [name] = image.split('.')
        const imagejpg = `${name}.jpg`

        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
            path.resolve(req.file.destination, 'resized', imagejpg)) //redimensiona a imagem

        fs.unlinkSync(req.file.path) //deleta imagem grande

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: imagejpg,
        })

        req.io.emit('post', post) // evia o acesso em tempo real

        return res.json(post)
    }
}