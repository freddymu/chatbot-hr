const express = require("express");
const router = express.Router();

const {
    dialogFlowComponent,
    sendTermination,
} = require("../components/dialogflow/index");

/* POST from dialogflow. */
router.post("/", function (req, res, next) {
    // console.log(
    //     "Dialogflow Request headers: " + JSON.stringify(req.headers)
    // );
    // console.log("Dialogflow Request body: " + JSON.stringify(res.body));

    dialogFlowComponent(req, res);
});

router.get("/send-termination", function (req, res, next) {
    sendTermination();
    res.send("Mengirim informasi pemberhentian kerja.");
});

module.exports = router;
