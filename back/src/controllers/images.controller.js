const uuid = require("uuid");
const path = require("path");
require("dotenv").config()
const azureStorage = require("azure-storage")
const imageDownloader = require('./image-downloader').download;
const userRepository = require('../repository/user.repository');
const imagesRepository = require('../repository/images.repository');



//azure storage
const connectionString = process.env.CONNECTION_STRING;
const blobService = azureStorage.createBlobService(connectionString)
const containerName = 'imagenes';

const imagesController = {};

imagesController.downloadImage = async (url) =>{
    const uniqueIdImage = uuid.v4()
    const timestamp = Date.now()
    const filename = path.join( __dirname,'../public/images/'.concat(`${uniqueIdImage}${timestamp}.jpg`));
    const fileName = `${uniqueIdImage}${timestamp}.jpg`
    
    await new Promise((resolve, reject) => {
        imageDownloader(url, filename, function(error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    
    await new Promise((resolve, reject) => {
        blobService.createBlockBlobFromLocalFile(containerName, fileName, filename, function(error, result, response) {
          if (error) {
            reject(error);
          } else {
            console.log("La imagen se ha subido exitosamente a Azure Blob Storage.");
            resolve();
          }
        });
      });

      const ruteImage = `https://imagespawpictures.blob.core.windows.net/imagenes/${uniqueIdImage}${timestamp}.jpg`

    return ruteImage
}

imagesController.save = async (req, res) => {
    const {prompt, url, userId} = req.body
    const data = await userRepository.getIdByEmail(userId);
    const { id } = data.rows[0];
    const iamgeSendUrl = await imagesController.downloadImage(url);
    imagesRepository.saveImage(prompt, iamgeSendUrl, id);
    
    return res.send(true)
}

imagesController.getIdByEmail = async (req, res) => {
    const { userId } = req.body;
    const data = await userRepository.getIdByEmail(userId);
    const { id } = data.rows[0];
    const resImagesSend = await imagesRepository.getURLImagesByUserId(id)
    const urlImage = resImagesSend.rows
    res.send(urlImage)
}

module.exports = imagesController;