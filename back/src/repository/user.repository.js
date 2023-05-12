const pool = require('../database/init')

const userRepository = {};

userRepository.create = async (user, password, name) => {
    const text = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)'
    const values = [user,password, name]
    return pool.query(text, values)
}

userRepository.countUserByEmail = async (username) => {
    const text = `SELECT COUNT (*) FROM users WHERE email ='${username}'`;
    return pool.query(text);
}

userRepository.findUserNameByEmail = async (username) => {
    const nameUser = `SELECT name FROM users WHERE email = '${username}'`
    return pool.query(nameUser)
}

userRepository.getPasswordByEmail = async (username) => {
    const queryPassword = `SELECT password FROM users WHERE email = '${username}'`
    return pool.query(queryPassword)
}

userRepository.getEmailByEmail = async (username) => {
    const queryUsername = `SELECT email FROM users WHERE email = '${username}'`
    return pool.query(queryUsername)

}

module.exports = userRepository;