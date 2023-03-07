// routes/users.js
const router = require('express').Router();

const { getUsers, getUser, createUser, updateUserProfile, updateUserAvatar } = require('../controllers/users');

router.get('/users', getUsers);       //возвращает всех пользователей
router.get('/users/:userId', getUser); //возвращает пользователя по _id
router.post('/users', createUser);    //создаёт пользователя
router.patch('/users/me', updateUserProfile);   //PATCH /users/me — обновляет профиль
router.patch('/users/me/avatar', updateUserAvatar ); // PATCH /users/me/avatar — обновляет аватар


module.exports = router;