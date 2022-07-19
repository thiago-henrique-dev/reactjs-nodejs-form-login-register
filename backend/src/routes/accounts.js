const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const AccountController = require('../controllers/AccountController')

router.get('/', (req, res, next) => {
    return res.status(200).send({ status: 'Ok' })
})

router.post('/account/login', AccountController.login)
router.post('/account/register', AccountController.register)
router.put('/account/personal-information', login, AccountController.personalDataRegister)
router.get('/account/check-first-access', login, AccountController.checkFirstAccess)

module.exports = router