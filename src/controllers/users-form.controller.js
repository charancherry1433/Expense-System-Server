const _ = require('underscore');
const faker = require('faker');
var userquery = require('../libraries/userquery.js');
var USERS = require('../models/Users.model.js');
var GROUPS = require('../models/Groups.model.js');
var EXPENSES = require('../models/Expenses.model.js');

// ADD new users - POST METHOD
let addUsers = async (request, response, next) => {

    console.log("request body isssss", request.body);

    let reply = {};
    let insertData = [];

    try {
        // for (let i = 0; i < 25; i++) {
        //     insertData.push({
        //         user_id: null,
        //         fullname: faker.name.findName(),
        //         username: faker.internet.userName(),
        //         email: faker.internet.email(),
        //         password: faker.internet.password().substring(0, 10),
        //         mobile: faker.phone.phoneNumber().substring(0, 10),
        //         profile: null,
        //         role: 'user',
        //         status: Math.abs(Math.round(Math.random() * 999))/2 === 0 ? 0 : 1
        //     });
        // }
        // insertData.push(request.body);
        const users = !request.body.user_id ? USERS.query().insert(request.body) : USERS.query().findById(request.body.user_id).patch(request.body);
        await users.then(resp => {
        // await userquery.insertTable(USERS.tableName, insertData).then(resp => {
            console.log("response of inserted/updated user data", resp);
            reply = {
                success: true,
                error: false,
                message: !request.body.user_id ? 'New user added successful' : 'New user updated successful',
                data: resp
            }
        }).catch(errInsert => {
            throw errInsert;
        });
    } catch (error) {
        console.log("Error while inserting/updating new user", error);
        reply = {
            success: false,
            error: true,
            message: !request.body.user_id ? 'Error while inserting new user' : 'Error while updating new user',
            data: []
        }
    }
    return response.status(200).json(reply);
}

// GET users
let getUsers = async (request, response, next) => {
    console.log("request body isssss", request.body);
    let reply = {};
    let usersList = [];
    let usersCount = [];
    try {
        let {
            limit,
            page,
            query
        } = request.body;

        page = (Number(page) - 1) * Number(limit);

        const where = `(fullname LIKE '%${query}%' OR username LIKE '%${query}%' OR email LIKE '%${query}%' OR mobile LIKE '%${query}%') AND user_id != ${Number(request.headers.userid)}`;

        // SELECT LIST query
        await USERS.query().select('*').whereRaw(where).limit(limit).offset(page).then(async list => {
            console.log('Get users list response', list);
            _.each(list, (element) => {
                element.mobile = element.mobile.toString().replace(/\D/g, "");
            });
            usersList = list;
        }).catch(errGet => {
            throw errGet;
        });

        // COUNT SELECT query
        await USERS.query().count('* as totalUsers').whereRaw(where).then(async count => {
            console.log('Get users count response', count);
            usersCount = count;
        }).catch(errCount => {
            throw errCount;
        });
        reply = {
            success: true,
            error: false,
            message: 'Ger users successful',
            data: {
                data: usersList,
                count: usersCount[0].totalUsers
            }
        }
    } catch (error) {
        console.log('Error while getting users', error);
        reply = {
            success: false,
            error: true,
            message: 'Error while getting users',
            data: null
        }
    }
    return response.status(200).json(reply);
}

module.exports = {
    addUsers,
    getUsers
}