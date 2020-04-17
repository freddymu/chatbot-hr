const databaseHR = require("../../database/index");
const { Image } = require("dialogflow-fulfillment");

const resignationHandler = async (agent) => {
    let reason = agent.contexts[0].parameters.resign_reason;
    let effectiveDate = agent.contexts[0].parameters.effective_date;

    if (Array.isArray(reason)) {
        reason = reason.join(",");
    }

    // just for testing
    let facebookId = "1234567890";
    let isFacebook = agent.requestSource === agent.FACEBOOK;

    if (isFacebook) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    // cek review employee
    // jika rata2 score bagus maka coba pertahankan
    // jika tidak biarkan resign :-)
    // ==================================================================================================================
    let employeeReviewsResult = await databaseHR.getEmployeeReviews(facebookId);

    if (employeeReviewsResult.success === false) {
        agent.add(employeeReviewsResult.message);
        return;
    }

    let avgScore = employeeReviewsResult.data.avgScore;

    if (avgScore >= 50) {
        agent.add(
            "Saran saya, sebaiknya di negosiasikan dulu dengan pihak manajemen, karena saya melihat ada beberapa point positif yang ada pada diri Anda"
        );

        let summaryGood = employeeReviewsResult.data.summaryGood;
        for (let i = 0; i < summaryGood.length; i++) {
            agent.add(summaryGood[i]);
        }

        agent.add(
            "Jadi menurut saya sangat disayangkan jika Anda mengundurkan diri saat ini"
        );
        agent.add(
            "Bagaimana kalau saya buatkan jadwal untuk ketemu dengan manajemen supaya Anda bisa negosiasi terkait kebutuhan Anda. Bersedia kah?"
        );

        // sent image
        //agent.add();

        agent.setContext({
            name: "skill_3-pengunduran_diri__penawaran",
            lifespan: 2,
            parameters: {
                reason_resign: agent.contexts[0].parameters.resign_reason,
                effective_date: effectiveDate.toString(),
                facebook_id: facebookId.toString(),
            },
        });
        return;
    }
    // ==================================================================================================================

    let resignationRequestResult = await databaseHR.resignationRequest(
        facebookId,
        reason,
        effectiveDate
    );

    //console.log(resignationRequestResult);

    if (resignationRequestResult.success === true) {
        agent.add("Baiklah pengajuan pengunduran diri sudah diterima");
        agent.add("Saya bantu informasikan ke pihak manajemen dan atasan Anda");
        //agent.add(resignationRequestResult.message);
    } else {
        agent.add(resignationRequestResult.message);
    }
};

const resignationConfirmHandler = async (agent) => {
    //console.log(agent);

    let reason = agent.contexts[0].parameters.resign_reason;
    let effectiveDate = agent.contexts[0].parameters.effective_date;

    if (Array.isArray(reason)) {
        reason = reason.join(",");
    }

    // just for testing
    let facebookId = "1234567890";
    let isFacebook = agent.requestSource === agent.FACEBOOK;

    if (isFacebook) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    if (Array.isArray(reason)) {
        reason = reason.join(",");
    }

    let resignationRequestResult = await databaseHR.resignationRequest(
        facebookId,
        reason,
        effectiveDate
    );

    if (resignationRequestResult.success === true) {
        agent.add("Baiklah pengajuan pengunduran diri sudah diterima");
        agent.add("Saya bantu informasikan ke pihak manajemen dan atasan Anda");
        //agent.add(resignationRequestResult.message);
    } else {
        agent.add(resignationRequestResult.message);
    }

    agent.context.delete("skill_3-pengunduran_diri__penawaran");
};

module.exports = { resignationHandler, resignationConfirmHandler };
