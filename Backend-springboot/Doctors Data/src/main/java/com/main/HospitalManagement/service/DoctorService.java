package com.main.HospitalManagement.service;

import com.main.HospitalManagement.entity.Doctor;
import com.main.HospitalManagement.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Optional<Doctor> getDoctorByName(String name) {
        return doctorRepository.findByName(name);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> saveDoctors(List<Doctor> doctors) {
        return doctorRepository.saveAll(doctors);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Optional<Doctor> existingDoctor = doctorRepository.findById(id);
        if (existingDoctor.isPresent()) {
            Doctor doctor = existingDoctor.get();
            doctor.setName(updatedDoctor.getName());
            doctor.setSalary(updatedDoctor.getSalary());
            doctor.setGender(updatedDoctor.getGender());
            doctor.setAge(updatedDoctor.getAge());
            doctor.setSpecialization(updatedDoctor.getSpecialization());
            return doctorRepository.save(doctor);
        }
        return null; // Handle appropriately based on your application requirements
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}