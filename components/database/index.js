const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite"); // wrapper v4 for node js >= 10
const moment = require("moment");
const faker = require("faker");

const databaseHR = {
    openConnection: async function () {
        // open the database
        return await open({
            filename: __dirname + "/../../chatbot_hr.db",
            driver: sqlite3.Database,
        });

        // use db.close() to close connection
    },

    generateEmployees: async function () {
        let db = await this.openConnection();
        let status = ["active", "terminate", "terminate"];

        for (let i = 1; i <= 50; i++) {
            let employee = {
                code: faker.random.alphaNumeric(6).toUpperCase(),
                name: faker.name.findName(),
                pin: faker.random.number({ min: 100000, max: 999999 }),
                status: status[Math.floor(Math.random() * 2)],
                pay_cut_percentage: faker.random.number({ min: 20, max: 50 }),
                facebook_id: null,
                created_at: parseInt(moment().format("X")),
            };

            let result = await db.run(
                "INSERT INTO employees(code, name, pin, status, pay_cut_percentage, created_at) VALUES(?,?,?,?,?,?)",
                [
                    employee.code,
                    employee.name,
                    employee.pin,
                    employee.status,
                    employee.pay_cut_percentage,
                    employee.created_at,
                ]
            );

            // get last insert id
            console.log(`A row has been inserted with rowid ${result.lastID}`);
        }

        db.close();
    },

    generateEmployeeReviews: async function () {
        let db = await this.openConnection();
        let rows = await db.all("SELECT * FROM employees", []);

        let minScore = 10;
        let maxScore = 100;

        rows.forEach(async (row) => {
            let bossReviewScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let bossReviewDescription = "";

            if (bossReviewScore >= 80) {
                bossReviewDescription =
                    "atasan Anda sangat menyukai kinerja dan attitude Anda";
            } else if (bossReviewScore >= 60) {
                bossReviewDescription =
                    "atasan Anda cukup menyukai kinerja dan attitude Anda";
            } else if (bossReviewScore >= 40) {
                bossReviewDescription =
                    "atasan Anda kurang menyukai kinerja dan attitude Anda";
            } else {
                bossReviewDescription =
                    "atasan Anda tidak menyukai kinerja dan attitude Anda";
            }

            let peerReviewScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let peerReviewDescription = "";

            if (peerReviewScore >= 80) {
                peerReviewDescription =
                    "teman kerja Anda sangat menyukai kinerja dan attitude Anda";
            } else if (peerReviewScore >= 60) {
                peerReviewDescription =
                    "teman kerja Anda cukup menyukai kinerja dan attitude Anda";
            } else if (peerReviewScore >= 40) {
                peerReviewDescription =
                    "teman kerja Anda kurang menyukai kinerja dan attitude Anda";
            } else {
                peerReviewDescription =
                    "teman kerja Anda tidak menyukai kinerja dan attitude Anda. Mohon melakukan refleksi diri dan diskusikan dengan HR jika merasa Anda sudah melakukan hal yang benar";
            }

            let attendanceScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let attendanceDescription = "";

            if (attendanceScore >= 80) {
                attendanceDescription =
                    "absensi Anda sangat baik, Anda selalu datang tepat waktu";
            } else if (attendanceScore >= 60) {
                attendanceDescription =
                    "absensi Anda cukup baik, ada beberapa keterlambatan tapi tidak masalah";
            } else if (attendanceScore >= 40) {
                attendanceDescription =
                    "absensi Anda cukup buruk, agak sering terlambat dan sering ijin dadakan";
            } else {
                attendanceDescription =
                    "absensi Anda buruk, sering terlambat dan sering tidak ada kabar. Mohon diperbaiki absensinya";
            }

            let helpfulnessScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let helpfulnessDescription = "";

            if (helpfulnessScore >= 80) {
                helpfulnessDescription =
                    "Anda sangat kooperatif dan bersedia membantu siapa saja dalam perusahaan";
            } else if (helpfulnessScore >= 60) {
                helpfulnessDescription =
                    "Anda cukup kooperatif dan bersedia membantu kolega Anda dikala diperlukan";
            } else if (helpfulnessScore >= 40) {
                helpfulnessDescription =
                    "Anda kurang kooperatif dan terkadang sulit diminta bantuan oleh kolega Anda";
            } else {
                helpfulnessDescription =
                    "Anda tidak kooperatif dan sering kali tidak peduli dengan teman satu tim dalam hal mencapai tujuan bersama diperusahaan, mohon di perbaiki sikapnya";
            }

            let efficiencyScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let efficiencyDescription = "";

            if (efficiencyScore >= 80) {
                efficiencyDescription =
                    "Anda bekerja dengan sangat efisien sebisa mungkin tidak ada overtime namun tetap menyelesaikan tanggung jawab Anda";
            } else if (efficiencyScore >= 60) {
                efficiencyDescription =
                    "Anda bekerja dengan cukup efisien, dan cukup sering lembur, sepertinya Anda harus meningkatkan self-management agar lebih efisien lagi";
            } else if (efficiencyScore >= 40) {
                efficiencyDescription =
                    "Anda bekerja secara kurang efisien, mulai sering lembur, dan sepertinya berdampak buruk terhadap absensi Anda";
            } else {
                efficiencyDescription =
                    "Anda bekerja dengan tidak efisien, sering lembur, sehingga absensi Anda menjadi kacau sekali, mohon diperbaiki cara bekerjanya";
            }

            let initiativeScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let initiativeDescription = "";

            if (initiativeScore >= 80) {
                initiativeDescription =
                    "Anda dikenal sebagai orang yang sangat inisiatif, bahkan tanpa diminta Anda sering kali menawarkan diri";
            } else if (initiativeScore >= 60) {
                initiativeDescription =
                    "Anda dikenal sebagai orang yang cukup inisiatif, sehingga atasan Anda tidak perlu melakukan micro-managing";
            } else if (initiativeScore >= 40) {
                initiativeDescription =
                    "Anda dikenal sebagai orang yang kurang inisiatif, sehingga atasan Anda perlu melakukan micro-managing";
            } else {
                initiativeDescription =
                    "Anda dikenal sebagai orang yang tidak inisiatif, seperti robot, tunggu diperintah dengan jelas baru jalan, tolong diperbaiki";
            }

            let qualityScore = Math.floor(
                Math.random() * (maxScore - minScore + 1) + minScore
            );
            let qualityDescription = "";

            if (qualityScore >= 80) {
                qualityDescription =
                    "hasil pekerjaan Anda sangat baik dan berkualitas, Anda memang seorang profesional";
            } else if (qualityScore >= 60) {
                qualityDescription =
                    "hasil pekerjaan Anda cukup berkualitas, sedikit lagi Anda bisa menjadi seorang profesional yang handal, keep a good work";
            } else if (qualityScore >= 40) {
                qualityDescription =
                    "hasil pekerjaan Anda kurang berkualitas, Anda harus meningkatkan kompetensi dan keahlian Anda";
            } else {
                qualityDescription =
                    "hasil pekerjaan Anda tidak berkualitas, sering menyusakan teman Anda atau bahkan mengecewakan pelanggan. Anda perlu memperbaiki kualitas pekerjaan Anda.";
            }

            let reviewMetrics = [
                {
                    category: "boss-review",
                    description: bossReviewDescription,
                    score: bossReviewScore,
                },
                {
                    category: "peer-review",
                    description: peerReviewDescription,
                    score: peerReviewScore,
                },
                {
                    category: "attendance",
                    description: attendanceDescription,
                    score: attendanceScore,
                },
                {
                    category: "helpfulness",
                    description: helpfulnessDescription,
                    score: helpfulnessScore,
                },
                {
                    category: "efficiency",
                    description: efficiencyDescription,
                    score: efficiencyScore,
                },
                {
                    category: "initiative",
                    description: initiativeDescription,
                    score: initiativeScore,
                },
                {
                    category: "quality",
                    description: qualityDescription,
                    score: qualityScore,
                },
            ];

            for (let x = 0; x < reviewMetrics.length; x++) {
                let metric = reviewMetrics[x];

                let insertResult = await db.run(
                    "INSERT INTO reviews(employee_id, review_category, review_description, score, created_at) VALUES(?,?,?,?,?)",
                    [
                        row.id,
                        metric.category,
                        metric.description,
                        metric.score,
                        moment().format("X"),
                    ]
                );

                // get last insert id
                console.log(
                    `A row has been inserted with rowid ${insertResult.lastID}`
                );
            }
        });

        db.close();
    },

    updateFacebookId: async function (code, pin, facebookId) {
        let db = await this.openConnection();

        let result = await db.run(
            "UPDATE employees SET facebook_id=? WHERE pin=? AND code=?",
            [facebookId, pin, code]
        );

        db.close();

        console.log(`Row(s) updated: ${result.changes}`);

        return result.changes > 0;
    },

    getEmployeeDetail: async function (facebookId) {
        let response = {
            success: false,
            message: null,
            data: null,
        };

        let db = await this.openConnection();
        let employeeDetail = await db.get(
            "SELECT * FROM employees WHERE facebook_id = ? ",
            [facebookId]
        );

        if (employeeDetail) {
            response.success = true;
            response.message = "Data pegawai ditemukan";
            response.data = employeeDetail;
        } else {
            response.message =
                "Data pegawai tidak ditemukan. Pastikan Anda sudah melakukan verifikasi melalui Facebook Messenger.";
        }

        db.close();

        return response;
    },

    leaveRequest: async function (facebookId, reason, effectiveDate) {
        let response = {
            success: false,
            message: null,
        };
        let db = await this.openConnection();
        let employeeDetail = await db.get(
            "SELECT * FROM employees WHERE facebook_id = ?",
            facebookId
        );

        if (employeeDetail) {
            let data = [
                employeeDetail.id,
                "leave",
                reason,
                moment(effectiveDate).format("X"),
                moment().format("X"),
            ];

            let result = await db.run(
                "INSERT INTO requests(employee_id, request_type, reason, effective_date, created_at) VALUES(?,?,?,?,?)",
                data
            );

            console.log(`A row has been inserted with rowid ${result.lastID}`);
            response.success = result.lastID > 0;
            response.message = response.success
                ? "Data pengajuan cuti berhasil disimpan"
                : "Data pengajuan cuti gagal disimpan";
        } else {
            response.message =
                "Data pegawai tidak ditemukan. Silahkan lakukan verifikasi ulang melalui Facebook messenger.";
        }

        db.close();
        return response;
    },

    resignationRequest: async function (facebookId, reason, effectiveDate) {
        let response = {
            success: false,
            message: null,
        };
        let db = await this.openConnection();
        let employeeDetail = await db.get(
            "SELECT * FROM employees WHERE facebook_id = ?",
            facebookId
        );

        if (employeeDetail) {
            let data = [
                employeeDetail.id,
                "resignation",
                reason,
                moment(effectiveDate).format("X"),
                moment().format("X"),
            ];

            let result = await db.run(
                "INSERT INTO requests(employee_id, request_type, reason, effective_date, created_at) VALUES(?,?,?,?,?)",
                data
            );

            console.log(`A row has been inserted with rowid ${result.lastID}`);
            response.success = result.lastID > 0;
            response.message = response.success
                ? "Data pengajuan pengunduran diri berhasil disimpan"
                : "Data pengajuan pengunduran diri gagal disimpan";
        } else {
            response.message =
                "Data pegawai tidak ditemukan. Silahkan lakukan verifikasi ulang melalui Facebook messenger.";
        }

        db.close();
        return response;
    },

    verification: async function (code, pin, facebookId) {
        let response = {
            success: false,
            message: null,
            data: null,
        };

        let db = await this.openConnection();

        let employeeDetailByFacebookId = await db.get(
            "SELECT * FROM employees WHERE facebook_id = ?",
            [facebookId]
        );

        if (employeeDetailByFacebookId) {
            db.close();
            response.success = true;
            response.message =
                "Facebook ID sudah pernah digunakan untuk verifikasi.";
            response.data = employeeDetailByFacebookId;
            return response;
        }

        let employeeDetail = await db.get(
            "SELECT * FROM employees WHERE pin = ? AND code = ?",
            [pin, code]
        );

        if (employeeDetail) {
            let updateResult = await db.run(
                "UPDATE employees SET facebook_id = ? WHERE id = ? ",
                [facebookId, employeeDetail.id]
            );

            response.success = updateResult.changes > 0;

            response.message = response.success
                ? "Verifikasi berhasil dan sudah terhubung dengan Facebook ID"
                : "Verifikasi gagal, mohon coba beberapa saat lagi. Jika masih gagal silahkan hubungi contact support di support@company.com";

            response.data = employeeDetail;
        } else {
            response.message =
                "Data pegawai tidak ditemukan. Silahkan menghubungi HR untuk mendaftarkan diri Anda.";
        }

        db.close();
        return response;
    },

    getEmployeeReviews: async function (facebookId) {
        let response = {
            success: false,
            message: null,
            data: null,
        };
        let db = await this.openConnection();
        let employeeDetail = await db.get(
            "SELECT * FROM employees WHERE facebook_id = ?",
            facebookId
        );

        if (employeeDetail) {
            let reviewResult = await db.all(
                "SELECT * FROM reviews WHERE employee_id = ?",
                [employeeDetail.id]
            );

            let summaries = [];
            let summaryGood = [];
            let summaryBad = [];
            let totalScore = 0;

            reviewResult.forEach(async (row) => {
                let reviewCategory = row.review_category;
                let score = row.score;

                totalScore += score;

                // Natural Language Generation (NLG) without AI :-)
                let conjunctions = "";

                if (reviewCategory === "boss-review") {
                    conjunctions = "saya lihat";
                }
                if (reviewCategory === "peer-review" && score >= 50) {
                    conjunctions = "dan juga";
                }
                if (reviewCategory === "peer-review" && score < 50) {
                    conjunctions = "tapi";
                }
                if (reviewCategory === "attendance" && score >= 50) {
                    conjunctions = "selain itu";
                }
                if (reviewCategory === "attendance" && score < 50) {
                    conjunctions = "parahnya";
                }

                if (reviewCategory === "helpfulness") {
                    conjunctions = "hal yang disayangkan adalah";
                }

                if (reviewCategory === "efficiency" && score < 50) {
                    conjunctions = "dan juga";
                }

                if (reviewCategory === "initiative") {
                    conjunctions = "bagi beberapa rekan kerja";
                }

                if (reviewCategory === "quality" && score >= 50) {
                    conjunctions = "untungnya";
                }
                if (reviewCategory === "quality" && score < 50) {
                    conjunctions = "lebih parahnya";
                }

                let reviewDescription = row.review_description;

                if (score >= 50) {
                    summaryGood.push(reviewDescription);
                }
                if (score < 50) {
                    summaryBad.push(reviewDescription);
                }

                let summary = conjunctions + " " + reviewDescription;
                summaries.push(summary);
            });

            response.success = true;
            response.message = "Get summary reviews";
            response.data = {
                summaries: summaries,
                summaryGood: summaryGood,
                summaryBad: summaryBad,
                avgScore: Math.ceil(totalScore / summaries.length),
            };
        } else {
            response.message =
                "Data pegawai tidak ditemukan. Silahkan lakukan verifikasi ulang melalui Facebook messenger.";
        }

        db.close();
        return response;
    },

    getTeminatedEmployees: async function () {
        let response = {
            success: false,
            message: null,
            data: null,
        };

        let db = await this.openConnection();
        let terminatedEmployees = await db.all(
            "SELECT * FROM employees WHERE status = ? AND facebook_id IS NOT NULL",
            ["terminate"]
        );
        db.close();

        if (terminatedEmployees) {
            response.success = true;
            response.message = "Pegawai ditemukan";
            response.data = terminatedEmployees;
        } else {
            response.message =
                "Tidak menemukan pegawai dengan status terminate";
        }

        return response;
    },
};

module.exports = databaseHR;

//SAMPLE USAGE
// (async () => {
//     let code = "8OF69C";
//     let pin = 721547;
//     let facebookId = "1234567890";

//     let verificationResult = await databaseHR.verification(
//         code,
//         pin,
//         facebookId
//     );
//     console.log(verificationResult);

//     let leaveRequestResult = await databaseHR.leaveRequest(
//         facebookId,
//         "cuti istri melahirkan",
//         "2020-04-17"
//     );
//     console.log(leaveRequestResult);

//     let resignationRequestResult = await databaseHR.resignationRequest(
//         facebookId,
//         "gaji lebih besar",
//         "2020-05-17"
//     );
//     console.log(resignationRequestResult);

//     let reviewResult = await databaseHR.getEmployeeReviews(facebookId);
//     console.log(reviewResult);
// })();

//INIT
//databaseHR.generateEmployees();
//databaseHR.generateEmployeeReviews();
