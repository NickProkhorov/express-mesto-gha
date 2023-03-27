const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../midllewares/auth');

const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, celebrate({
  body: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.patch('/me', auth, updateUserProfile);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;
