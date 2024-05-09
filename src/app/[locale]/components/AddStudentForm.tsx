'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../lib/features/students/studentsSlice';
import { StudentAttrs } from '../../types/students';
import {AppDispatch} from "@/app/lib/store";
import {validateIDNP} from "@/api/mirage-server";

const AddStudentForm: React.FC = () => {
    const [student, setStudent] = useState<StudentAttrs>({ id: Math.floor(Math.random() * 100) , name: '', birthday: '', idnp: '', isActive: true });
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (student.name && student.birthday && student.idnp && validateIDNP(student.idnp)) {
            dispatch(addStudent(student));
            setStudent({ id: 0, name: '', birthday: '', idnp: '', isActive: true }); // Reset form after submission
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="birthday">Birth Year:</label>
                <input
                    type="text"
                    id="birthday"
                    name="birthday"
                    value={student.birthday}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="idnp">IDNP:</label>
                <input
                    type="text"
                    id="idnp"
                    name="idnp"
                    value={student.idnp}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudentForm;
