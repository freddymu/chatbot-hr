CREATE TABLE "employees" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "code" text(10) NOT NULL,
  "name" text(256) NOT NULL,
  "pin" integer(6),
  "status" text(32) NOT NULL,
  "pay_cut_percentage" real(2),
  "facebook_id" text(32),
  "created_at" integer(11) NOT NULL
);

CREATE TABLE "requests" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "employee_id" integer(10) NOT NULL,
  "request_type" text(64) NOT NULL,
  "reason" text(512) NOT NULL,
  "effective_date" integer(11) NOT NULL,
  "created_at" integer(11) NOT NULL,
  CONSTRAINT "fk_requests_employees_1" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id")
);

CREATE TABLE "reviews" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "employee_id" integer(10) NOT NULL,
  "review_category" text(36) NOT NULL,
  "review_description" text(512) NOT NULL,
  "score" integer(3) NOT NULL,
  "created_at" integer(11) NOT NULL,
  CONSTRAINT "fk_performances_employees_1" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id")
);

