const express = require('express');
// const uploadPhoto = require('../midilware/image');
const UserController = require('../Controllers/userController');
const router = express.Router();
const verify = require('../midilware/verify');
// 10
router.post('/pdfRegisterData',UserController.pdfRegisterDataApi);
router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.get('/findAllUser', verify, UserController.findAll);
router.get('/specificUser/:email', verify, UserController.specificUser);
router.post('/forgetpassword', UserController.forgetPasswordApi);
router.post('/resetPassword/:passwordResetToken', UserController.resetPassword);

module.exports = router;


