const databaseHR = require("../../database/index");

const timeOffHandler = async (agent) => {
    //console.log(agent);

    // get parameters
    let reason = agent.contexts[0].parameters.jenis_cuti;
    let effectiveDate = agent.contexts[0].parameters.tanggal;

    // just for testing
    let facebookId = "1234567890";

    if (agent.requestSource === agent.FACEBOOK) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    let leaveRequestResult = await databaseHR.leaveRequest(
        facebookId,
        reason,
        effectiveDate
    );

    if (leaveRequestResult.success === true) {
        agent.add("Terimakasih. Pengajuan cuti sudah diterima.");
    } else {
        agent.add(leaveRequestResult.message);
    }
};

module.exports = timeOffHandler;
