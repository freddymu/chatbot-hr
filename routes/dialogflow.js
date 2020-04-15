var express = require("express");
var router = express.Router();
var {
    dialogFlowComponent,
    sendTermination,
} = require("../components/dialogflow/index");

/* POST from dialogflow. */
router.post("/", function (req, res, next) {
    dialogFlowComponent(req, res);
});

router.get("/send-termination", function (req, res, next) {
    sendTermination();
    res.send("Mengirim informasi pemberhentian kerja.");
});

module.exports = router;
