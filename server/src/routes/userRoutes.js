const express = require('express');
const {
	getAllUsers,
	getSingleUser,
	updateUserById,
	deleteUser,
	getMe,
	updateMe,
	deleteMe,
} = require('../controllers/userControllers');

const {
	signup,
	login,
	logout,
	protect,
	updatePassword,
} = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.use(protect);

router.route('/me').get(getMe);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/updateMyPassword').patch(updatePassword);
router.route('/').get(getAllUsers);

router
	.route('/:id')
	.get(getSingleUser)
	.patch(updateUserById)
	.delete(deleteUser);

module.exports = router;
