// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
("use strict");

const { WebhookClient } = require("dialogflow-fulfillment");
//const { Card, Suggestion } = require("dialogflow-fulfillment");
const axios = require("axios").default;

const welcomeIntentHandler = require("./intents/welcome");
const fallbackIntentHandler = require("./intents/fallback");
const timeoffIntentHandler = require("./intents/timeoff");
const resignationIntentHandler = require("./intents/resignation");
const terminationIntentHandler = require("./intents/termination");

//process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const dialogFlowComponent = (request, response) => {
    const agent = new WebhookClient({ request, response });

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    intentMap.set("Default Welcome Intent", welcomeIntentHandler);
    intentMap.set("Default Fallback Intent", fallbackIntentHandler);

    intentMap.set("skill_1-pengajuan_cuti", timeoffIntentHandler);
    intentMap.set("skill_2-pengunduran_diri", resignationIntentHandler);
    intentMap.set("skill_3-pemberhentian_kerja", terminationIntentHandler);

    agent.handleRequest(intentMap);
};

const sendTermination = () => {
    let headers = {
        "Content-Type": "application/json",
    };

    let url =
        "https://graph.facebook.com/v6.0/me/messages?access_token=EAALd6kPO1U4BADwUobwgkg6ZA1CZChWYKNQiv9hE1qihEi2cqJAYdBQcEZCa4tWUAdYLunrMKTTKxLXVyFDGycukw82imSOYPDKpJBLZBtCKmaZAHBuXejAs3kmZA2skYF7pmhLdsky5bUKqVLFQ0AnuVV7UudVi3PFNOvVK1AjfuGDTxZB63CZAdNfivXNI4IYZD";
    let body = {
        messaging_type: "MESSAGE_TAG",
        tag: "ACCOUNT_UPDATE",
        recipient: {
            id: "2679337955494704",
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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

module.exports = { dialogFlowComponent, sendTermination };
