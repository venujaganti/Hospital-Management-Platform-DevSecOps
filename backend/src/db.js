const mysql = require("mysql2/promise");

let pool = null;

const demoPatients = [
  {
    id: 1,
    name: "Rahul Kumar",
    age: 32,
    gender: "Male"
  },
  {
    id: 2,
    name: "Anjali Devi",
    age: 27,
    gender: "Female"
  }
];

const demoDoctors = [
  {
    id: 1,
    name: "Dr. Arun Kumar",
    specialization: "Cardiology"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "General Medicine"
  }
];

const demoAppointments = [
  {
    id: 1,
    patient_name: "Rahul Kumar",
    doctor_name: "Dr. Arun Kumar",
    appointment_date: "2026-08-15",
    status: "Confirmed"
  }
];

async function initializeDatabase() {

  if (!process.env.DB_HOST) {
    console.log(
      "DB_HOST not configured. Using demo data."
    );

    return;
  }

  try {

    pool = mysql.createPool({
      host: process.env.DB_HOST,

      port: Number(
        process.env.DB_PORT || 3306
      ),

      user:
        process.env.DB_USER ||
        "hospitaluser",

      password:
        process.env.DB_PASSWORD ||
        "hospitalpassword",

      database:
        process.env.DB_NAME ||
        "hospitaldb",

      waitForConnections: true,

      connectionLimit: 10,

      queueLimit: 0
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(20) NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialization VARCHAR(100) NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        doctor_name VARCHAR(100) NOT NULL,
        appointment_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL
      )
    `);

    console.log(
      "MySQL database connected."
    );

  } catch (error) {

    console.error(
      "MySQL unavailable. Using demo data."
    );

    pool = null;
  }
}

async function checkDatabase() {

  if (!pool) {
    return false;
  }

  try {

    await pool.query("SELECT 1");

    return true;

  } catch {

    return false;
  }
}

async function getPatients() {

  if (!pool) {
    return demoPatients;
  }

  const [rows] =
    await pool.query(
      "SELECT * FROM patients ORDER BY id DESC"
    );

  return rows;
}

async function getDoctors() {

  if (!pool) {
    return demoDoctors;
  }

  const [rows] =
    await pool.query(
      "SELECT * FROM doctors ORDER BY id DESC"
    );

  return rows;
}

async function getAppointments() {

  if (!pool) {
    return demoAppointments;
  }

  const [rows] =
    await pool.query(`
      SELECT *
      FROM appointments
      ORDER BY appointment_date DESC
    `);

  return rows;
}

module.exports = {
  initializeDatabase,
  checkDatabase,
  getPatients,
  getDoctors,
  getAppointments
};