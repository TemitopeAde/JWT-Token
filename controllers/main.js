const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const login = async (req, res) => {
    const {username, password} = req.body
    
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }

    // FOR DEMO PURPOSE, USUALLY PROVIDED BY DB
    const id = new Date().getDate();

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({id,username}, secret, { expiresIn: '30d'})
 
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new CustomAPIError("No token provide", 401)
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new CustomAPIError('Not authorized', 401)
    }
    
    
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello Tope`, secret: `Here is your authorized data, lucky number is ${luckyNumber}` })
}

module.exports = {
    login, 
    dashboard 
}