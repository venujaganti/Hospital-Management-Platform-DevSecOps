require("dotenv").config();

const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const {
  initializeDatabase,
  checkDatabase,
  getPatients,
  getDoctors,
  getAppointments
} = require("./db");

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;


/*
 * Middleware
 */

app.use(cors());

app.use(express.json());


/*
 * Prometheus
 */

client.collectDefaultMetrics();


const httpRequests =
  new client.Counter({
    name:
      "hospital_http_requests_total",

    help:
      "Total number of HTTP requests",

    labelNames: [
      "method",
      "route",
      "status"
    ]
  });


app.use((req, res, next) => {

  res.on("finish", () => {

    httpRequests.inc({
      method: req.method,

      route:
        req.route?.path ||
        req.path,

      status: res.statusCode
    });

  });

  next();
});


/*
 * Root
 */

app.get("/", (req, res) => {

  res.json({
    application:
      "Hospital Management Platform",

    version: "1.0.0",

    status: "running"
  });

});


/*
 * Health check
 */

app.get("/health", async (req, res) => {

  const database =
    await checkDatabase();

  res.status(200).json({

    status: "UP",

    service:
      "hospital-backend",

    database:
      database
        ? "CONNECTED"
        : "DEMO_MODE"

  });

});


/*
 * Prometheus metrics
 */

app.get("/metrics", async (req, res) => {

  res.set(
    "Content-Type",
    client.register.contentType
  );

  res.end(
    await client.register.metrics()
  );

});


/*
 * Patients
 */

app.get(
  "/api/patients",
  async (req, res) => {

    try {

      const patients =
        await getPatients();

      res.json(patients);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch patients"
      });

    }

  }
);


/*
 * Doctors
 */

app.get(
  "/api/doctors",
  async (req, res) => {

    try {

      const doctors =
        await getDoctors();

      res.json(doctors);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch doctors"
      });

    }

  }
);


/*
 * Appointments
 */

app.get(
  "/api/appointments",
  async (req, res) => {

    try {

      const appointments =
        await getAppointments();

      res.json(appointments);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch appointments"
      });

    }

  }
);


/*
 * Start server
 */

async function startServer() {

  await initializeDatabase();

  app.listen(
    PORT,
    "0.0.0.0",
    () => {

      console.log(
        `Hospital backend running on port ${PORT}`
      );

    }
  );
}

startServer();