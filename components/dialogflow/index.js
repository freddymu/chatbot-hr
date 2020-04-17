// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
("use strict");

const { WebhookClient } = require("dialogflow-fulfillment");
//const { Card, Suggestion } = require("dialogflow-fulfillment");
const axios = require("axios").default;

const welcomeIntentHandler = require("./intents/welcome");
const fallbackIntentHandler = require("./intents/fallback");
const verificationIntentHandler = require("./intents/verification");
const timeoffIntentHandler = require("./intents/timeoff");
const {
    resignationConfirmHandler,
    resignationHandler,
} = require("./intents/resignation");
const {
    terminationHandler,
    terminationReasonHandler,
    terminationOptionHandler,
} = require("./intents/termination");

//process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const dialogFlowComponent = (request, response) => {
    const agent = new WebhookClient({ request, response });

    //console.log(agent);

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    intentMap.set("Default Welcome Intent", welcomeIntentHandler);
    intentMap.set("Default Fallback Intent", fallbackIntentHandler);

    intentMap.set("skill_1-verifikasi", verificationIntentHandler);
    intentMap.set("skill_2-pengajuan_cuti - yes", timeoffIntentHandler);

    intentMap.set("skill_3-pengunduran_diri - yes", resignationHandler);
    intentMap.set(
        "skill_3-pengunduran_diri.penawaran-no",
        resignationConfirmHandler
    );

    intentMap.set("skill_4-pemberhentian_pegawai", terminationHandler);
    intentMap.set(
        "skill_4-pemberhentian_pegawai.alasan",
        terminationReasonHandler
    );
    intentMap.set(
        "skill_4-pemberhentian_pegawai.pilihan",
        terminationOptionHandler
    );

    agent.handleRequest(intentMap);
};

const sendTermination = async () => {
    const databaseHR = require("../database/index");

    // get all employees that has status terminate and has facebook id
    const employees = await databaseHR.getTeminatedEmployees();

    // sent this message to each employee
    if (employees.success === false) {
        console.log(employees.message);
        return;
    }

    let facebookPageAccessToken =
        "EAADccQfNIgUBAHh2LVuiUsvq81dxRllqHkuZCrI8VKsGvI1ukeivSRh1ZAi0X35dXKK9Y18HN3N2W5sRa76JfvmOPMXl7J97CGk1nStQNWoctuHlaeOroN3dZAGUTTQae8W9Jr9KqaFQ3YqsMjX5D2UAtCvjrZBHzlgaVszupZBg4rq4pbhHWZBP8pQdjz6x0ZD";

    console.log(employees);

    employees.data.forEach((row) => {
        let facebookid = row.facebook_id;

        let headers = {
            "Content-Type": "application/json",
        };

        let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${facebookPageAccessToken}`;
        let body = {
            messaging_type: "MESSAGE_TAG",
            tag: "ACCOUNT_UPDATE",
            recipient: {
                id: facebookid,
            },
            message: {
                text:
                    "Maaf, saya ingin memberikan kabar yang tidak enak terkait dengan status kepegawaian Anda diperusahaan.\n\nDikarenakan ada beberapa kondisi\nPerusahaan memutuskan untuk memberhentikan Anda.",
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Diskusi lebih lanjut",
                        payload: "termination",
                        image_url:
                            "https://www.pngitem.com/pimgs/m/29-297416_folded-hands-icon-praying-hands-emoji-png-transparent.png",
                    },
                    {
                        content_type: "text",
                        title: "Saya tidak paham",
                        payload: "termination",
                        image_url:
                            "https://www.pngitem.com/pimgs/m/85-858467_transparent-shocked-emoji-png-emoji-confused-png-png.png",
                    },
                ],
            },
        };

        axios
            .post(url, body, headers)
            .then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

module.exports = { dialogFlowComponent, sendTermination };
