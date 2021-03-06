const express = require('express');
//const {  } = require('../controller/category');
const { isSignedIn, adminMiddleware, uploadS3 } = require('../middleware');
const {
	createProduct,
	getProductsBySlug,
	getProductDetailsById,
	deleteProductById,
	getProducts,
} = require('../controller/product.controller');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname + '-' + Date.now());
	},
});

const upload = multer({ storage });

router.post('/product/create', isSignedIn, adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/products/:slug', getProductsBySlug);
// //router.get('/category/getcategory', getCategories);
router.get('/product/:productId', getProductDetailsById);
router.get('/product/all', getProducts);
// router.delete('/product/deleteProductById', isSignedIn, adminMiddleware, deleteProductById);
// router.post('/product/getProducts', isSignedIn, adminMiddleware, getProducts);

module.exports = router;
