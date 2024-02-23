function verifyProperties(properties){   

    return function(req,res,next){

        for(let index=0;index<properties.length;index++){

            const element=properties[index];

            if(!(element in req.body)){             

                res.json({"data":"Required data is not found"});

            }
        }
        next();
    }
}
module.exports=verifyProperties;