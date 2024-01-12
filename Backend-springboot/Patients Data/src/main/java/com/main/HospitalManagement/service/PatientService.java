package com.main.HospitalManagement.service;// PatientService.java

import com.main.HospitalManagement.entity.Patient;
import com.main.HospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> getPatientsByName(String name) {
        return patientRepository.findByName(name);
    }

    public List<Patient> getPatientsByDoctor(String doctor) {
        return patientRepository.findByDoctor(doctor);
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> savePatients(List<Patient> patient) {
        return patientRepository.saveAll(patient);
    }

    private Patient updatePatientFields(Patient existingPatient , Patient updatedPatient) {
        existingPatient.setName(updatedPatient.getName());
        existingPatient.setWeight(updatedPatient.getWeight());
        existingPatient.setGender(updatedPatient.getGender());
        existingPatient.setAge(updatedPatient.getAge());
        existingPatient.setDisease(updatedPatient.getDoctor());
        existingPatient.setDisease(updatedPatient.getDoctor());
        return existingPatient;
    }
    public Patient updatePatient(Long id, Patient updatedPatient) {
        Optional<Patient> existingPatient = patientRepository.findById(id);
        if (existingPatient.isPresent()) {
            Patient patient = updatePatientFields(existingPatient.get(), updatedPatient);
            return patientRepository.save(patient);
        } else {
            throw new EntityNotFoundException("Patient not found with id: " + id); // Handle appropriately based on your application requirements
        }
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }


}
