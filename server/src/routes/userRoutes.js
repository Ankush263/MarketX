const express = require('express');
const {
	getAllUsers,
	createUser,
	getSingleUser,
	updateUserById,
	deleteUser,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router
	.route('/:id')
	.get(getSingleUser)
	.patch(updateUserById)
	.delete(deleteUser);

module.exports = router;
