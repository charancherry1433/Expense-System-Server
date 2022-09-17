const express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth.controller');
var expensesCtrl = require('../controllers/expenses-form.controller.js');
var userCtrl = require('../controllers/users-form.controller.js');
var groupsCtrl = require('../controllers/groups-form.controller.js');

// Server routes
router.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Socket works!'
    });
})

router.get('/server', (req, res, next) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

router.post('/login', authCtrl.userLogin);

router.post('/addNewUser', userCtrl.addUsers);
router.post('/getUsers', userCtrl.getUsers);

router.post('/addNewGroup', groupsCtrl.addGroups);
router.post('/getGroups', groupsCtrl.getGroups);

module.exports = router;