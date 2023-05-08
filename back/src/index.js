const { urlencoded } = require("body-parser")
const express = require ( "express")
const morgan  = require ("morgan")
const path = require('path');
const cors = require("cors")


const app = express()


app.set("port", process.env.PORT || 4000)
app.use(morgan("dev"))
app.use(express(urlencoded({extended: false}))) //types of data received
app.use(express.json())


app.use((req, res, next) => { 
    next()
})

app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

//Public

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require("./routers/index"))
app.use(require("./routers/autentications"))

app.use("/links",require("./routers/links"))

//listen

app.listen(app.get("port"), ()=> { 
    console.log(`listen on port ${app.get("port")}`)
})


