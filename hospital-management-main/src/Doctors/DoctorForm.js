import React, { useState } from "react";
import axios from "axios";

const DoctorForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    gender: "",
    age: "",
    specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new doctor object with the form data
    const newDoctor = {
      name: formData.name,
      salary: formData.salary,
      gender: formData.gender,
      age: formData.age,
      specialization: formData.specialization,
    };

    // Send a POST request to the Spring Boot backend to add the new doctor
    axios
      .post("http://localhost:9191/addDoctor", newDoctor)
      .then((response) => {
        // Call the onAdd callback to update the doctor list in the parent component
        onAdd(response.data);

        // Clear the form fields
        setFormData({
          name: "",
          salary: "",
          gender: "",
          age: "",
          specialization: "",
        });
      })
      .catch((error) => {
        console.error("Error adding doctor data:", error);
      });
  };

  return (
    <form className="Container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Enter Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="salary">Enter Salary:</label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Enter Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Enter Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="specialization">Enter Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default DoctorForm;
