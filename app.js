// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
("use strict");

const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const express = require("express");
const bodyParser = require("body-parser");

//process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (request, response) => {
    const agent = new WebhookClient({ request, response });

    //console.log(agent);
    //console.log(agent.consoleMessages[0].text);

    // console.log(
    //     "Dialogflow Request headers: " + JSON.stringify(request.headers)
    // );
    // console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
        agent.add(agent.consoleMessages[0].text);
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
