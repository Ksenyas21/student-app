import {DataTable} from "@/app/[locale]/components/StudentsTable/data-table";
import {columns} from "@/app/[locale]/components/StudentsTable/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/lib/store";
import {useEffect} from "react";
import {fetchStudents} from "@/app/lib/features/students/studentsSlice";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";

const StudentsTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.students.entities);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return (
        <div>
            <MaxWidthWrapper>
            <h1>Students Table</h1>
                <DataTable columns={columns} data={students} />
            </MaxWidthWrapper>
        </div>
    );
}
export default StudentsTable;
