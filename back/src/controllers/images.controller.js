const uuid = require("uuid");
const path = require("path");

const imageDownloader = require('./image-downloader').download;
const userRepository = require('../repository/user.repository');
const imagesRepository = require('../repository/images.repository');

const imagesController = {};

imagesController.downloadImage = async (url) =>{
    const uniqueIdImage = uuid.v4()
    const timestamp = Date.now()
    const filename = path.join( __dirname,'../public/images/'.concat(`${uniqueIdImage}${timestamp}.jpg`));

    imageDownloader(url, filename, function(){});
}

imagesController.save = async (req, res) => {
    const {prompt, url, userId} = req.body

    const data = await userRepository.getIdByEmail(userId);
    const { id } = data.rows[0];

    imagesController.downloadImage(url);
    imagesRepository.saveImage(prompt, url, id);
    
    return res.send(true)
}

imagesController.getIdByEmail = async (req, res) => {
    const { userId } = req.body;

    const data = await userRepository.getIdByEmail(userId);
    const { id } = data.rows[0];

    const resImagesSend = await imagesRepository.getURLImagesByUserId(id)
    const urlImage = resImagesSend.rows
    
    console.log(urlImage)
    res.send(urlImage)
}

module.exports = imagesController;