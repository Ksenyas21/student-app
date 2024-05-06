"use client"
import {useTranslations} from "use-intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/lib/store";
import {decrement, increment, incrementByAmount} from "@/app/lib/features/counter/counterSlice";
import {useEffect, useState} from "react";
import {makeServer} from "@/api/mirage-server";
import {StudentAttrs} from "@/app/types/students";

const MainPage = () => {
    const [user, setUser] = useState<StudentAttrs[]>([]);
    const t = useTranslations()
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        makeServer();
        async function fetchStudents() {
            try {
                const response = await fetch('/api/students',{

                });
                if (!response.ok) {
                    throw new Error('Ошибка загрузки студентов');
                }
                const data = await response.json();
                setUser(data.students);
            } catch (error) {
                console.error(error);
            }
        }

        fetchStudents();
    },[])
    console.log(user);
    return (
        <div>
            <h1>{t('label')}</h1>
            <main>
                <button
                    onClick={() => dispatch(increment())}
                >Increment
                </button>
                <span>{count}</span>
                <button
                    onClick={() => dispatch(decrement())}
                >Decrement
                </button>
                <button
                    onClick={() => dispatch(incrementByAmount(2))}
                >Increment by 2
                </button>
            </main>
            <h1>Студенты</h1>
            <ul>
                {user?.map((student) => (
                    <li key={student.id}>
                        <p>Имя: {student.name}</p>
                        <p>Год рождения: {student.birthYear}</p>
                        <p>IDNP: {student.idnp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default MainPage;
