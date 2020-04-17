const databaseHR = require("../../database/index");

const terminationHandler = async (agent) => {
    // just for testing
    let facebookId = "1234567890";
    let isFacebook = agent.requestSource === agent.FACEBOOK;

    if (isFacebook) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    let employeeDetail = await databaseHR.getEmployeeDetail(facebookId);

    if (employeeDetail.success === true) {
        let employeeStatus = employeeDetail.data.status;

        if (employeeStatus === "active") {
            agent.add("Saat ini posisi Anda diperusahaan masih dipertahankan.");
            agent.context.delete("skill_4-pemberhentian_pegawai");
        } else {
            agent.add("Jadi begini...");
            agent.add("Saya coba jelaskan dulu kondisi perusahaan saat ini.");
            agent.add(`Akibat dampak wabah virus COVID-19, penjualan produk menurun tajam
Sehingga kondisi keuangan perusahaan kian hari semakin memburuk

Dan untuk mempertahankan perusahaan diperlukan perampingan 

Salah satu langkah yang diambil oleh perusahaan adalah dengan memberhentikan sebagian pegawai.`);
            agent.add("Termasuk memberhentikan Anda.");
            agent.add("Pihak manajemen sudah menyiapkan kompensasinya.");
        }
    } else {
        agent.add(employeeDetail.message);
    }
};

const terminationReasonHandler = async (agent) => {
    // just for testing
    let facebookId = "1234567890";
    let isFacebook = agent.requestSource === agent.FACEBOOK;

    if (isFacebook) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    let employeeReviewsResult = await databaseHR.getEmployeeReviews(facebookId);

    if (employeeReviewsResult.success === false) {
        agent.add(employeeReviewsResult.message);
        return;
    }

    let avgScore = employeeReviewsResult.data.avgScore;

    if (avgScore <= 60) {
        agent.add(`Dengan menimbang beberapa hal dari setiap pegawai yang diberhentikan.

Tentunya berat juga bagi kami selaku manajemen perusahaan.

Namun ada beberapa alasan kenapa Anda termasuk dalam salah satu pegawai yang diberhentikan, yaitu`);

        let summaryBad = employeeReviewsResult.data.summaryBad;
        for (let i = 0; i < summaryBad.length; i++) {
            let number = i + 1;
            agent.add(number + ". " + summaryBad[i]);
        }

        agent.add(
            "Saya Bunga mewakili manajemen, Mohon Maaf karena kami harus mengambil keputusan seperti ini. 🙏"
        );
    } else {
        agent.add(
            `Maaf, saya tidak memiliki informasi yang cukup untuk memberikan alasannya. Silahkan hubungi langsung staff HR.`
        );
    }
};

const terminationOptionHandler = async (agent) => {
    // just for testing
    let facebookId = "1234567890";
    let isFacebook = agent.requestSource === agent.FACEBOOK;

    if (isFacebook) {
        facebookId = agent.originalRequest.payload.data.sender.id;
        //console.log(facebookId);
    }

    let employeeDetail = await databaseHR.getEmployeeDetail(facebookId);

    if (employeeDetail.success === false) {
        agent.add(employeeReviewsResult.message);
        return;
    }

    let payCutPercentage = employeeDetail.data.pay_cut_percentage;

    agent.add(
        "Jika tidak ingin diberhentikan ada opsi yang bisa dipertimbangkan oleh manajemen."
    );
    agent.add("Yaitu opsi pemotongan gaji.");
    agent.add(
        "Namun untuk opsi pemotongan gaji perlu dibicarakan lebih lanjut dengan pihak manajemen"
    );
    agent.add(
        `Sekedar informasi perkiraan besaran potongan bisa mencapai ${payCutPercentage}%`
    );
    agent.add(
        "Amira bisa membantu follow-up ke pihak manajemen jika Anda benar-benar mau memilih opsi pemotongan gaji."
    );
    agent.add("Bagaimana? ya atau tidak? untuk Amira bantu follow-up");
};

module.exports = {
    terminationHandler,
    terminationReasonHandler,
    terminationOptionHandler,
};
