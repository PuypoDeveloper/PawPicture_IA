const express = require("express")
const config = require("./database")
const {Pool} = require("pg")
const cors = require("cors")

const router = express.Router()
const pool = new Pool(config)

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  router.use(cors(corsOptions));

//INSERT URL 

const insertURL = async (prompt,url,id) => { 
    const queryInsert = `INSERT INTO images (description, url, user_id) VALUES ($1, $2, $3)`
    const values = [prompt,url,id]
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
    const queryId  = `SELECT id FROM login WHERE usuario = '${userId}'`
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
    const queryId  = `SELECT id FROM login WHERE usuario = '${userId}'`
    const id = await pool.query(queryId)
    const idtwo1 = id.rows[0].id
    console.log("RESPUESTAAAAAAAAAAAAAA")
    console.log(idtwo1)
    const urlsend = `SELECT url FROM images WHERE user_id = '${idtwo1}'` 
    const resSend = await pool.query(urlsend)
    console.log(resSend.rows)
    res.send(resSend.rows)
})