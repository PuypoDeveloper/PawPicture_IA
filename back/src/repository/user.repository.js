const pool = require('../database/init')

const userRepository = {};

userRepository.create = async (email, password, name) => {
    const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)'
    const values = [email,password, name]
    return pool.query(query, values)
}

userRepository.countUserByEmail = async (email) => {
    const query = `SELECT COUNT (*) FROM users WHERE email ='${email}'`;
    return pool.query(query);
}

userRepository.findUserNameByEmail = async (email) => {
    const query = `SELECT name FROM users WHERE email = '${email}'`
    return pool.query(query)
}

userRepository.getPasswordByEmail = async (email) => {
    const query = `SELECT password FROM users WHERE email = '${email}'`
    return pool.query(query)
}

userRepository.getEmailByEmail = async (email) => {
    const query = `SELECT email FROM users WHERE email = '${email}'`
    return pool.query(query)
}

userRepository.getIdByEmail = async (email) => {
    const query  = `SELECT id FROM users WHERE email = '${email}'`;
    return pool.query(query);
}

module.exports = userRepository;