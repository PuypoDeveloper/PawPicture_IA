const express = require("express")
const config = require("./database")
const {Pool} = require("pg")

const pool = new Pool(config)

//funtion add user

const insertUser = async (user,password) => { 
    const text = 'INSERT INTO login (usuario, password) VALUES ($1, $2)'
    const values = [user,password]
    const res = await pool.query(text, values)
    console.log(res);

}


const router = express.Router()


//path to add user

router.post("/newUser", async (req, res) => { 
    const {username, password} = req.body;
    const newData = { 
        username,
        password
    }
    const text = `SELECT COUNT (*) FROM login WHERE usuario ='${username}'`
    const rest = await pool.query(text)
    const count = rest.rows[0].count
    if (count < 1) { 
        console.log("Datos recibidos; ", newData)
        insertUser(newData.username,newData.password)
        res.send(newData)
    }
    else if (count > 0) { 
        console.log("MAYOR QUE 0")
        res.send(false)
    }
    else {
        res.status(500).send('Error processing the request')
    }
    
})

//verify user


router.post("/verifyUser", async (req, res) => { 
    const {username, password} = req.body
    const newData = { 
        username,
        password
    }
    //check if account exists

    const queryUsername = `SELECT usuario FROM login WHERE usuario = '${username}'`
    const rest = await pool.query(queryUsername)
    const checkUser = rest.rows[0] && rest.rows[0].usuario;
    if (checkUser === username) { 

        //verify password

        const queryPassword = `SELECT password FROM login WHERE usuario = '${username}'`
        const restTwo = await pool.query(queryPassword)
        const checkPassword = restTwo.rows[0].password
        if(checkPassword === password) { 
            res.json("correct_password")
        }
        else if (checkPassword !== password) { 
            res.json("Incorrect_password")
        }
    }
    else if (checkUser === undefined || checkUser === null) { 
        res.json("nonexistent_account")
    }
})





module.exports = router


