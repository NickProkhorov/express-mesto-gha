// routes/users.js
const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/users', getUsers);       //возвращает всех пользователей
router.get('/users/:userId', getUser); //возвращает пользователя по _id
router.post('/users', createUser);    //создаёт пользователя

module.exports = router;