import { DataTable } from "@/app/[locale]/components/StudentsTable/data-table";
import { columns } from "@/app/[locale]/components/StudentsTable/columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";
import { useEffect } from "react";
import "../../../styles/studentTable.scss";
import { fetchStudents } from "@/app/lib/features/students/studentsSlice";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddStudentForm from "@/app/[locale]/components/AddStudentForm";

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
          <Dialog>
            <DialogTrigger asChild>
              <div className=" mb-3 w-full flex justify-end">
                <Button>Add Student</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AddStudentForm />
            </DialogContent>
          </Dialog>

          <DataTable columns={columns} data={students} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default StudentsTable;
