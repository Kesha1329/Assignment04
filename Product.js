const express = require("express");
const product = require("../productData");
const seller = require("../sellerData");
const company = require("../companyData");

const router = express.Router();
router.use(express.json());



router.get("/",(req,res) => {

    res.json({data:["Product Details"]});

});

router.get("/list",(req,res) => {

    res.json({data:product});

});

//fetch all products of a seller

router.get("/retriveProduct/:sid",(req,res) => {
    const sid = req.params.sid;
    const sellerIndex = seller.findIndex((s)=>s.sellerid === sid);

    if(sellerIndex === -1){
        return res.json({data:"Seller Not Found"})
    } else {
      const productids=seller[sellerIndex]["product_ids"];
      const productData = product.filter((p) => productids.indexOf(p.productid) !== -1  );        
      return res.json({data: productData})
    }
});

//fetch all products of a company

router.get("/retriveCompony/:cid",(req,res) => {
    const cid = req.params.cid;
    const productIndex = company.findIndex((c)=>c.companyid === cid);

    if(productIndex === -1){
        return res.json({data:"Company not  found!"})
    } else {
        const productids=company[productIndex]["product_ids"];
      const productData = product.filter((p) => productids.indexOf(p.productid) !== -1  );        
      return res.json({data: productData})
    }
});

//update product
router.put('/updateProduct/:id', (req, res) => {
    try {
        const findIndex = product.findIndex((p) => p.productid === req.params.id)
        if(findIndex === -1){
            return res.json({data : 'Product ID not found.'})
        } 
        else {
            product[findIndex]["category"] = req.body.category;
            return res.json({ data:'Product Update Successfully'});
        }
    } catch (err) {
        return res.json({data:'try again..!'});  
    }
});

//Add Product
router.post("/addProduct",(req,res) => {

    const prodId = req.body.productid;
    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const companyId = req.body.companyId;
    const sellerId = req.body.sellerId;

    const productData = product.filter((p)=>p.productid === prodId);
    if(productData.length === 0){
        product.push({productid: prodId,title: title,price: price,category:category,companyId:companyId,sellerId:sellerId});
        return res.json({data:"Product added!"})
    } else {
        return res.json({data:"Product already exist!"})
    }
    
});

//delete Product
router.delete('/deleteProduct/:id',(req,res)=>{
    try{
        const findIndex = product.findIndex((p)=>p.productid === req.params.id)
        if(findIndex == -1){
            return res.json({data:'Product not found..!'})
        }
        else{
            product.splice(findIndex,1);
            return res.json({data:'Product delete successfully..!'});
        }
    }catch(err){
        return res.json({data:'try again..!'});  
    }
});

module.exports = router;