const fallbackHandler = (agent) => {
    // TODO: use prosa.ai sentiment analyzer to detect input text
    // if negative then, give a joke or quotes to purify negativity :-)

    agent.add(agent.consoleMessages[0].text);
};

module.exports = fallbackHandler;
