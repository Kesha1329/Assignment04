const express = require("express");
const seller = require("../sellerData");
const product = require("../productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:["Seller Details"]});
});

router.get("/list",(req,res) => {
    res.json({data:seller});
});

//add seller
router.post("/addSeller",(req,res) => {

    const sellId = req.body.sellerId;
    const name = req.body.name;
    const productId = req.body.productId;
   
    const sell = seller.filter((s)=>s.sellerid === sellId);
    if(sell.length === 0)
    {
        seller.push({sellerid: sellId,name: name,productids: productId});
        return res.json({data:"New seller added!"})
    } else {
        return res.json({data:"seller already exist!"})
    }
});

//update Seller
router.put('/updateSeller/:id', (req, res) => {
    try {
        const findIndex = seller.findIndex((s) => s.sellerid === req.params.id)
        if(findIndex === -1)
        {
            return res.json({data : 'Ooppss..Seller ID not found.'})
        } 
        else {
            seller[findIndex]["productids"] = req.body.productids;
            return res.json({ data:'Seller Update Successfully...'});
        }
    } catch (err) {
        return res.json({data:'Please try again..!'});  
    }
});

//fetch seller details based on product name
router.get("/retriveseller/:title",(req,res) => {
    const pname = req.params.title;
    const productIndex = product.findIndex((p)=>p.title === pname);
    if(productIndex === -1)
    {
        return res.json({data:"Product not exist!"})
    } else {
        const sellerids=product[productIndex]["sellerId"];
         const sellerData = seller.filter((s) => sellerids.indexOf(s.sellerid) !== -1  );        
         return res.json({data: sellerData})
      
    }
});

//delete seller
router.delete('/deleteSeller/:id',(req,res)=>{
    try{
        const findIndex = seller.findIndex((s)=>s.sellerid === req.params.id)
        if(findIndex == -1)
        {
            return res.json({data:'Ooppss..Seller not found..!'})
        }
        else{
            seller.splice(findIndex,1);
            return res.json({data:'Seller delete successfully..!'});
        }
    }catch(err){
        return res.json({data:'Please try again..!'});  
    }
});


module.exports = router;