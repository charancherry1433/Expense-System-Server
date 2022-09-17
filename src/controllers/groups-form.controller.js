const faker = require('faker');
var userquery = require('../libraries/userquery.js');
var USERS = require('../models/Users.model.js');
var GROUPS = require('../models/Groups.model.js');
var EXPENSES = require('../models/Expenses.model.js');

// ADD new groups - POST METHOD
let addGroups = async (request, response, next) => {

    console.log("request body isssss", request.body);

    let reply = {};

    try {
        await userquery.insertTable(GROUPS.tableName, request.body).then(resp => {

            console.log("response of inserted group data", resp);

            reply = {
                success: true,
                error: false,
                message: 'New group added successful',
                data: resp
            }

        }).catch(errInsert => {
            throw errInsert;
        });

    } catch (error) {
        console.log("Error while inserting new group", error);
        reply = {
            success: false,
            error: true,
            message: 'Error while inserting new group',
            data: []
        }
    }

    return response.status(200).json(reply);
}

// GET groups
let getGroups = async (request, response, next) => {
    console.log("request body isssss", request.body);

    let reply = {};
    let groupsList = [];
    let groupsCount = [];

    try {

        let {
            limit,
            page,
            query
        } = request.body;

        page = (Number(page) - 1) * Number(limit);

        const where = `group_name LIKE '%${query}%' OR created_at LIKE '%${query}%'`;

        // SELECT LIST query
        await GROUPS.query().select('*').whereRaw(where).limit(limit).offset(page).then(async list => {
            console.log('Get groups list response', list);
            groupsList = list;
        }).catch(errGet => {
            throw errGet;
        });

        // COUNT SELECT query
        await GROUPS.query().count('* as totalGroups').whereRaw(where).then(async count => {
            console.log('Get groups count response', count);
            groupsCount = count;
        }).catch(errCount => {
            throw errCount;
        });

        reply = {
            success: true,
            error: false,
            message: 'Ger groups successful',
            data: {
                data: groupsList,
                count: groupsCount[0].totalGroups
            }
        }

    } catch (error) {
        console.log('Error while getting groups', error);
        reply = {
            success: false,
            error: true,
            message: 'Error while getting groups',
            data: null
        }
    }

    return response.status(200).json(reply);
}

module.exports = {
    addGroups,
    getGroups
}