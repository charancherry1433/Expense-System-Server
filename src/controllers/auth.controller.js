const JWT = require('jsonwebtoken');
var userquery = require('../libraries/userquery.js');
var USERS = require('../models/Users.model.js');

// GET user login
let userLogin = async (request, response, next) => {
    console.log('request body isss', request.body);
    let reply = {};
    let message = '';
    try {
        const where = `username = '${request.body.username}' AND password = '${request.body.password}'`
        await USERS.query().select('*').whereRaw(where).then(async result => {
            console.log('Get user login response', result);
            if (!result || result.length == 0) {
                throw message = 'Invalid username or password'
            }
            result[0].token = JWT.sign({
                email: result[0].email,
                password: result[0].password
            }, process.env.SECURITY_KEY, {
                algorithm: 'HS256',
                expiresIn: '24h'
            });
            reply = {
                success: true,
                error: false,
                message: 'Login successful',
                data: result[0]
            }
        }).catch(getError => {
            throw getError;
        })
    } catch (error) {
        console.log('Error at try catch API result', error);
        reply = {
            success: false,
            error: true,
            message: message || 'Error while user login',
            data: []
        }
    }
    return response.status(200).json(reply);
}

module.exports = {
    userLogin
}