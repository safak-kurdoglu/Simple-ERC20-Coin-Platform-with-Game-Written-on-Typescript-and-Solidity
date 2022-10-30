const shilaPointsModel = require('../models/ShilaPoints.model');
const shilaRequestModel = require('../models/WaitingShilaRequests.model');
  

async function getShilaPoint(req: any, res: any){
    try {
        const user = await shilaPointsModel.findOne({address: req.body.address}).exec(); 
        var amount: number; 
        if(user)
            amount = user.point; 
        else
            amount = 0;

        res.json({status: true, amount}); 
    } 
    catch(error){  
        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function updateShilaPoint(req: any, res: any){
    try { 
        const user = await shilaPointsModel.findOne({address: req.body.address}).exec();
        if(user){
            user.point += req.body.point;
            user.save();
        }else{
            new shilaPointsModel({ 
                address: req.body.address,
                point: req.body.point
            }).save();
        }
        res.json({status: true, message: "Shila point is updated."});
    } 
    catch(error){ 
       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function requestShilaCoin(req: any, res: any){
    try { 
        var user = await shilaPointsModel.findOne({address: req.body.address}).exec();
        if(!user || !user.point){
            res.json({status: true, message: "You don't have Shila Point."});
        }
        else{
            const point: number = user.point;
            user.point = 0;
            user.save(); 
            user = await shilaRequestModel.findOne({address: req.body.address}).exec();
        
            if(user){
                user.shilaPoint += point;
                user.save();
            }
            else{
                new shilaRequestModel({ 
                    address: req.body.address,
                    shilaPoint: point
                }).save();
            }
            res.json({status: true, message: "Shila point is updated."});
        } 
    } 
    catch(error){ 
       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getWaitingRewards(req: any, res: any){
    try { 
        const users = await shilaRequestModel.find();
        if(users.length)
            res.json({status: true, users});
        else
            res.json({status: true, message: "There are no request waiting."});
    } 
    catch(error){ 
       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function deleteRequests(req: any, res: any){
    try { 
        await shilaRequestModel.remove({});
        res.json({status: true});
    } 
    catch(error){ 
        res.json({status: false, message: "Something went wrong.", error});
    }
}


module.exports = {
    getShilaPoint,
    updateShilaPoint,
    requestShilaCoin,
    deleteRequests,
    getWaitingRewards
}