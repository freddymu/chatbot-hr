const welcomeHandler = (agent) => {
    agent.add(`Hi 😊`);
    agent.add(`Nama saya Bunga
Saya adalah chatbot HR.

Saya bisa bantu Anda untuk melakukan pengajuan cuti dan pengajuan pengunduran diri serta memberikan informasi tentang pemberhentian kerja

Silahkan ketikan salah satu kalimat dibawah ini
1. Pengajuan cuti
2. Pendunduran diri
3. Pemberhentian kerja`);
};

module.exports = welcomeHandler;
