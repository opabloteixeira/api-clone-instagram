const multer = require('multer')

//lib nativa do node pra lidar com caminhos
const path = require('path')


module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
}