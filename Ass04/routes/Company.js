const express = require("express");
const company = require("../companyData");
const product = require("../productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:"Company Details"});
});

//list all company
router.get("/list",(req,res) => {
    res.json({data: company});
});

//Add New Company
router.post("/addCompany",(req,res) => {

    const companyId = req.body.companyid;
    const name = req.body.name;
    const productId = req.body.productids;

    const companyRecord = company.filter((c)=>c.companyid === companyId);
    if(companyRecord.length === 0)
    {
        company.push({companyid: companyId,name: name,product_ids: productId});
        return res.json({data:"New Company added Successfully..."})
    } else {
        return res.json({data:"Ooppss.. Company already exist!"})
    }
});

//update Company
router.put('/updateCompany/:id', (req, res) => {
    
        const findIndex = company.findIndex((c)=>c.companyid  === req.params.id)
        if(findIndex === -1){
            return res.json({data : 'Ooppss.. Company ID not found!..'})
        } 
        else {
            company[findIndex]["productids"] = req.body.product_ids;
            return res.json({ data:'Company Update Successfully...'});
        }
});

//Get company details based on product name
router.get("/retriveCompany/:title",(req,res) => {

    const pname = req.params.title;
    const productIndex = product.findIndex((p)=>p.title === pname);

    if(productIndex === -1){
        return res.json({data:"Ooppss...Product not exist!"})
    } else {
        const companyid=product[productIndex]["companyId"];
        const companyData = company.filter((c)=>c.companyid === companyid);       
        return res.json({data: companyData})
    }
});

//delete Company
router.delete('/deleteCompany/:id',(req,res)=>{
    try{
        const findIndex = company.findIndex((c)=>c.companyid  === req.params.id)
        if(findIndex == -1){
            return res.json({data:'Ooppss.. Company not found..!'})
        }
        else{
            company.splice(findIndex,1);
            return res.json({data:'Company delete successfully..!'});
        }
    }catch(err){
        return res.json({data:'Please try again..!'});  
    }
});
module.exports = router;