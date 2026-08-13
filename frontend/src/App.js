import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  Route,
  Routes
} from "react-router-dom";

const API_URL = "/api";

function Dashboard() {
  const [backendStatus, setBackendStatus] =
    useState("Checking...");

  useEffect(() => {
    axios
      .get("/health")
      .then(() => {
        setBackendStatus("Connected");
      })
      .catch(() => {
        setBackendStatus("Unavailable");
      });
  }, []);

  return (
    <div className="page">

      <h1>Hospital Management Platform</h1>

      <p className="subtitle">
        Secure Hospital Management Platform
      </p>

      <div className="status-card">
        <strong>Backend Status:</strong>{" "}
        {backendStatus}
      </div>

      <div className="cards">

        <div className="card">
          <h2>Patients</h2>
          <p>
            Manage hospital patient records.
          </p>

          <Link to="/patients">
            View Patients
          </Link>
        </div>

        <div className="card">
          <h2>Doctors</h2>
          <p>
            Manage doctors and departments.
          </p>

          <Link to="/doctors">
            View Doctors
          </Link>
        </div>

        <div className="card">
          <h2>Appointments</h2>
          <p>
            Manage patient appointments.
          </p>

          <Link to="/appointments">
            View Appointments
          </Link>
        </div>

      </div>
    </div>
  );
}

function Patients() {
  const [patients, setPatients] =
    useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/patients`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(
          "Patient API error:",
          error
        );
      });
  }, []);

  return (
    <div className="page">

      <h1>Patients</h1>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Doctors() {
  const [doctors, setDoctors] =
    useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(
          "Doctor API error:",
          error
        );
      });
  }, []);

  return (
    <div className="page">

      <h1>Doctors</h1>

      <div className="cards">

        {doctors.map((doctor) => (

          <div
            className="card"
            key={doctor.id}
          >
            <h2>{doctor.name}</h2>

            <p>
              {doctor.specialization}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

function Appointments() {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error(
          "Appointment API error:",
          error
        );
      });
  }, []);

  return (
    <div className="page">

      <h1>Appointments</h1>

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map(
              (appointment) => (

                <tr
                  key={appointment.id}
                >
                  <td>
                    {appointment.patient_name}
                  </td>

                  <td>
                    {appointment.doctor_name}
                  </td>

                  <td>
                    {appointment.appointment_date}
                  </td>

                  <td>
                    {appointment.status}
                  </td>
                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar">

        <h2>
          Hospital Management
        </h2>

        <div className="nav-links">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/patients">
            Patients
          </Link>

          <Link to="/doctors">
            Doctors
          </Link>

          <Link to="/appointments">
            Appointments
          </Link>

        </div>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

      </Routes>
    </>
  );
}

export default App;