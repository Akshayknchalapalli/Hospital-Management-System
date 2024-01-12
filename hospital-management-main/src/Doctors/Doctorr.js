import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorForm from "./DoctorForm";
import DoctorList from "./DoctorList";

function Doctorr() {
  const [doctors, setDoctors] = useState([]);

  const handleAddDoctor = (newDoctor) => {
    axios
      .post("http://localhost:9191/addDoctor", newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        localStorage.setItem(
          "doctors",
          JSON.stringify([...doctors, response.data])
        );
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:9191/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteDoctor = (doctorId) => {
    axios
      .delete(`http://localhost:9191/delete/${doctorId}`)
      .then(() => {
        const updatedDoctors = doctors.filter(
          (doctor) => doctor.id !== doctorId
        );
        setDoctors(updatedDoctors);
        localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleEditDoctor = (editedDoctor) => {
    axios
      .put(`http://localhost:9191/update/${editedDoctor.id}`, editedDoctor)
      .then(() => {
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === editedDoctor.id ? editedDoctor : doctor
        );
        setDoctors(updatedDoctors);
        localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="App">
      <h1>Doctor</h1>
      <DoctorForm onAdd={handleAddDoctor} />
      <DoctorList
        doctors={doctors}
        onDelete={handleDeleteDoctor}
        onEdit={handleEditDoctor}
      />
    </div>
  );
}

export default Doctorr;
