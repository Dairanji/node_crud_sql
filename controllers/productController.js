const express=require('express');
const productModel=require('../models/product')

exports.home=(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to home page.'
    })
}

exports.addProducts=(req,res,next)=>{
    const title=req.body.title;
    const price=req.body.price;
    const description=req.body.description;
    productModel.create({
        title:title,
        price:price,
        description:description,
    }).then(result=>{
        console.log(result);
        res.status(200).json({
            status:'Success',
            message:'Data inserted'
        })
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            status:"Failed",
            message:'Data insertion failed'
        })
    })
};

exports.showProducts=(req,res,next)=>{
    productModel.findAll().then(products=>{
        console.log('Product data fetched successfully...');
        res.status(200).json({
            status:'Success',
            result:products
        })
    }).then(err=>{
        console.log(err);
        res.status(404).json({
            status:'Failed',
            result:err
        })
    })
}

exports.showSingleProduct=(req,res,next)=>{
    const prodID=req.params.productId;
    // productModel.findByPk(prodID).then(product=>{
    //     console.log('Single product data fetched');
    //     res.status(200).json({
    //         status:'Success',
    //         result:product
    //     })
    // }).catch(err=>{
    //     console.log(err);
    //     res.status(404).json({
    //         status:'Failed',
    //         result:err
    //     })
    // })
    productModel.findAll({where:{id:prodID}}).then(product=>{
        console.log('Single product data fetched');
        res.status(200).json({
            status:'Success',
            result:product
        })
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            status:'Failed',
            result:err
        })
    })
}

exports.updateProduct=(req,res,next)=>{
    const prodID=req.body.productId;
    const updatedTitle=req.body.title;
    const updatedPrice=req.body.price;
    const updatedDescription=req.body.description;
    productModel.findByPk(prodID).then(product=>{
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.description=updatedDescription
        
        return product.save().then(result=>{
            console.log('Product Updated...');
            res.status(200).json({
                status:'Success',
                result:result,
                message:'Product Updated.'
            })
        }).catch(err=>{
            console.log(err);
            res.status(404).json({
                status:'Failed',
                result:err
            })
        })
    })
}

exports.delete=(req,res,next)=>{
    const prodID=req.params.productId;
    productModel.findByPk(prodID).then(product=>{
        return product.destroy();
    }).then(result=>{
        console.log('Product Deleted...');
        res.status(200).json({
            status:'Success',
            message:'Product Deleted'
        })
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            status:'Failed',
            result:err
        })
    })
}