const route = require('express').Router();
const front_controller = require('../controllers/front.controller');
const middleware = require('../middlewares/auth.middleware')

route.post('/update-shila-point', middleware.verifyShilaPointRequest, front_controller.updateShilaPoint);
route.post('/get-shila-point', front_controller.getShilaPoint);
route.post('/request-shila-coin', front_controller.requestShilaCoin);
route.get('/delete-confirmed-requests', front_controller.deleteRequests);
route.get('/get-waiting-rewards', front_controller.getWaitingRewards);
 
module.exports = route;     