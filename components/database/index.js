const sqlite = require("sqlite3").verbose();
const file = "../../.material/chatbot_hr.db";
const db = new sqlite.Database(file);
const moment = require("moment");
const faker = require("faker");

const generateEmployees = () => {
    let status = ["active", "terminate"];

    for (let i = 1; i <= 50; i++) {
        let employee = {
            code: faker.random.alphaNumeric(6).toUpperCase(),
            name: faker.name.findName(),
            pin: faker.random.number({ min: 100000, max: 999999 }),
            status: status[Math.floor(Math.random()) * 1],
            pay_cut_percentage: faker.random.number({ min: 20, max: 50 }),
            facebook_id: null,
            created_at: parseInt(moment().format("X")),
        };

        db.run(
            "INSERT INTO employees(code, name, pin, status, pay_cut_percentage, created_at) VALUES(?,?,?,?,?,?)",
            [
                employee.code,
                employee.name,
                employee.pin,
                employee.status,
                employee.pay_cut_percentage,
                employee.created_at,
            ],
            function (err) {
                if (err) {
                    return console.log(err.message);
                }

                // get last insert id
                console.log(
                    `A row has been inserted with rowid ${this.lastID}`
                );
            }
        );
    }

    db.close();
};

const generateEmployeeReviews = () => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            return console.log(err.message);
        }

        let reviews = [];

        rows.forEach((row) => {
            let bossReviewScore = Math.floor(Math.random()) * 100;
            let bossReviewDescription = "";

            if (bossReviewScore >= 80) {
                bossReviewDescription =
                    "atasan Anda sangat menyukai kinerja dan attitude Anda";
            }
            if (bossReviewScore >= 60) {
                bossReviewDescription =
                    "atasan Anda cukup menyukai kinerja dan attitude Anda";
            }
            if (bossReviewScore >= 40) {
                bossReviewDescription =
                    "atasan Anda kurang menyukai kinerja dan attitude Anda";
            }
            if (bossReviewScore < 40) {
                bossReviewDescription =
                    "atasan Anda tidak menyukai kinerja dan attitude Anda";
            }

            let peerReviewScore = Math.floor(Math.random()) * 100;
            let peerReviewDescription = "";

            if (peerReviewScore >= 80) {
                peerReviewDescription =
                    "teman kerja Anda sangat menyukai kinerja dan attitude Anda";
            }
            if (peerReviewScore >= 60) {
                peerReviewDescription =
                    "teman kerja Anda cukup menyukai kinerja dan attitude Anda";
            }
            if (peerReviewScore >= 40) {
                peerReviewDescription =
                    "teman kerja Anda kurang menyukai kinerja dan attitude Anda";
            }
            if (peerReviewScore < 40) {
                peerReviewDescription =
                    "teman kerja Anda tidak menyukai kinerja dan attitude Anda";
            }

            let attendanceScore = Math.floor(Math.random()) * 100;
            let attendanceDescription = "";

            if (attendanceScore >= 80) {
            }
            if (attendanceScore >= 60) {
            }
            if (attendanceScore >= 40) {
            }
            if (attendanceScore < 40) {
            }

            let helpfulnessScore = Math.floor(Math.random()) * 100;
            let helpfulnessDescription = "";
            if (helpfulnessScore >= 80) {
            }
            if (helpfulnessScore >= 60) {
            }
            if (helpfulnessScore >= 40) {
            }
            if (helpfulnessScore < 40) {
            }

            let efficiencyScore = Math.floor(Math.random()) * 100;
            let efficiencyDescription = "";
            if (efficiencyScore >= 80) {
            }
            if (efficiencyScore >= 60) {
            }
            if (efficiencyScore >= 40) {
            }
            if (efficiencyScore < 40) {
            }

            let initiativeScore = Math.floor(Math.random()) * 100;
            let initiativeDescription = "";
            if (initiativeScore >= 80) {
            }
            if (initiativeScore >= 60) {
            }
            if (initiativeScore >= 40) {
            }
            if (initiativeScore < 40) {
            }

            let qualityScore = Math.floor(Math.random()) * 100;
            let qualityDescription = "";
            if (qualityScore >= 80) {
            }
            if (qualityScore >= 60) {
            }
            if (qualityScore >= 40) {
            }
            if (qualityScore < 40) {
            }

            let reviewMetrics = [
                {
                    category: "boss-review",
                    description: bossReviewDescription,
                    score: bossReviewScore,
                },
                {
                    category: "peer-review",
                    description: peerReviewScore,
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

                db.run(
                    "INSERT INTO reviews(employee_id, review_category, review_description, score, created_at) VALUES(?,?,?,?,?)",
                    [
                        row.id,
                        metric.category,
                        metric.description,
                        metric.score,
                        moment().format("X"),
                    ],
                    (err) => {
                        if (err) {
                            return console.log(err.message);
                        }
                    }
                );
            }
        });
    });
};

const updateFacebookId = (code, pin, facebookId) => {
    db.run(
        "UPDATE employees SET facebook_id=? WHERE pin=? AND code=?",
        [facebookId, pin, code],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            //console.log(`Row(s) updated: ${this.changes}`);
            return this.changes;
        }
    );
    db.close();
};

const leaveRequest = (facebookId, reason, effectiveDate) => {};

const resignationRequest = () => {};

const verification = (code, pin, facebookId) => {};

const getEmployeeReviews = (facebookId) => {};

module.exports = {
    updateFacebookId,
    leaveRequest,
    resignationRequest,
    verification,
    getEmployeeReviews,
};
