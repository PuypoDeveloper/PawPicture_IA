const userRepository = require('../repository/user.repository');

const userController = {};

userController.createNew = async (req, res) => {
    const { username, password, name } = req.body;
    const newData = { 
        username,
        password,
        name
    };

    newData.password = await herlpers.encryptPassword(password);

    const rest = await userRepository.countUserByEmail(username);
    const { count } = rest.rows[0];
    if (count < 1) { 
        await userRepository.create(newData.username, newData.password, newData.name);
        return res.send([newData.username, newData.name])
    }
    
    if (count > 0) { 
        return res.send('User already exists')
    }     
    
    return res.status(500).send('Error processing the request')

}

userController.verifyUser = async (req, res) => {
    const { username, password } = req.body

    //name user
    const userName = await userRepository.findUserNameByEmail(username)

    //check if account exists
    const rest = userRepository.getEmailByEmail(username)
    const checkUser = rest.rows[0] && rest.rows[0].email;
    if (checkUser === username) { 

        //verify password
        const restTwo = await userRepository.getPasswordByEmail(username)
        const checkPassword = restTwo.rows[0].password

        const validPassword = await herlpers.matchPassword(password,checkPassword)
        if(validPassword) { 
            return res.send(["correct_password", userName.rows[0].name, username])
        }
        
        if (!validPassword ) { 
            return res.json("Incorrect_password")
        }
    }
    
    if (checkUser === undefined || checkUser === null) { 
        return res.json("nonexistent_account")
    }
}

module.exports = userController;