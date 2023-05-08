const express = require("express")
const {Pool} = require("pg")

const config =  ({
    user: "postgres",
    host: "localhost",
    password: "123456",
    database: "PawPicture"
})

const pool = new Pool(config)

const insertUser = async (user,password) => { 
    const text = 'INSERT INTO login (usuario, password) VALUES ($1, $2)'
    const values = [user,password]
    const res = await pool.query(text, values)
    console.log(res);
    pool.end();
}


const router = express.Router()


router.post("/add", async (req, res) => { 
    const {username, password} = req.body;
    const newData = { 
        username,
        password
    }
    console.log("Datos recibidos; ", newData)
    insertUser(newData.username,newData.password)
    res.send(newData)
})


module.exports = router


