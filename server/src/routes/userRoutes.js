const express = require('express');
const {
	getAllUsers,
	getSingleUser,
	updateUserById,
	deleteUser,
} = require('../controllers/userControllers');

const { signup, login, logout } = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/').get(getAllUsers);

router
	.route('/:id')
	.get(getSingleUser)
	.patch(updateUserById)
	.delete(deleteUser);

module.exports = router;
