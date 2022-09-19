const express=require('express');
const Route=express.Router();
const productController=require('../controllers/productController');

Route.get('/',productController.home);
Route.post('/addProducts',productController.addProducts);
Route.get('/showProducts',productController.showProducts);
Route.get('/showSingleProduct/:productId',productController.showSingleProduct);
Route.post('/updateProduct',productController.updateProduct);
Route.get('/delete/:productId',productController.delete);


module.exports=Route;