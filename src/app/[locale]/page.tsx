"use client"
import {useTranslations} from "use-intl";
import {useEffect, useState} from "react";
import {makeServer} from "@/api/mirage-server";
import {StudentAttrs} from "@/app/types/students";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/lib/store";
import {fetchStudents, updateStudent} from "@/app/lib/features/students/studentsSlice";
import AddStudentForm from "@/app/[locale]/components/AddStudentForm";

const MainPage = () => {
    const t = useTranslations()
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.students.entities);
    const loading = useSelector((state: RootState) => state.students.loading);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);


    useEffect(() => {
        makeServer();
    },[])
    const deleteStudent = (student: StudentAttrs) => {
        console.log('delete', student.id)
        const newIsActive = !student.isActive;
        dispatch(updateStudent({ id: student.id.toString(), student: { isActive: newIsActive } }));
    }
    return (
        <div>
            <h1>{t('label')}</h1>
            <main>
            <AddStudentForm />
            </main>
            <h1>Студенты</h1>
            <ul>
                {loading ? <p>Loading...</p> : students?.map(student =>
                    <li key={student.id}>
                            <p>Имя: {student.name}</p>
                            <p>Год рождения: {student.birthYear}</p>
                            <p>IDNP: {student.idnp}</p>
                            <p>isActive: {student.isActive ? 'true': 'false'}</p>
                            <div onClick={() => deleteStudent(student)}>delete</div>
                     </li>
                )}
            </ul>
        </div>
    );
}
export default MainPage;
