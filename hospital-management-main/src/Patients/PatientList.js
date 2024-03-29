import React, { useState } from "react";

const PatientList = ({ Patients, onDelete, onEdit }) => {
  const [editableData, setEditableData] = useState(null);

  const handleEditClick = (Patient) => {
    setEditableData({ ...Patient });
  };

  const handleSaveClick = () => {
    if (editableData) {
      onEdit(editableData);
      setEditableData(null);
    }
  };

  const handleDeleteClick = (PatientId) => {
    onDelete(PatientId);
  };

  const handleCellChange = (e, key) => {
    if (editableData) {
      setEditableData({ ...editableData, [key]: e.target.value });
    }
  };

  return (
    <div>
      <h2>Patient List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Patients.map((Patient) => (
            <tr key={Patient.id}>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <input
                    type="text"
                    value={editableData.name}
                    onChange={(e) => handleCellChange(e, "name")}
                  />
                ) : (
                  Patient.name
                )}
              </td>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <input
                    type="text"
                    value={editableData.weight}
                    onChange={(e) => handleCellChange(e, "weight")}
                  />
                ) : (
                  Patient.weight
                )}
              </td>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <input
                    type="text"
                    value={editableData.gender}
                    onChange={(e) => handleCellChange(e, "gender")}
                  />
                ) : (
                  Patient.gender
                )}
              </td>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <input
                    type="text"
                    value={editableData.age}
                    onChange={(e) => handleCellChange(e, "age")}
                  />
                ) : (
                  Patient.age
                )}
              </td>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <input
                    type="text"
                    value={editableData.disease}
                    onChange={(e) => handleCellChange(e, "disease")}
                  />
                ) : (
                  Patient.disease
                )}
              </td>
              <td>{Patient.doctor}</td>
              <td>
                {editableData && editableData.id === Patient.id ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(Patient)}>Edit</button>
                )}
                <button onClick={() => handleDeleteClick(Patient.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
