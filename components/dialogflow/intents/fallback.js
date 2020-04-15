const fallbackHandler = (agent) => {
    agent.add(agent.consoleMessages[0].text);
};

module.exports = fallbackHandler;
