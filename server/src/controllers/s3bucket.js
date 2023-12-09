const uuid = require('uuid/v1');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { s3 } = require('./s3');
require('dotenv').config();

const s3Storage = multerS3({
	s3: s3,
	bucket: `${process.env.BUCKET_NAME}`,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	metadata: (req, file, cb) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req, file, cb) => {
		const fileName = 'MarketX' + req.user.id + '/' + uuid() + '.jpeg';
		cb(null, fileName);
	},
});

// const s3StorageForStory = multerS3({
// 	s3: s3,
// 	bucket: `${process.env.BUCKET_NAME}`,
// 	contentType: multerS3.AUTO_CONTENT_TYPE,
// 	metadata: (req, file, cb) => {
// 		cb(null, { fieldname: file.fieldname });
// 	},
// 	key: (req, file, cb) => {
// 		const fileName = 'story' + req.user.id + '/' + uuid() + '.jpeg';
// 		cb(null, fileName);
// 	},
// });

function sanitizeFile(file, cb) {
	const fileExts = ['.png', '.jpg', '.jpeg'];

	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase())
	);
	const isAllowedMimeType = file.mimetype.startsWith('image/');
	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	} else {
		cb('Error: File type not allowed!');
	}
}

exports.uploadImage = multer({
	storage: s3Storage,
	fileFilter: (req, file, callback) => {
		sanitizeFile(file, callback);
	},
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
});

// exports.uploadImageInStory = multer({
// 	storage: s3StorageForStory,
// 	fileFilter: (req, file, callback) => {
// 		sanitizeFile(file, callback);
// 	},
// 	limits: {
// 		fileSize: 1024 * 1024 * 2,
// 	},
// });
