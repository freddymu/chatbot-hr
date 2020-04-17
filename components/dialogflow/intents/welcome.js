const { Card, Suggestion } = require("dialogflow-fulfillment");

const welcomeHandler = (agent) => {
    agent.add(agent.consoleMessages[0].text);
    // agent.add(
    //     new Card({
    //         title: "Pengajuan Cuti",
    //         //imageUrl: '',
    //         text: "Saya bisa membantu Anda terkait dengan pengajuan cuti",
    //         buttonText: "Ajukan Cuti",
    //         //buttonUrl: ''
    //     })
    // );

    //     agent.add(`Hi 😊`);
    //     agent.add(`Nama saya Bunga
    // Saya adalah chatbot HR.

    // Saya bisa bantu Anda untuk melakukan pengajuan cuti dan pengajuan pengunduran diri serta memberikan informasi tentang pemberhentian kerja

    // Silahkan ketikan salah satu kalimat dibawah ini
    // 1. Pengajuan cuti
    // 2. Pendunduran diri
    // 3. Pemberhentian kerja`);
};

module.exports = welcomeHandler;
