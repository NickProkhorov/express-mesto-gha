const router = require('express').Router();
const auth = require('../midllewares/auth');

const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUserProfile);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;
