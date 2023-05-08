const express = require("express")
const pool = require("../database")

const router = express.Router()
router.get("/add", (req,res)=> { 
    res.send("Form")
})


module.exports = router


