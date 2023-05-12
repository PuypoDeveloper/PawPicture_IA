const express = require("express")
const config = require("./database")
const cors = require("cors")
const imageDownloader = require('./image-downloader').download
const uuid = require("uuid")
const path = require("path")

const router = express.Router()


//INSERT URL 



const insertURL = async (prompt,url,id) => { 
    const uniqueIdImage = uuid.v4()
    const timestamp = Date.now()
    const filename = path.join( __dirname,'../public/images/'.concat(`${uniqueIdImage}${timestamp}.jpg`)) ;
    imageDownloader(url, filename, function(){});
    const queryInsert = `INSERT INTO images (description, url, user_id) VALUES ($1, $2, $3)`
    const values = [prompt,filename,id]
    const res = await pool.query(queryInsert,values)
}


//SAVE PROPMT AND URL


router.post("/URL", async (req, res) => { 
    const {prompt, url, userId} = req.body
    const newDate = { 
        prompt,
        url,
        userId
    }
    const queryId  = `SELECT id FROM users WHERE email = '${userId}'`
    const id = await pool.query(queryId)
    const idTwo = id.rows[0].id
    insertURL(prompt,url,idTwo)
    res.send(true)
})

module.exports = router


//SEND INFO

router.post("/SEND", async (req, res) => { 
    const {prompt, url, userId} = req.body
    const newDate = { 
        prompt,
        url,
        userId
    }
    const queryId  = `SELECT id FROM users WHERE email = '${userId}'`
    console.log("BEFORE")
    const id = await pool.query(queryId)
    console.log("AFTER-1")
    const newId = id.rows[0].id
    console.log("AFTER-2")
    console.log("NEW ID: "+ JSON.stringify(newId))
    const imagesSend = `SELECT url FROM images WHERE user_id = ${newId}`
    console.log("AFTER-3")
    const resImagesSend = await pool.query(imagesSend)
    console.log("AFTER-4")
    const urlImage = resImagesSend.rows
    console.log("AFTER-5")
    console.log(urlImage)
    console.log("AFTER-6")
    res.send(urlImage)
    console.log("AFTER-6")

    
})