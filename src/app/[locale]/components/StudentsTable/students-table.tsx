import {DataTable} from "@/app/[locale]/components/StudentsTable/data-table";
import {columns} from "@/app/[locale]/components/StudentsTable/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/lib/store";
import {useEffect} from "react";
import '../../../styles/studentTable.scss'
import {fetchStudents} from "@/app/lib/features/students/studentsSlice";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";
import TableFilters from "@/app/[locale]/components/StudentsTable/table-filters";

const StudentsTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.students.entities);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return (
        <div>
            <MaxWidthWrapper>
                <div className="container">
                    <div className="filters">
                        <TableFilters />
                    </div>
                    <DataTable columns={columns} data={students} />
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
export default StudentsTable;
