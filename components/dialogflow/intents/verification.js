const databaseHR = require("../../database/index");

const verificationHandler = async (agent) => {
    //console.log(agent);

    // get parameters
    let employeeCode = agent.parameters.employee_code;
    let employeePin = agent.parameters.pin;

    // just for testing
    let facebookId = "1234567890";

    if (agent.requestSource === agent.FACEBOOK) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    let verificationResult = await databaseHR.verification(
        employeeCode,
        employeePin,
        facebookId
    );

    if (verificationResult.success === true) {
        let name = verificationResult.data.name;
        agent.add(`Welcome ${name}`);
        agent.add(verificationResult.message);
    } else {
        agent.add(
            "Verifikasi tidak berhasil, pastikan kode pegawai dan pin benar."
        );
    }
};

module.exports = verificationHandler;
