const express = require('express');
const {
	getAllProducts,
	createProduct,
	getSingleProduct,
	getMyProducts,
	deleteProduct,
	updateProduct,
	updateProductImage,
	getProductsByUserId,
	uploadImg,
	checkUser,
	deletePhoto,
} = require('../controllers/productControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.route('/').get(getAllProducts);

router.use(protect);
router.route('/userId/:id').get(getProductsByUserId);
router.route('/updateImg/:id').patch(uploadImg, updateProductImage);
router.route('/myProducts').get(getMyProducts);
router.route('/').post(uploadImg, createProduct);
router
	.route('/:id')
	.get(getSingleProduct)
	.delete(deletePhoto, deleteProduct)
	.patch(checkUser, updateProduct);

module.exports = router;
