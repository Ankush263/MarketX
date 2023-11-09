const express = require('express');
const UserRepo = require('../repo/user-repo');

const router = express.Router();

router.get('/users', async (req, res) => {
	const users = await UserRepo.find();

	res.status(200).json({
		status: 'success',
		data: {
			users,
		},
	});
});

router.get('/users/:id', async (req, res) => {
	const { id } = req.params;
	const user = await UserRepo.findById(id);

	if (user) {
		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} else {
		res.sendStatus(404);
	}
});

router.post('/users', async (req, res) => {
	const { username, avater, email, password, role } = req.body;
	const user = await UserRepo.create(username, avater, email, password, role);

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

router.put('/users/:id', async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const user = await UserRepo.findByIdAndUpdate(
		id,
		data.username,
		data.avater,
		data.email,
		data.role
	);

	if (user) {
		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} else {
		res.sendStatus(404);
	}
});

router.delete('/users/:id', async (req, res) => {
	const { id } = req.params;
	const user = await UserRepo.delete(id);

	if (user) {
		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
